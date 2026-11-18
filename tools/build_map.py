"""Builds map.js (country outlines as SVG paths) for the map quiz.

Usage: python3 -I tools/build_map.py <countries-50m.json> <countries.json> <out map.js> <data.js>
- countries-50m.json: world-atlas@2.0.2 (Natural Earth, public domain)
- countries.json:     world-countries@5.0.0 (for ISO numeric codes and fallback positions)
"""
import json, math, re, sys

topo_path, wc_path, out_path, data_path = sys.argv[1:5]
topo = json.load(open(topo_path))
wc = json.load(open(wc_path, encoding='utf-8'))
data_src = open(data_path, encoding='utf-8').read()
quiz = json.loads(re.search(r'const COUNTRIES = (\[.*\]);', data_src, re.S).group(1))
quiz_codes = {c['code'] for c in quiz}
region_of = {c['code']: c['region'] for c in quiz}

num_to_code = {x['ccn3']: x['cca2'].lower() for x in wc if x.get('ccn3')}
latlng = {x['cca2'].lower(): x['latlng'] for x in wc}
NAME_TO_CODE = {'Kosovo': 'xk', 'Somaliland': 'so', 'N. Cyprus': 'cy'}

# ---- decode TopoJSON arcs ----
sx, sy = topo['transform']['scale']
tx, ty = topo['transform']['translate']
arcs = []
for arc in topo['arcs']:
    x = y = 0
    pts = []
    for dx, dy in arc:
        x += dx; y += dy
        pts.append((x * sx + tx, y * sy + ty))
    arcs.append(pts)

def ring_coords(ring):
    pts = []
    for i in ring:
        a = arcs[i] if i >= 0 else arcs[~i][::-1]
        pts.extend(a if not pts else a[1:])
    return pts

# ---- projection: Equal Earth, centred on 10°E so Pacific islands sit together on the right ----
LON0 = 10
A1, A2, A3, A4 = 1.340264, -0.081106, 0.000893, 0.003796
M = math.sqrt(3) / 2
S = 180
XMAX = 2.7066297319 * S
YMAX = 1.3173627548 * S

def ee(lon, lat):
    lam, phi = math.radians(lon), math.radians(lat)
    th = math.asin(M * math.sin(phi))
    t2 = th * th; t6 = t2 * t2 * t2
    x = 2 * math.sqrt(3) * lam * math.cos(th) / (3 * (A1 + 3 * A2 * t2 + t6 * (7 * A3 + 9 * A4 * t2)))
    y = th * (A1 + A2 * t2 + t6 * (A3 + A4 * t2))
    return (x * S + XMAX, YMAX - y * S)

def shift(lon):
    l = lon - LON0
    while l < -180: l += 360
    while l > 180: l -= 360
    return l

def project_ring(pts):
    out, prev = [], None
    for lon, lat in pts:
        l = shift(lon)
        if prev is not None:  # unwrap so a ring crossing the seam stays in one piece
            while l - prev > 180: l -= 360
            while l - prev < -180: l += 360
        prev = l
        out.append(ee(l, lat))
    return out

def area(r):
    return abs(sum(r[i][0] * r[i - 1][1] - r[i - 1][0] * r[i][1] for i in range(len(r)))) / 2

def path_d(rings, tol=0.12):
    parts = []
    for r in rings:
        kept = [r[0]]
        for p in r[1:]:
            if abs(p[0] - kept[-1][0]) + abs(p[1] - kept[-1][1]) >= tol:
                kept.append(p)
        if len(kept) < 3:
            continue
        q = [(round(x, 1), round(y, 1)) for x, y in kept]
        s = 'M%g %g' % q[0]
        segs = []
        for (x0, y0), (x1, y1) in zip(q, q[1:]):
            dx, dy = round(x1 - x0, 1), round(y1 - y0, 1)
            if dx or dy:
                segs.append('%g %g' % (dx, dy))
        parts.append(s + 'l' + ' '.join(segs).replace(' -', '-') + 'z')
    return ''.join(parts)

geoms = topo['objects']['countries']['geometries']
rings_by_code, bg_rings = {}, []
for g in geoms:
    name = g['properties']['name']
    if name == 'Antarctica':
        continue
    code = num_to_code.get(g.get('id')) or NAME_TO_CODE.get(name)
    polys = g['arcs'] if g['type'] == 'MultiPolygon' else [g['arcs']] if g['type'] == 'Polygon' else []
    rings = [project_ring(ring_coords(ring)) for poly in polys for ring in poly]
    if code in quiz_codes:
        rings_by_code.setdefault(code, []).extend(rings)
    else:
        bg_rings.extend(rings)

paths, dots = {}, {}
for code in sorted(quiz_codes):
    rings = rings_by_code.get(code)
    if rings:
        paths[code] = path_d(rings)
        big = max(rings, key=area)
        xs = [p[0] for r in rings for p in r]; ys = [p[1] for r in rings for p in r]
        total = sum(area(r) for r in rings)
        if total < 8 or max(max(xs) - min(xs), max(ys) - min(ys)) < 3:
            lat, lon = latlng[code]
            x, y = ee(shift(lon), lat)
            dots[code] = [round(x, 1), round(y, 1)]
    else:
        lat, lon = latlng[code]
        x, y = ee(shift(lon), lat)
        dots[code] = [round(x, 1), round(y, 1)]

def view(lon0, lon1, lat0, lat1, pad=6):
    pts = []
    for i in range(21):
        for j in range(21):
            lon = lon0 + (lon1 - lon0) * i / 20
            lat = lat0 + (lat1 - lat0) * j / 20
            pts.append(ee(lon - LON0, lat))  # boxes are given so they don't cross the seam
    xs = [p[0] for p in pts]; ys = [p[1] for p in pts]
    return [round(min(xs) - pad, 1), round(min(ys) - pad, 1), round(max(xs) - min(xs) + 2 * pad, 1), round(max(ys) - min(ys) + 2 * pad, 1)]

W, H = round(2 * XMAX, 1), round(2 * YMAX, 1)
top = ee(0, 84)[1]; bottom = ee(0, -58)[1]
views = {
    'all': [0, round(top - 4, 1), W, round(bottom - top + 8, 1)],
    'Africa': view(-26, 58, -37, 38),
    'Asia': view(25, 150, -12, 56),
    'Europe': view(-25, 45, 34, 71),
    'North America': view(-170, -52, 6, 75),
    'South America': view(-93, -30, -57, 14),
    'Oceania': view(110, 188, -48, 22),
}

missing = sorted(c for c in quiz_codes if c not in paths)
out = {'w': W, 'h': H, 'bg': path_d(bg_rings), 'c': paths, 'dots': dots, 'views': views}
with open(out_path, 'w', encoding='utf-8') as f:
    f.write('// Generated by tools/build_map.py from Natural Earth (public domain) via world-atlas.\n')
    f.write('const WORLD_MAP = ' + json.dumps(out, separators=(',', ':')) + ';\n')
print('paths', len(paths), 'dots', len(dots), 'no outline:', missing)
