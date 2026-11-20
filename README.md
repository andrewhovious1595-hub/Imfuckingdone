# Clear Fault Legal — Multi-Tool 2D/3D Incident Recreation & Legal Case-Building Suite

A responsive, static, GitHub Pages-ready multi-page website housing **6 client-side interactive legal case-building tools**—designed for anyone illustrating an incident, organizing existing files into a demand package, indexing exhibits with Bates stamps, or structuring litigation prep with or without an attorney.

## Included Interactive Tools
1. **2D Incident Reconstruction Studio** (`/studio/index.html`) — Audited & bug-fixed 2D scene exhibit builder (scene upload, multi-color numbered routes, 5 editable marker types, chronology, classified evidence register, zoom, PNG/Print/JSON/CSV exports).
2. **3D Spatial Scene Stager** (`/tools/3d-scene-stager/index.html`) — Self-contained HTML5 Canvas 3D perspective engine with drag-to-orbit camera, scaled 3D vehicles/pedestrians/structures/roadways/barriers/sightlines, live coordinate inspector, and PNG/CSV/JSON exports.
3. **Demand Package Assembler** (`/tools/demand-package/index.html`) — Structured settlement demand builder with live itemized economic damages totals, non-economic impact notes, deadline calculator, enclosure checklist, live letter preview, and Print/TXT/CSV/JSON exports.
4. **Document Organizer & Bates Indexer** (`/tools/document-indexer/index.html`) — Local drag-and-drop file ingestion (zero server upload), Plaintiff/Defendant Exhibit labeling toggle, automatic Bates stamp ranges, foundation notes, reordering, and Print/CSV/JSON exports.
5. **Case Chronology & Fact Matrix** (`/tools/chronology-builder/index.html`) — Auto-sorted multi-date timeline linking Exhibit IDs and classifying Documented Facts vs. Disputed items, with Print/CSV/JSON exports.
6. **Litigation Prep & Case Readiness Planner** (`/tools/case-strategy-planner/index.html`) — Proof Matrix mapping claim elements to supporting exhibits, missing-evidence gap counter, witness roster, deadline checklist, and printable Attorney Intake / Trial Prep Brief.

## Modular Payment Gate (`assets/js/export-gate.js`)
Every export/download/print action across all 6 tools routes through `window.ExhibitExportGate.requestExport()`. To connect Stripe Checkout or Authorize.net later, edit `assets/js/export-gate.js`, set `mode: 'checkout'`, and supply your `checkoutUrl` or `verifyEntitlement()` check.

## Deploy to GitHub Pages
1. Extract `clearfaultlegal-suite-github.zip` directly into the root of your GitHub repository.
2. Push to `main`.
3. Open **Settings → Pages** and select **GitHub Actions** (uses `.github/workflows/deploy.yml`) or **Deploy from a branch** (`main` / root).
