# Nigerian Air Force — The Sky Remembers
## Offline interactive museum exhibition · AFCSC Jaji

This reconstructed deliverable was created from the supplied source archives and documents. It is **not the original unpublished GPT Astra implementation**. All historical records and media assets originate from the supplied files.

### Quick start (Windows 10/11)

1. Extract **all contents** of the ZIP to a folder (for example `C:\Museum Exhibition\naf-museum-kiosk`). Keep the folder structure intact.
2. Double-click `prepare.bat`. The script verifies critical project files, the seven supplied videos, two named portraits, PowerShell and Microsoft Edge.
3. Double-click `run.bat` to launch Microsoft Edge's full-screen digital signage kiosk mode from the local `index.html` file. No installation or internet connection is needed beyond Edge being present.
4. Alternatively, double-click `index.html` to open it in a normal browser for previews.

### Visitor controls

- Select **Begin Exploration** on the welcome screen.
- Use the icon rail to navigate eight chapters: Timeline, Leadership, Aircraft, College, Department of Air Warfare, Bases, Photos and Films.
- Use **Search** (magnifying glass on the desktop rail, or `Ctrl+K`) to search the historical records.
- The discovery passport (✦ icon on the desktop rail, or the home invitation) shows which chapters you have explored; no games, scores or badges are included.
- Click dates, aircraft, leaders, locations and archive images to expand details.
- Leadership cards scroll horizontally automatically; interaction pauses the scroll. Arrows and touch/trackpad scrolling also work.
- **Esc** closes overlays, otherwise opens the visit-end dialog. Use the kiosk's authorised operating system controls to exit a locked-down Edge session; website JavaScript cannot override kiosk security.
- After eight minutes without visitor activity the kiosk returns to its welcome screen, closes media overlays and clears the discovery progress.

### Supplied collection, mapped locally

| Collection | Total |
|---|---:|
| NAF historical milestones | 107 |
| Commanders / Chiefs of the Air Staff | 23 |
| Aircraft types | 20 |
| Bases and installations | 20 |
| AFCSC Jaji milestones | 17 |
| DAW verified milestones | 10 |
| Supplied photographs | 95 |
| Original video files | 7 |

All sections draw from `js/data.js`, generated from the two source Word documents. The original DOCX documents are retained under `assets/source-documents/` for provenance. Supporting images and films are stored under `assets/` and linked by relative path.

**Important content distinctions**
- The Department of Air Warfare brief identifies its founding as **16 March 1978**. Its chronology is used in the DAW section, as specifically required by the Department's committee report. The separate NAF history has some different wording about the earlier Air Faculty; the original source is included for checking.
- Images named `context` or `reference` are displayed only as related illustrations / type references. They are not claimed to depict the exact event or unit. The two numbered officer portrait files are mapped only to their matching named officers. No additional officer portraits or biographies were fabricated.
- The NAF timeline includes contemporaneous claims and events as written in the source document. This package is a faithful museum reconstruction, **not an independent historical fact-check of the source**.
- Video labels are derived from original file names and not used to invent dates or historical attributions.

### Technical approach

- Static HTML/CSS/vanilla JavaScript, **no fetch calls, module-loader, network dependency or HTTP server**.
- Images and videos referenced with relative paths; local `file://` browsing supported.
- Motion uses locally authored Web Animations API/CSS fallback; polished reveals, pointer-following effects, timeline transitions and horizontal gallery autoplay all work offline.
- **GSAP runtime limitation:** a genuine licensed GSAP runtime could not be bundled from this environment. It is *not* falsely presented as included. If provided later, insert it before `js/motion.js` as explained in `libs/gsap/README.txt`. This is the primary gap relative to the user's master GSAP requirement.
- Visitor progress uses memory only and resets at visit end; no analytics or user data collection.
- Standard keyboard focus states, touch controls, and reduced-motion preference are supported.

### Acceptance / limitations

Static HTML/CSS checks, JavaScript syntax checks and a synthetic application-logic rendering test succeeded for all nine routes (entrance plus eight chapters). This environment’s managed Chromium browser blocks all navigation by administrator policy, so live `file://` browser interaction **could not be tested here**. **Windows and Edge kiosk BAT scripts cannot be executed or independently verified in this Linux environment**; run both scripts on the exhibition Windows device and complete an internet-disconnected trial before public installation. Video playback depends on local browser codecs and the source media integrity. The normal website cannot forcibly terminate a Windows restricted kiosk session. Full production acceptance requires device-specific testing.

This project was assembled from provided historical material and is intended for exhibition review; final historical sign-off remains with the source owner / AFCSC content committee.

## Cinematic Exhibition Edition — immersive motion without games

This edition deliberately REMOVES the previous Flight Academy, XP, badges, quizzes, timelines challenges and card games.

New visitor experience:
- Dynamic aviation-inspired particle field, layered atmospheric light, animated gold tracking lines and editorial typography.
- Full-screen museum chapter transitions with sweeping light, subtle depth and staggered content reveals.
- Interactive parallax and cinematic depth in the historic hero photography, with softly moving image backdrops.
- High-contrast, elevated chapter cards, magnetic pointer feedback and responsive hover lighting.
- Cinematic photograph viewing with full-size image, next/previous controls, counter and keyboard arrow support.
- Aircraft and portrait card lighting, film-strip effects, scroll-sensitive progress and tactile click feedback.
- Journey Map tracks chapters viewed ONLY; this is navigation, not a game or score.
- Offline implementation, keyboard focus, touchscreen input, reduced-motion support.

This edition uses native browser Web Animations API, CSS and local JavaScript canvas. Genuine GSAP is not bundled; its runtime would need to be added separately. It does NOT depend on a remote script.

Before deployment, run prepare.bat and run.bat on Windows with Microsoft Edge and test disconnected from the internet. The Windows kiosk launch cannot be tested from Linux.


## AETHER GLASS / Major kinetic redesign (9 November 2026)

An offline-first glassmorphic exhibition inspired by the **interaction language** (not copied artwork or branding) of https://landonorris.com. The experience preserves the supplied NAF history, photographs and films. **No games, quiz mechanics, scoring, achievements or badges.**

- Fullscreen cinematic chapter navigator with dynamic supplied photographic backdrops, keyboard handling and touch support.
- Frosted-glass floating rail, topbar, hero, live chapter preview and media panels; gold/green NAF-inspired treatment.
- Scroll-reactive archive ribbon of 13 supplied photographs, with lightbox interaction.
- GSAP timeline-powered text reveal, menu reveal, hover image transitions, section stagger and ScrollTrigger hero parallax when the genuine GSAP library is locally installed. Native browser motion remains an offline fallback.
- Pointer-following atmospheric light, responsive image sheens, dramatic navigation and a motion-off control.
- All eight original interactive chapters, gallery, original document links and seven offline videos retained.

**GSAP installation requirement:** The build environment cannot download the original JavaScript distribution. This ZIP includes `install-gsap.bat` / `install-gsap.ps1` for **one-time** download of genuine GSAP + ScrollTrigger from jsDelivr on a connected Windows PC. Run `install-gsap.bat` once before unplugging the kiosk from the internet. The scripts save both JS files locally in `libs/gsap/`. Then run `prepare.bat` and `run.bat` offline. An error or missing library leaves the native animated fallback operational, but the additional GSAP motion does not run. Read `libs/gsap/README.txt` for the exact version and licence.

Full Windows kiosk and true GSAP playback need acceptance testing on the destination Windows Edge machine; Linux/browser synthetic tests cannot substitute for that test.
