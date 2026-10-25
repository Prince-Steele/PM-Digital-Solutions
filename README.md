# PM-Digital-Solutions

## Projects

- The PMS Digital Solutions website is at the repository root.
- [IslandTrail Jamaica](travel-website/README.md) is a separate travel and tourism website concept. For a new Vercel project, import this same repository and set **Root Directory** to `travel-website`.
- [Sterling Advisory Group](professional-demo/README.md) is a static professional services website concept built with HTML, CSS, and JavaScript. For a separate static deployment, use `professional-demo` as the project root.

## PMS website development

The root website is plain HTML, CSS, and JavaScript; no build step is required. Serve it with `python -m http.server 4173 --bind 127.0.0.1` and open `http://127.0.0.1:4173`. The contact API runs on Vercel, rather than Python's static server.

The site uses a fixed dark appearance. Previous theme preferences and the operating system's light setting do not change the logo or page colors. Fonts and icons are served locally; original image sources and their optimized variants are documented in [assets/README.md](assets/README.md).

To run the browser checks, install Playwright with `python -m pip install playwright`, then run `python tests/check-site.py`. Installed Google Chrome is required. The suite checks all five PMS pages at ten widths from 320 to 1440 px, local assets, navigation, currency persistence, and contact-form validation/success/failure with mocked responses. It sends no emails.

Run `python scripts/measure-performance.py` to measure median FCP, LCP, and layout shift across three cold-cache runs per page. It includes local desktop and simulated mobile profiles (1.6 Mbps, 150 ms latency, 4x CPU slowdown). The test server compresses text with gzip. Reports are written to `.local/performance.json`. Production results depend on deployment latency, compression, device speed, and connection quality.
