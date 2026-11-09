# MASTER PROMPT — NIGERIAN AIR FORCE IMMERSIVE MUSEUM KIOSK

![Nigerian Air Force logo — supplied visual identity reference](assets/logos/nigerian-air-force-logo.png)

## ROLE AND OUTCOME

Act as an award-winning interactive museum creative director, senior UI/UX designer, front-end engineer, GSAP motion specialist, and Windows kiosk deployment engineer. Build a **complete, working, visually extraordinary and deeply interactive Nigerian Air Force history/museum exhibition kiosk**, using **only the historical content and media I have already supplied**. The kiosk should make an exceptional first impression, reward exploration with meaningful gamified interactions, and remain appropriate for a prestigious Nigerian military institution.

**This is a production-ready exhibition application, NOT a static mockup, ordinary website, slideshow, dashboard, generic AI layout, or half-working prototype.** Deliver the actual project files and usable offline launcher.

## 1. CONTENT FIDELITY — NON-NEGOTIABLE

Read the entirety of every previously supplied Word document, photograph, logo, video, and archive. Audit the file names and inspect the assets, including any supplied Nigerian Air Force history and departmental history materials. Build a content/asset map showing which sections, photographs, videos, people, events, and dates belong together. Preserve the accurate names, ranks, dates, positions, chronology, wording and institutional roles. Do **not** invent historical achievements, biographies, awards, names, quotations, or statistics. Do not omit important supplied content. If an image identity or fact is uncertain, flag it rather than fabricating. Reorganize for compelling storytelling **without changing historical meaning**. Use real supplied photos and videos, not unrelated placeholders or invented imagery.

## 2. OFFICIAL VISUAL REFERENCE — ACTUAL ATTACHED LOGO

**Use the Nigerian Air Force logo included with this prompt at `assets/logos/nigerian-air-force-logo.png` as the authoritative supplied image reference for the kiosk's color identity.** It is the actual image the client provided, not a text-only description. Keep the logo intact: do not redraw, distort, recolor, crop off its elements, or replace it with a generic icon. Inspect its visible colors and build a harmonious institutional design system around them. The image has limited pixel resolution, so render it at an appropriate size without making it look blurry; if a sharper original is already among the supplied assets, use that instead while respecting the same identity.

**Color direction from the logo (suggested UI tokens, tune by visual inspection):**
- Ceremonial red `#A82025` — active navigation, focal interactive moments, animated highlights and important actions.
- Emblem gold `#D4A62A` / warm yellow `#F2D157` — premium section titles, keylines, medals, historical timeline nodes and special details.
- Deep Nigerian green `#287A43` — progress, discovery confirmation, secondary accents and national-identity details.
- Black/deep charcoal `#0C1014` / `#171C21` — cinematic hero backgrounds and gallery depth.
- Warm white `#F5F3EB` — highly legible content and captions.

These hex codes are visual starting points, **not claims that they are official Pantone or exact logo codes**. Avoid random neon gradients and an unrelated color scheme. Use gold and red with restraint, creating a prestigious, disciplined, modern and distinctive Air Force atmosphere. The logo itself should be featured meaningfully during opening and home navigation.

## 3. INSPIRATION — STUDY AIR.INC

Visit **https://air.inc/** and study, as far as accessible, how it approaches motion, visual pacing, hover interaction, media reveals, editorial typography, page transitions, and dynamic layouts. Use its *standard of creative execution* as inspiration, not its brand, text or exact design. If some interactions cannot be inspected, state that and do not pretend otherwise. Build an original Nigerian Air Force museum identity.

Art direction: spectacular cinematic entrance; striking editorial typography; intelligent full-bleed photography; layered depth; light atmospheric motion; well-timed large-format image reveals; elegant composition; intuitive navigation; refined details; emotional yet credible historical storytelling. Avoid standard dashboard cards and repetitive glassmorphism.

## 4. GSAP-DRIVEN MOTION SYSTEM

Use **GSAP as the core animation engine**, locally bundled for offline use. Incorporate timelines, ScrollTrigger, Flip, Draggable and other available GSAP tools only where genuinely useful and compatible with the direct-file setup. Create coordinated animations, not a collection of random effects:

- Dramatic institutional logo and title reveal on launch.
- A compelling **Begin Exploration** transition into the museum.
- Cinematic section/chapter entrances, masks, wipes, perspective shifts and photographic zooms.
- Animated chronological timelines, organizational diagrams and archive reveals.
- Horizontal gallery motion with smooth autoplay, pause-on-interaction and touch/drag controls.
- Magnetic hover treatment, subtle microinteractions, responsive button states, and purposeful visual feedback.
- Distinctively designed but coherent motion for major sections; avoid the same fade-in everywhere.

Favor stable 60-fps-feeling performance on target hardware. Prefer transform/opacity-based motion, optimized images, timeline cleanup and minimized paint-heavy effects. Respect accessibility reduced-motion preferences.

