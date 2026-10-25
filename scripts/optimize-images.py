"""Regenerate responsive website images. Requires Pillow: python -m pip install Pillow."""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets/image"
OUTPUT = ROOT / "assets/optimized"
OUTPUT.mkdir(parents=True, exist_ok=True)

for source in SOURCE.iterdir():
    if source.suffix.lower() not in {".png", ".jpg"}:
        continue
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original)
        if source.stem == "pms-logo":
            widths = (72, 144)
            image.resize((32, 32), Image.Resampling.LANCZOS).save(OUTPUT / "favicon.png", optimize=True)
        elif source.stem == "heroimg":
            widths = (768, 1264)
        elif source.stem == "profile":
            widths = (480, 960)
        elif source.stem == "OptiHome":
            continue  # Not used on the PMS website.
        else:
            widths = (480, 960)
        for width in widths:
            width = min(width, image.width)
            height = round(image.height * width / image.width)
            resized = image.resize((width, height), Image.Resampling.LANCZOS)
            resized.save(OUTPUT / f"{source.stem}-{width}.webp", "WEBP", quality=83, method=6)

print(f"Generated {len(list(OUTPUT.iterdir()))} optimized images in {OUTPUT.relative_to(ROOT)}")
