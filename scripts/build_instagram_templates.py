"""Builds docs/instagram/templates/templates.html (reference layouts, official fonts and CMA outlines).
Render to PNG with: node scripts/render-instagram.cjs"""
import re, json, pathlib
R = pathlib.Path(__file__).resolve().parent.parent
d = (R / "src/components/brand/cma-data.ts").read_text()
def mark(key):
    m = re.search(key + r': \{ width: ([\d.]+), height: ([\d.]+), markup: (".*?") \}', d)
    w, h, mk = float(m.group(1)), float(m.group(2)), json.loads(m.group(3))
    return f'<svg viewBox="0 0 {w} {h}" fill="currentColor" style="display:block;width:100%;height:auto">{mk}</svg>'
CMA, ADV = mark("cma"), mark("advogados")
F = R / "node_modules/@fontsource-variable"
A = (R / "public/assets/architecture").as_uri()
def lock(w, color="#CECBC4"):
    return f'<div style="width:{w}px;color:{color};display:grid;gap:{w*0.09:.0f}px">{CMA}{ADV}</div>'
css = f"""
@font-face{{font-family:E;src:url({(F/'encode-sans/files/encode-sans-latin-wght-normal.woff2').as_uri()});font-weight:100 900}}
@font-face{{font-family:K;src:url({(F/'karla/files/karla-latin-wght-normal.woff2').as_uri()});font-weight:200 800}}
@font-face{{font-family:S;src:url({(F/'roboto-slab/files/roboto-slab-latin-wght-normal.woff2').as_uri()});font-weight:100 900}}
body{{margin:0;background:#888;display:flex;flex-wrap:wrap;gap:40px;padding:40px}}
.t{{position:relative;overflow:hidden;font-family:K;font-weight:300;flex:none}}
.f{{width:1080px;height:1350px}} .s{{width:1080px;height:1920px}} .h{{width:1080px;height:1080px}}
.k{{font-family:E;font-weight:400;font-size:26px;letter-spacing:.22em;text-transform:uppercase}}
.ti{{font-family:E;font-weight:300;line-height:1.08;letter-spacing:-.01em}}
.p{{font-size:30px;line-height:1.55;text-align:justify;hyphens:auto}}
.n{{font-family:E;font-size:24px;letter-spacing:.1em}}
.bg{{position:absolute;inset:0;background-size:cover;background-position:center}}
"""
P = 96  # outer margin
tpl = {}
tpl["01-post-institucional"] = f'''<div class="t f" style="color:#fff"><div class="bg" style="background-image:linear-gradient(180deg,rgba(48,18,6,.45),rgba(48,18,6,0) 40%,rgba(48,18,6,.7)),url({A}/colonnade-mobile.webp)"></div>
<p class="ti" style="position:absolute;left:{P}px;top:{P}px;font-size:76px;margin:0">Excelência jurídica.<br>Visão estratégica.</p>
<div style="position:absolute;left:{P}px;bottom:{P}px">{lock(300)}</div></div>'''
tpl["02-carrossel-capa"] = f'''<div class="t f" style="background:#301206;color:#CECBC4">
<p class="k" style="position:absolute;left:{P}px;top:{P}px;margin:0;color:#ACA699">Planejamento sucessório</p>
<p class="ti" style="position:absolute;left:{P}px;top:{P+80}px;width:820px;font-size:84px;margin:0">Quando começar e quais decisões considerar.</p>
<p class="n" style="position:absolute;right:{P}px;top:{P}px;margin:0;color:#ACA699">01 / 07</p>
<div style="position:absolute;left:{P}px;bottom:{P}px">{lock(210)}</div></div>'''
tpl["03-carrossel-interno"] = f'''<div class="t f" style="background:#CECBC4;color:#382C23">
<p class="n" style="position:absolute;left:{P}px;top:{P}px;margin:0;color:#382C23">02</p>
<p class="ti" style="position:absolute;left:{P}px;top:{P+70}px;width:760px;font-size:62px;margin:0;color:#301206">O patrimônio está organizado?</p>
<p class="p" style="position:absolute;left:{P}px;bottom:{P+120}px;width:470px;margin:0">Texto de exemplo. Um único ponto por tela, em linguagem clara, com no máximo quarenta a cinquenta palavras, revisado pelo advogado responsável antes da publicação.</p>
<p class="n" style="position:absolute;right:{P}px;bottom:{P}px;margin:0">02 / 07</p></div>'''
tpl["04-carrossel-fechamento"] = f'''<div class="t f" style="background:#fff;color:#301206">
<p class="ti" style="position:absolute;left:{P}px;top:{P}px;width:820px;font-size:62px;margin:0">Planejar cedo amplia as alternativas.</p>
<p class="p" style="position:absolute;left:{P}px;bottom:{P+260}px;width:520px;margin:0;font-size:24px;color:#ACA699;text-align:left">Conteúdo informativo. Não substitui a análise do caso concreto.</p>
<div style="position:absolute;left:{P}px;bottom:{P}px">{lock(260,"#301206")}</div></div>'''
tpl["05-anuncio-artigo"] = f'''<div class="t f" style="background:#CECBC4;color:#301206"><div class="bg" style="left:540px;background-image:url({A}/detail-vanishing-point.webp)"></div>
<p class="k" style="position:absolute;left:{P}px;top:{P}px;margin:0;color:#382C23">Conhecimento</p>
<p class="ti" style="position:absolute;left:{P}px;top:{P+80}px;width:380px;font-size:54px;margin:0">Título do artigo publicado no site.</p>
<p class="k" style="position:absolute;left:{P}px;bottom:{P+200}px;margin:0;font-size:22px">Leia no site →</p>
<div style="position:absolute;left:{P}px;bottom:{P}px">{lock(200,"#301206")}</div></div>'''
tpl["06-profissional"] = f'''<div class="t f" style="background:#EBE9E4;color:#382C23">
<div style="position:absolute;right:{P}px;top:{P}px;width:520px;height:650px;background:#CECBC4;display:flex;align-items:flex-end;padding:30px;box-sizing:border-box"><span class="k" style="font-size:18px">Retrato autoral aprovado</span></div>
<p class="k" style="position:absolute;left:{P}px;top:{P}px;margin:0">Equipe</p>
<p class="ti" style="position:absolute;left:{P}px;bottom:{P+220}px;font-size:64px;margin:0;color:#301206">Nome<br>Sobrenome</p>
<p class="k" style="position:absolute;left:{P}px;bottom:{P+150}px;margin:0;font-size:20px;color:#ACA699">Cargo · OAB/DF 00.000</p>
<p class="p" style="position:absolute;left:{P}px;bottom:{P}px;width:560px;margin:0;font-size:24px">Áreas de atuação e formação, somente com dados verificáveis.</p></div>'''
tpl["07-story"] = f'''<div class="t s" style="color:#fff"><div class="bg" style="background-image:linear-gradient(180deg,rgba(48,18,6,.55),rgba(48,18,6,.1) 40%,rgba(48,18,6,.8)),url({A}/corridor-mobile.webp)"></div>
<p class="k" style="position:absolute;left:{P}px;top:300px;margin:0;color:#CECBC4">Novo artigo</p>
<p class="ti" style="position:absolute;left:{P}px;top:370px;width:820px;font-size:80px;margin:0">Due diligence imobiliária.</p>
<div style="position:absolute;left:{P}px;bottom:320px">{lock(260)}</div></div>'''
tpl["08-capa-video"] = f'''<div class="t s" style="background:#301206;color:#CECBC4">
<p class="k" style="position:absolute;left:{P}px;top:620px;margin:0;color:#ACA699">Em 60 segundos</p>
<p class="ti" style="position:absolute;left:{P}px;top:690px;width:860px;font-size:92px;margin:0">Holding patrimonial: objetivos e limites.</p>
<div style="position:absolute;left:{P}px;top:1180px">{lock(200)}</div></div>'''
hl = "".join(f'<div style="width:420px;height:420px;border-radius:50%;background:#301206;color:#CECBC4;display:flex;align-items:center;justify-content:center"><span class="k" style="font-size:30px">{w}</span></div>' for w in ["Escritório","Atuação","Equipe","Publicações","Contato"])
tpl["09-destaques"] = f'<div class="t" style="width:2300px;height:520px;background:#EBE9E4;display:flex;gap:40px;align-items:center;padding:0 50px;box-sizing:border-box">{hl}</div>'
tpl["10-avatar"] = f'<div class="t h" style="background:#301206;display:flex;align-items:center;justify-content:center"><div style="width:520px;color:#CECBC4">{CMA}</div></div>'
html = f"<!doctype html><html><head><meta charset=utf-8><style>{css}</style></head><body>" + "".join(f'<div id="{k}">{v}</div>' for k, v in tpl.items()) + "</body></html>"
(R / "docs/instagram/templates/templates.html").write_text(html)
print(list(tpl))
