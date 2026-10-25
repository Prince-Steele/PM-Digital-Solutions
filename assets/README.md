The PMS site serves its fonts, icons, and responsive WebP images locally.

- `fonts/`: Latin subsets of Anton, Manrope, and Plus Jakarta Sans from Google Fonts. Each font's Open Font License is included alongside it.
- Inline SVG icons in the five root HTML pages: Lucide Static 0.468.0. License: `licenses/lucide-LICENSE`.
- `icons/`: technology logos from [Devicon](https://github.com/devicons/devicon). License: `licenses/devicon-LICENSE`.
- `optimized/`: derived from the original files in `image/`. Regenerate with `python scripts/optimize-images.py` after installing Pillow. Logo WebP files preserve transparency. The hero is preloaded for the matching viewport; project images use responsive sources and lazy loading.

Original images remain available for future editing. The PMS pages use the optimized copies.
