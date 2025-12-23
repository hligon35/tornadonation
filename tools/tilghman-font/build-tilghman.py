import os
import fontforge
import psMat

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
GLYPH_DIR = os.path.join(os.path.dirname(__file__), "glyphs")
OUT_TTF = os.path.join(REPO_ROOT, "assets", "fonts", "Tilghman.ttf")

FONT_NAME = "Tilghman"
EM = 1000
ASCENT = 800
DESCENT = 200
ADVANCE = 600

SHEET_CELL = 64
SCALE = ASCENT / SHEET_CELL  # maps 64px to 800 units


def main() -> None:
    f = fontforge.font()
    f.encoding = "UnicodeFull"
    f.em = EM
    f.ascent = ASCENT
    f.descent = DESCENT

    # Naming
    f.fontname = FONT_NAME
    f.familyname = FONT_NAME
    f.fullname = FONT_NAME

    for i in range(26):
        ch = chr(ord("A") + i)
        svg_path = os.path.join(GLYPH_DIR, f"{ch}.svg")
        if not os.path.exists(svg_path):
            raise FileNotFoundError(svg_path)

        g = f.createChar(ord(ch), ch)
        g.importOutlines(svg_path)

        # Scale from 64-unit glyph grid to font units
        g.transform(psMat.scale(SCALE))

        # Center glyph inside a fixed advance width
        xmin, ymin, xmax, ymax = g.boundingBox()
        gw = max(0, xmax - xmin)
        tx = -xmin + (ADVANCE - gw) / 2
        g.transform(psMat.translate(tx, 0))

        g.width = ADVANCE
        g.simplify()
        g.round()
        g.correctDirection()

    # Generate TTF
    os.makedirs(os.path.dirname(OUT_TTF), exist_ok=True)
    f.generate(OUT_TTF)
    f.close()
    print(f"Wrote {OUT_TTF}")


if __name__ == "__main__":
    main()
