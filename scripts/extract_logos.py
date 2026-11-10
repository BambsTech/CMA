import sys, pymupdf, os
pdf, outdir = sys.argv[1], sys.argv[2]
os.makedirs(outdir, exist_ok=True)
doc = pymupdf.open(pdf)
def hexc(c): return '#%02X%02X%02X' % tuple(round(v*255) for v in c)
def fmt(v): return ('%.3f' % v).rstrip('0').rstrip('.')
def path_d(dr, ox, oy):
    d=[]; cur=None
    for it in dr['items']:
        op = it[0]
        if op == 're':
            r = it[1]; d.append(f"M{fmt(r.x0-ox)} {fmt(r.y0-oy)}H{fmt(r.x1-ox)}V{fmt(r.y1-oy)}H{fmt(r.x0-ox)}Z"); cur=None; continue
        if op == 'qu':
            q = it[1]; pts=[q.ul,q.ur,q.lr,q.ll]
            d.append("M"+" L".join(f"{fmt(p.x-ox)} {fmt(p.y-oy)}" for p in pts)+"Z"); cur=None; continue
        p0 = it[1]
        if cur is None or abs(cur.x-p0.x)>1e-3 or abs(cur.y-p0.y)>1e-3:
            if cur is not None and dr.get('closePath'): d.append('Z')
            d.append(f"M{fmt(p0.x-ox)} {fmt(p0.y-oy)}")
        if op == 'l':
            p1=it[2]; d.append(f"L{fmt(p1.x-ox)} {fmt(p1.y-oy)}"); cur=p1
        elif op == 'c':
            c1,c2,p1=it[2],it[3],it[4]
            d.append(f"C{fmt(c1.x-ox)} {fmt(c1.y-oy)} {fmt(c2.x-ox)} {fmt(c2.y-oy)} {fmt(p1.x-ox)} {fmt(p1.y-oy)}"); cur=p1
    if dr.get('closePath'): d.append('Z')
    return ''.join(d)
for pn in map(int, sys.argv[3:]):
    page = doc[pn-1]; dr = page.get_drawings()
    bgs = [x for x in dr if x['fill'] and len(x['items'])==1 and x['rect'].get_area()>20000]
    for i,bg in enumerate(bgs):
        R = bg['rect']
        inside = [x for x in dr if x is not bg and x['fill'] and R.contains(x['rect']) and x['rect'].get_area() < R.get_area()*0.5]
        if not inside: continue
        u = pymupdf.Rect(inside[0]['rect'])
        for x in inside[1:]: u |= x['rect']
        cols = sorted({hexc(x['fill']) for x in inside})
        paths = ''.join(f'<path d="{path_d(x,u.x0,u.y0)}"{" fill-rule=\"evenodd\"" if x.get("even_odd") else ""}/>' for x in inside)
        svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {fmt(u.width)} {fmt(u.height)}" fill="currentColor">{paths}</svg>'
        name = f"p{pn}_cell{i}_bg{hexc(bg['fill'])[1:]}_fg{'-'.join(c[1:] for c in cols)}.svg"
        open(os.path.join(outdir,name),'w').write(svg)
        print(name, fmt(u.width), fmt(u.height), len(inside))