## 5. CUSTOM ANIMATED MOUSE POINTER — ESSENTIAL

**The normal Windows/browser arrow cursor must NOT be the primary pointer inside the exhibition.** Build a bespoke institutional cursor (custom pointer symbol + responsive outer ring), controlled with GSAP smoothing and subtle trailing motion. Use the logo palette: restrained gold glow, ceremonial red active emphasis, green completion cues where appropriate.

Contextual cursor states must animate smoothly:
- **EXPLORE** for interactive sections/hotspots.
- **VIEW** for images and portraits.
- **PLAY** for video previews.
- **DRAG** for draggable galleries.
- **NEXT / PREV** where directional interaction makes sense.
- Branded navigation/selection state and satisfying click feedback.

Add tasteful magnetic effects on selected controls and accurate cursor positioning. Never make pointer behavior interfere with clicks or readability. Implement touch alternatives, keyboard focus states, reduced-motion support, and a **working default cursor fallback** if custom-cursor code fails or when pointer capability is absent. Hide the native cursor only when the replacement is confirmed functional.

## 6. EXTRAORDINARY BUT MATURE GAMIFICATION

Make this **an actively explorable digital museum**, not passive pages. Gamification should feel visually impressive, sophisticated and historically respectful — not like a children's arcade or fabricated military simulation.

Build meaningful systems driven by actual supplied content:

**Interactive discovery journey:** Clear chapters, exploratory paths and a visual progress indicator tracking visited sections.

**Historical milestones:** A dramatic, interactive timeline that animates to a selected date, reveals its real photo/footage and accurate story, and makes the next chapter discoverable.

**Animated discovery hotspots:** Selectable points on supported historical photos/diagrams that reveal supplementary sourced information. Do not invent what is in an image.

**Leadership / personnel gallery (if supported by supplied content):** Large cinematic portraits, rank/name/tenure details, autoplay horizontal gallery, pause on hover/interaction, draggable and arrow navigation, expanded biography, and elegant back transitions. Never guess portrait identities.

**Organizational exploration (if supported):** Clickable animated hierarchy nodes revealing departmental responsibilities and relationships, based only on documented facts.

**Archive/media exploration:** Interactive photographs and locally hosted videos with animated viewing states and informative captions.

**Discovery completion:** A tasteful end-of-journey experience with visited chapters and a recap; track what the visitor actually opened, not fabricated achievements. Provide replay/reset and freedom to explore out of order.

Add surprising, high-quality, context-sensitive interactions and chapter-level hero moments. Every motion/interaction should reveal something meaningful, strengthen understanding, or clarify navigation.

## 7. PREMIUM VISUAL COMPOSITION

Make visitors say **WOW** within seconds — through composition, imagery, storytelling and motion rather than visual clutter. Establish a signature design language using charcoal atmospheres, elegantly luminous gold, selective military red, controlled green accents, generous scale and precise typography. Use the Air Force emblem respectfully. Examples of presentation techniques: cinematic image walls, timeline constellations, layered archival reveals, animated officer portrait sequences, image-to-detail transitions and atmospheric chapter introductions.

Avoid generic AI-generated grids, excessive glow, random gradients, cartoonish badges, fake 3D military scenes and visual gimmicks unrelated to the supplied history. Keep long historical text readable and easy to discover.

## 8. TECH STACK AND MUST-HAVE FILES

**Mandatory delivery:** a self-contained folder containing:

```text
naf-museum-kiosk/
├── index.html                 # real entry point; usable by direct local opening
├── prepare.bat                # real Windows validation/preparation script
├── run.bat                    # real Windows Edge kiosk launcher
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   ├── animations.js
│   ├── cursor.js
│   ├── gallery.js
│   └── interactions.js
├── libs/
│   └── gsap/                  # all GSAP code/plugins required, locally bundled
├── assets/
│   ├── logos/
│   │   └── nigerian-air-force-logo.png
│   ├── images/
│   ├── videos/
│   └── fonts/
└── README.md
```

Use **HTML5, CSS3, vanilla JavaScript and GSAP**. You may adjust internal organization if necessary, but the three root files (`index.html`, `prepare.bat`, `run.bat`) are **non-negotiable**. Use relative local asset paths, no broken references, and no placeholders. Avoid runtime dependence on Node.js, npm, cloud hosting, CDNs or an internet connection.

**Direct `file://` compatibility is mandatory.** Do not use an application architecture that requires an HTTP server to start. Avoid `fetch()` for local JSON/files, module loading that will be blocked by file-origin restrictions, unsupported cross-origin media behavior, and service workers that require HTTP(S). Bundle content in compatible local JS/data structures, use normal locally loaded scripts and paths, and validate them in actual Edge file-mode operation.

