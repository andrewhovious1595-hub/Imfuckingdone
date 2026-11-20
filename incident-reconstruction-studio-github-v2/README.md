# Incident Reconstruction Studio — Multi-Page Website & Interactive App

A responsive, static multi-page website built directly around the **Incident Reconstruction Studio** web application, structured for GitHub Pages or custom domain deployment with no build step, backend database, or external dependencies required.

## Directory Structure

```text
incident-reconstruction-studio-site/
├── index.html                          # Landing page centered on the Studio service
├── studio/
│   └── index.html                      # Interactive 6-step Incident Reconstruction Studio app
├── directory/
│   └── index.html                      # Searchable & filterable Use-Case / Resource Directory
├── use-cases/
│   ├── vehicle-collisions.html
│   ├── premises-liability.html
│   ├── workplace-incidents.html
│   └── pedestrian-bicycle.html
├── guides/
│   ├── how-it-works.html
│   ├── exhibit-standards.html
│   └── privacy-security.html
├── faq/
│   └── index.html
├── assets/
│   ├── css/
│   │   ├── site.css                    # Shared design system matching the Studio UI
│   │   └── studio.css                  # Studio workspace & export checkpoint styles
│   └── js/
│       ├── site.js                     # Responsive mobile nav & directory search/filtering
│       ├── export-gate.js              # Modular payment-ready Export Access Gate
│       └── studio.js                   # Audited, bug-fixed interactive Studio engine
├── sitemap.xml
├── robots.txt
├── .nojekyll
├── LICENSE
└── .github/workflows/deploy.yml
```

## Key Fixes Applied to the Studio App
1. **Route Plotting Restored:** Added an explicit continuous route-plotting mode (`#routeMode`), automatic activation on route creation, and `Esc` exit so users can plot multi-point paths cleanly.
2. **Project Title State Sync Fixed:** Mapped `#projectTitle` accurately to `state.title` so the canvas exhibit title, printed page, and JSON filename update live and persist across reloads.
3. **Active Route Selection Fixed:** Tracked `selectedRouteId` cleanly so switching between multiple routes no longer resets to the first route on redraw.
4. **Marker & Route Editing Added:** Implemented the Edit actions in both the Routes and Markers sidebar panels.
5. **Canvas Legibility & Zoom Controls:** Added high-contrast label pills, clean footer metadata bar, working zoom/fit controls (`-`, `+`, `Fit scene`), and reliable image-loaded print formatting including chronology and evidence tables.
6. **JSON Import Normalization:** Validated imported project files against a normalized schema so missing fields never break the workspace.

## Wiring the Payment Gate (`assets/js/export-gate.js`)
Users can currently build full exhibits in `/studio/index.html`, and every download/export action (`PNG`, `Print`, `Project JSON`, `Summary CSV`) passes through `window.ExhibitExportGate.requestExport()`.

To enable paid exports later:
1. Open `assets/js/export-gate.js`.
2. Change `mode: 'preview'` to `mode: 'checkout'`.
3. Provide your hosted checkout URL in `checkoutUrl` (e.g., Stripe Checkout or Authorize.net Accept Hosted) and/or connect `verifyEntitlement()` to your backend verification endpoint.

## Updating Domain URLs for SEO
Canonical links, Open Graph URLs, JSON-LD schemas, `sitemap.xml`, and `robots.txt` currently use `https://clearfaultlegal.com`. If deploying to a different domain or GitHub Pages subpath, search-and-replace `https://clearfaultlegal.com` across the project with your final public URL before deploying.

## Run Locally
```bash
python -m http.server 8000
```
Open `http://localhost:8000` in your browser.

## Deploy to GitHub Pages
1. Extract this ZIP archive and upload or push all extracted files (`index.html`, `assets/`, `studio/`, `directory/`, `use-cases/`, `guides/`, `faq/`, `.nojekyll`, `.github/`, `sitemap.xml`, `robots.txt`) directly to the root of your GitHub repository.
2. Open **Settings → Pages** and select either **Deploy from a branch** (`main` / root) or **GitHub Actions** (using `.github/workflows/deploy.yml`).
