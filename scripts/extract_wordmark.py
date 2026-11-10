"""Extracts the three parts of the official signature as separate vectors, so the
agency's own web application (manual pp. 37-38: CAROLINA ... & ADVOGADOS ... MEIRELLES)
can be composed without redrawing anything.
Usage: python3 scripts/extract_wordmark.py <manual.pdf> <outdir>"""
import os, sys, pymupdf
sys.path.insert(0, os.path.dirname(__file__))
from extract_logos_lib import path_d  # noqa: E402

pdf, out = sys.argv[1], sys.argv[2]
doc = pymupdf.open(pdf)
STONE = (0.81, 0.8, 0.77)

def cell(pn):
    dr = doc[pn - 1].get_drawings()
    for bg in dr:
        if bg["fill"] and len(bg["items"]) == 1 and bg["rect"].get_area() > 20000 and tuple(round(v, 2) for v in bg["fill"]) == STONE:
            R = bg["rect"]
            return [x for x in dr if x is not bg and x["fill"] and R.contains(x["rect"]) and x["rect"].get_area() < R.get_area() * 0.5]

def write(name, items):
    u = pymupdf.Rect(items[0]["rect"])
    for x in items[1:]:
        u |= x["rect"]
    paths = "".join(f'<path d="{path_d(x, u.x0, u.y0)}"/>' for x in items)
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {u.width:.3f} {u.height:.3f}" fill="currentColor">{paths}</svg>'
    open(os.path.join(out, name), "w").write(svg)
    print(name, round(u.width, 2), round(u.height, 2), len(items))

name = cell(18)  # "CAROLINA MEIRELLES" (logotipo nome horizontal)
write("cma-palavra-carolina.svg", [x for x in name if x["rect"].x1 < 255])
write("cma-palavra-meirelles.svg", [x for x in name if x["rect"].x0 > 255])
vert = cell(16)  # "& ADVOGADOS" — third line of the complete vertical signature
write("cma-palavra-advogados.svg", [x for x in vert if x["rect"].y0 > 310])