## 9. `prepare.bat` — REAL FUNCTIONAL WINDOWS PREPARATION

Create a working `prepare.bat` which:
1. Works relative to its own directory and handles folder paths containing spaces.
2. Verifies `index.html`, required CSS/JS, local GSAP, logo and required content/media exist.
3. Checks for Microsoft Edge in common installed locations (or a defensible fallback).
4. Gives clear error messages listing missing required files.
5. Does not require an internet connection, admin permission, build server or package installation.
6. Exits with a meaningful status code and indicates readiness when validation succeeds.

**This must be an actual working batch script, not pseudocode.**

## 10. `run.bat` — ACTUAL EDGE KIOSK LAUNCHER

Create a working `run.bat` which:
1. Resolves its own current folder dynamically (even when moved to another drive/folder).
2. Locates the installed Microsoft Edge executable robustly.
3. Builds a valid local `file:///` URL for `index.html`, correctly handling spaces and path escaping.
4. Starts Edge in fullscreen digital-signage kiosk mode using supported flags, in the form:

```bat
msedge.exe --kiosk "file:///PATH/TO/index.html" --edge-kiosk-type=fullscreen --no-first-run
```

5. Avoids hardcoded developer usernames and personal machine paths.
6. Provides useful error diagnostics if the executable or required project files are missing.
7. Works without internet and without requiring a localhost server.

**Double-clicking `run.bat` must open the offline kiosk experience** under a compatible Windows + Edge configuration. Do not pretend web-page JavaScript can override Windows kiosk security or exit a locked-down browser session; document supported operational exit methods.

## 11. FULL OFFLINE KIOSK EXPERIENCE

All JS/CSS, licensed and compatible GSAP packages/plugins, fonts, logos, media, icons and data must be locally available. Do not depend on Google Fonts, CDN-hosted GSAP, remote video/image URLs, online APIs or live connectivity.

The kiosk must provide:
- Fullscreen welcome and impressive launch animation.
- Readable, intuitive chapter navigation and visible home/back controls.
- High-quality image lightboxes and reliable local video playback.
- Custom animated cursor with accessible fallback.
- Discovery progress and meaningful contextual game-like interactions.
- A polished exit confirmation modal, with an actual feasible exit/close behavior appropriate to kiosk environment.
- A configurable inactivity timer that returns to welcome, resets navigation and progress as appropriate, stops media playback and closes overlays.
- Reliable behavior after repeated interactions and prolonged use.
- Touch-friendly tap targets where touch hardware is present.

## 12. QUALITY CONTROL AND ACCEPTANCE TESTS

Before delivery, actually test (or explicitly disclose any untested items):

- Opening `index.html` directly from a folder in Microsoft Edge without a web server.
- Running `prepare.bat` from a folder name containing spaces.
- Running `run.bat` to launch Edge kiosk mode from the relocated folder.
- Disconnecting internet and confirming *all* displayed content, media, logo, fonts and animations still work.
- The supplied Nigerian Air Force logo appearing correctly and its colors informing the whole UI.
- All links, buttons, galleries, videos, timelines, hotspots, overlays and modal actions.
- The animated pointer's hover states, accurate click targets and failure fallback.
- Autoplay gallery stop/restart and cleanup on navigation.
- Inactivity reset, replay and returning to the home screen.
- Readability, smoothness, accessibility and absence of missing assets or console exceptions.

Test using real supplied materials. Explain anything that couldn't be verified on your machine rather than claiming it was tested.

## 13. PRODUCTION WORKFLOW AND DELIVERABLES

1. Audit all supplied source materials and this attached logo.
2. Map verified content and media into sections; identify unresolved ambiguities.
3. Design a cinematic museum journey and gamified interaction plan.
4. Build the complete visual interface using the Nigerian Air Force logo color palette.
5. Implement full GSAP animation language, custom cursor, gallery and interactive discovery.
6. Integrate every verified image, video, title and historical section appropriately.
7. Produce functional `index.html`, `prepare.bat`, `run.bat` and all dependencies.
8. Test offline and file-origin behavior; repair broken paths/interactions.
9. Deliver the complete project folder/archive and a short README with Windows launch steps and known limitations.

## FINAL CREATIVE AND TECHNICAL DIRECTIVE

**Produce an unforgettable, glamorous yet disciplined, interactive Nigerian Air Force museum kiosk.** I want stunning composition, deeply considered storytelling, cinematic GSAP animation, a unique Air Force-inspired animated mouse pointer, and attractive gamification that makes exploring real historical information delightful. All of this must be grounded in **my existing files and the exact attached emblem**.

**Acceptance is conditional on all three files — `index.html`, `prepare.bat`, and `run.bat` — actually working, plus reliable offline Microsoft Edge kiosk operation.** No generic redesigns, no fabricated information, no broken images, and no server dependency. Deliver the full functioning project, not just screenshots or a high-level plan.
