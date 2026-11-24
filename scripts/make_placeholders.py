"""
Generates clearly-labelled PLACEHOLDER images so the site runs before real
photographs are added. Replace any file in /public/images with the real photo
(same file name) or point the entries in /data/*.ts at your own files.

Run:  python3 scripts/make_placeholders.py   (needs Pillow)
"""
import os
import random
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = os.path.join(os.path.dirname(__file__), "..", "public", "images")

PALETTES = {
    "weddings": ("#2b1f1a", "#b08968", "#ead8bd"),
    "pre-weddings": ("#252b2a", "#8a9a8c", "#dccfbb"),
    "maternity": ("#33262a", "#c9a0a0", "#f2dfd5"),
    "baby-stories": ("#272d33", "#a9b9c4", "#efe6da"),
    "couple-portraits": ("#26201e", "#a3715a", "#ecd9c5"),
    "events": ("#1d1a24", "#7e6a8f", "#e6d5b6"),
    "bridal-portraits": ("#2a2420", "#c6a77d", "#f6efe4"),
    "hero": ("#16110f", "#8b5e3c", "#f0d9b5"),
    "about": ("#241c18", "#a98467", "#ecd9c1"),
    "films": ("#14110f", "#7a5a40", "#d9bf9a"),
    "experience": ("#1e1816", "#9c7a5b", "#ead7bb"),
    "instagram": ("#241d1a", "#b5906b", "#efe0c9"),
    "stories": ("#221b18", "#a8825f", "#ecd8bd"),
}


def hex2rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i : i + 2], 16) for i in (0, 2, 4))


def font(size):
    for p in (
        "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf",
    ):
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()


def make(path, w, h, palette, label, seed, ypos=0.5):
    rnd = random.Random(seed)
    c1, c2, c3 = (hex2rgb(x) for x in PALETTES[palette])
    # small canvas for speed, upscaled at the end
    sw, sh = w // 2, h // 2
    img = Image.new("RGB", (sw, sh))
    px = img.load()
    for y in range(sh):
        t = y / (sh - 1)
        # dark top -> warm mid -> light bottom glow
        if t < 0.55:
            k = t / 0.55
            col = tuple(int(c1[i] * (1 - k) + c2[i] * k) for i in range(3))
        else:
            k = (t - 0.55) / 0.45
            col = tuple(int(c2[i] * (1 - k) + c3[i] * k * 0.85) for i in range(3))
        for x in range(sw):
            px[x, y] = col
    # bokeh
    layer = Image.new("RGBA", (sw, sh), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for _ in range(16):
        r = rnd.randint(int(min(sw, sh) * 0.05), int(min(sw, sh) * 0.17))
        cx, cy = rnd.randint(0, sw), rnd.randint(0, sh)
        col = c3 if rnd.random() > 0.35 else c2
        d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=col + (rnd.randint(28, 70),))
    layer = layer.filter(ImageFilter.GaussianBlur(min(sw, sh) * 0.02))
    img = Image.alpha_composite(img.convert("RGBA"), layer).convert("RGB")
    # vignette
    vig = Image.new("L", (sw, sh), 0)
    vd = ImageDraw.Draw(vig)
    vd.ellipse((-sw * 0.25, -sh * 0.2, sw * 1.25, sh * 1.2), fill=255)
    vig = vig.filter(ImageFilter.GaussianBlur(min(sw, sh) * 0.18))
    dark = Image.new("RGB", (sw, sh), (8, 6, 5))
    img = Image.composite(img, dark, vig)
    img = img.resize((w, h), Image.LANCZOS)
    # grain
    noise = Image.effect_noise((w, h), 18).convert("RGB")
    img = Image.blend(img, noise, 0.04)
    # label
    d = ImageDraw.Draw(img)
    f1, f2 = font(max(18, w // 42)), font(max(14, w // 62))
    txt1, txt2 = "PLACEHOLDER", label
    for txt, f, dy, a in ((txt1, f1, -f1.size * 0.7, 215), (txt2, f2, f1.size * 0.5, 150)):
        tw = d.textlength(txt, font=f)
        d.text(((w - tw) / 2, h * ypos + dy), txt, font=f, fill=(245, 240, 232))
    os.makedirs(os.path.dirname(path), exist_ok=True)
    img.save(path, "JPEG", quality=70, optimize=True, progressive=True)


def out(*parts):
    return os.path.join(ROOT, *parts)


# portfolio: 7 categories x 4 images (landscape, portrait, portrait, landscape)
SIZES = [(1600, 1200), (1100, 1467), (1100, 1467), (1600, 1000)]
CATS = [k for k in PALETTES if k not in ("hero", "about", "films", "experience", "instagram", "stories")]
n = 0
for cat in CATS:
    for i, (w, h) in enumerate(SIZES, start=1):
        n += 1
        make(out("portfolio", cat, f"{i:02d}.jpg"), w, h, cat, f"{cat} / {i:02d}", n)

make(out("hero", "hero.jpg"), 2000, 1250, "hero", "hero photo - replace", 100, ypos=0.2)
make(out("about", "portrait.jpg"), 1200, 1500, "about", "photographer portrait", 101)
make(out("about", "support-1.jpg"), 900, 1200, "about", "supporting image 1", 102)
make(out("about", "support-2.jpg"), 1200, 900, "about", "supporting image 2", 103)
for i in range(1, 5):
    make(out("films", f"{i:02d}.jpg"), 1920, 1080, "films", f"film thumbnail {i:02d}", 110 + i)
for i, name in enumerate(("moment", "emotion", "memory"), start=1):
    make(out("experience", f"{name}.jpg"), 1200, 1500, "experience", f"experience / {name}", 120 + i)
for i in range(1, 9):
    make(out("instagram", f"{i:02d}.jpg"), 1000, 1250, "instagram", f"instagram tile {i:02d}", 130 + i)
for i in range(1, 4):
    make(out("stories", f"{i:02d}.jpg"), 1200, 1500, "stories", f"featured story {i:02d}", 140 + i)

print("placeholders written to", os.path.abspath(ROOT))
