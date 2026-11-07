# RCCG The Envoys — Content Audit Findings (reviewable, not published)

> Scope: `https://www.rccgtheenvoys.org` (main church site).
> Rule from the user: implement only high-confidence primary-source findings;
> never invent names, addresses, times, contacts, events, captions or image
> associations; do not replace unsupported data with another guess; do not
> mass-delete unverified sections; do not change group/branch listings
> absent evidence; note unresolved choices separately.
> Status of this PR: **documentation only.** No user-facing files are changed.
>
> Wraps regression: `/wraps` is **not** present in this repository, so the
> "leave /wraps untouched" guarantee is trivially satisfied here. See the
> [repository mismatch](#1-repository-mismatch) note.
>
> Research revision: this document reflects the **updated** research pack
> delivered 2026-11-07 (supersedes the initial pack).  See
> [`research-pack-notes.md`](./research-pack-notes.md),
> [`replacement-pack.json`](./replacement-pack.json),
> [`yt-video-metadata.json`](./yt-video-metadata.json),
> [`yt-feed-snapshot.json`](./yt-feed-snapshot.json), and
> [`search-log.md`](./search-log.md).
>
> Final-report format: this single markdown file is the source for the
> requested **one-file PDF**. See [§6](#6-one-file-pdf-production).

---

## 1. Repository mismatch

The audited content — hero copy "WE ARE SENT TOSPREAD THE GOSPEL", 12 branch
detail pages under `/churches/*`, group pages under `/groups/*`,
`/sermons`, `/mercy-convention`, `/wraps`, footer-wide HQ address, footer
YouTube variants, the reused `_DSC*` images — **does not exist in this
repository.** This repo (`Emmanuel-Okpiaifo/Envoys`) contains a single-page
site:

- `index.html` (~380 lines): hero slideshow, "Why we celebrate" bullets,
  testimony form, 3-item journey timeline, 83-image gallery with upload,
  footer.
- `css/styles.css`, `js/main.js`, `js/gallery-upload.js`,
  `js/firebase-config.js`.
- `netlify/functions/list-images.js`, `netlify/functions/delete-image.js`.
- `img/{hero section,Gallery,Journey story,Special,logo}/`.

Nav has **two links only**: "Home" and "Share Testimony". There is no
`/churches`, `/groups`, `/sermons`, `/mercy-convention`, or `/wraps`
route; no "About This Campus" heading; no "Get Directions" button; no
reference to the 7 `_DSC*` filenames; no "Cocoa Industries" address; no
HQ phone/email block beyond what appears in anniversary-specific docs.

A text search across the whole repo confirms zero matches for
`campus`, `About This`, `Get Directions`, `Sunday ... 8:30`,
`sermon`, `Mercy Convention`, `solid-rock`, `royal-diadem`,
`envoys-nest`, `mega-stars`, `the-haven`, `/wraps`, `Cocoa Industries`,
`WE ARE SENT`. The string `@rccgtheenvoys` only appears inside
Instagram-saver image filenames in `img/Gallery/` and `img/Journey story/`;
it is not a live external link.

**Action needed from the user:** point this agent at the repository that
actually renders `rccgtheenvoys.org` so the items below can be implemented
against real DOM. Until then, the items are catalogued as **proposed**;
none are safely applicable in this codebase without inventing surfaces,
which the task rules explicitly forbid.

---

## 2. What this PR does

1. **Preserves the updated research pack in-repo** under `docs/content-audit/`
   so the artifacts are reviewable alongside this report and travel with the
   PR history:
   - `research-pack-notes.md` — markdown findings (verified sources, key
     fixes, parent-browser items, not-found items, deep-pass additions).
   - `replacement-pack.json` — replacements + open gaps, each carrying
     `evidence_url`, `evidence_date`, `confidence`, `conflicts`, `status`.
   - `yt-feed-snapshot.json` — the 15-item YouTube RSS snapshot.
   - `yt-video-metadata.json` — per-video watch-page metadata (length, live
     flag, stream start timestamp, channel, view count) that distinguishes
     **full livestream services** from **edited convention sessions** from
     **empty/scheduled entries**.
   - `search-log.md` — audit trail of per-target search queries, candidate
     accounts and confidence judgments.
2. **Does not** add campus/branch wording anywhere, does not seed branch /
   group / sermon copy, does not touch `index.html`, `css/`, `js/`, or
   `netlify/functions/`. The deployed anniversary page is byte-identical
   on this branch (`git diff main --stat` shows only additions under
   `docs/content-audit/`).

---

## 3. Status of every proposed content correction

Legend: **IMPLEMENTED (branch)** · **PROPOSED (pending correct repo)** ·
**DEFERRED (research continuing)** · **EXCLUDED (user-mandated)** ·
**OBSERVED (in this repo, not in audit scope — flagged only)**.

### 3.1 Terminology

| # | Page | Change | Status | Reason |
|---|------|--------|--------|--------|
| 1 | `/churches/*` (12 pages) | Heading "About This Campus" → "About This Branch" | **PROPOSED** | String not present in this repo. Confidence: high. Evidence: user instruction 2026-11-07. |
| 2 | site-wide (copy, meta, alt, code specs) | `campus`/`campuses` → `branch`/`branches` | **PROPOSED** | Zero matches for `campus` in this repo (verified with ripgrep across `index.html`, `css/`, `js/`, `netlify/`). The pastor's own site uses "expressions" for the same concept; stick with "branches" per user. |

### 3.2 Virtual-branch "Get Directions" behavior

| # | Page | Change | Status |
|---|------|--------|--------|
| 3 | `/churches/tech-church` | Remove "Get Directions"; expose "Join online" only when a real link is verified | **PROPOSED** |
| 4 | `/churches/limitless` | Same as #3 | **PROPOSED** |

### 3.3 Group pages

> **Do not** remove Mega Stars from the site and **do not** add "The
> Interphase" based on the pastor-site mismatch alone. The pastor site
> listing "Interphase / Solid Rock / Royal Diadem / Envoys Nest / The
> Haven" and omitting Mega Stars is **not** proof that Mega Stars is
> invalid; the site also uses "Envoys Nest Hub" vs the pastor site's
> "Envoys Nest". Hold these edits until the church confirms the
> canonical list.

| # | Page | Change | Status |
|---|------|--------|--------|
| 5 | `/groups/solid-rock` | Show description once; drop "At X, we are passionate about…" template paragraph | **PROPOSED** |
| 6 | `/groups/royal-diadem` | Same as #5 | **PROPOSED** |
| 7 | `/groups/envoys-nest` | Same as #5 | **PROPOSED** |
| 8 | `/groups/mega-stars` | Same as #5 | **PROPOSED** |
| 9 | `/groups/the-haven` | Same as #5 | **PROPOSED** |
| 10 | `/groups/royal-diadem` — Past Events | Add real item: "THE KING'S DAUGHTER \|\| ROYAL DIADEM CONFERENCE" → `https://www.youtube.com/watch?v=Oe0gbIzLLbQ`, local thumbnail `images/yt_Oe0gbIzLLbQ.jpg`. Metadata: **full livestream, 7h 37m, streamed 2026-11-07 ~09:00 WAT** (see `yt-video-metadata.json`). Label as the full conference livestream, not a sermon extract. Event date unknown; show the stream date and label it as such. | **PROPOSED** |
| G1 | `/groups/*` canonical list | Compare site vs pastor site; confirm with church before add/remove | **DEFERRED** — not actionable without confirmation |

### 3.4 Sermons page + Home "Latest Sermon" panel

> **Important correction from the updated pack:** the five old titles that
> could not be found in the latest-15 feed are **unverified**, **not**
> fabricated. "LIVING IN THE NEW" in particular is a **real** Envoys-channel
> title — it appears as `LIVING IN THE NEW || RCCG THE ENVOYS || 11TH
> JANUARY 2026` and `METAMORPHOSIS - LIVING IN THE NEW PT 3 || P.DANIEL
> OLAWANDE || 18th January 2026`. The site's 2025-03-30 **date** is what
> conflicts; the title itself is attested.  Never label the originals
> "fake" in the PR copy, in the PDF, or in commit messages.
>
> **Full-service vs extract labeling (essential):** the replacement videos
> are **full services** or **edited convention sessions**, not individual
> sermon extracts. Per `yt-video-metadata.json`:
>
> - `Oe0gbIzLLbQ` — full livestream, 7h 37m (Royal Diadem conference, streamed 2026-11-07)
> - `d6chqGb08oQ` — full livestream, 3h 45m (Celebration Service, service date 2026-11-01 per title)
> - `d37qOZrvbiM` — full livestream, 4h 27m (Coronation Service, service date 2026-10-25 per title)
> - `TNRDoJrq2SQ` — live service, 1h 12m (Illumination, service date 2026-11-03 per title)
> - `aYzYQchRtxI` — live service, 55m 48s (Illumination, service date 2026-10-27 per title)
> - Mercy Convention Day uploads (`hb7z5H3g9hU`, `U-YKDHHkXLc`, `DiNyIBma-gQ`, `pipDJ9Eo1gY`, `pbJ7sx0fW6w`, `ueE1tAoNzHw`, `zT_adMCeNMA`, `kCL0-HYL50c`) — edited convention sessions, 25–98 min each
> - `8h1DFdYcnGQ`, `E2pg_DMnIQY` — **zero-length / empty** (scheduled live entries that never produced playable video). **Do not link these.**
>
> **Service date vs upload date (essential):** the feed `<published>` is the
> upload / stream date, not the service date. Use the date stated in the
> title where present (e.g. "3RD NOVEMBER 2026"); label it as the service
> date. Show the upload date only as a secondary, labelled field.
>
> **Title typos:** `IILLUMINATION`, `UENDING`, `CORNATION` appear on
> YouTube. **Do not** copy these typos to the site. Normalize to
> `ILLUMINATION`, `UNENDING`, `CORONATION` and note the fix in the PDF so
> the church media team can decide whether to re-title on YouTube.
>
> **Speaker:** leave "Unverified" unless the title or description names a
> speaker. Only `U-YKDHHkXLc` ("PDANIEL OLAWANDE") and `hb7z5H3g9hU`
> ("PDANIEL OLAWANDE") name the speaker in-title; the convention
> `#pdanielolawande` hashtag alone is not an authored credit.

| # | Page | Current (site) | Verified replacement (title, URL, service/stream date, type, speaker) | Status |
|---|------|-----------|------------------------|--------|
| 11 | `/sermons` card 1 | LIVING IN THE NEW, 2025-03-30, channel root | THE KING'S DAUGHTER \|\| ROYAL DIADEM CONFERENCE · `Oe0gbIzLLbQ` · streamed 2026-11-07 (full livestream 7h37m) · speaker UNVERIFIED | **PROPOSED** |
| 12 | `/sermons` card 2 | THE POWER OF FAITH, 2025-03-23 | ILLUMINATION SERVICE \|\| KINGDOM PRIORITIZATION · `TNRDoJrq2SQ` · service 2026-11-03 (title); upload 2026-11-04 · full live service 1h12m · speaker UNVERIFIED | **PROPOSED** |
| 13 | `/sermons` card 3 | WALKING IN PURPOSE, 2025-03-16 | UNENDING OPEN DOORS \|\| DAY 8 EVENING \|\| MERCY CONVENTION 2026 · `kCL0-HYL50c` · uploaded 2026-11-03 (edited convention session, 38m 39s) · speaker UNVERIFIED | **PROPOSED** |
| 14 | `/sermons` card 4 | GRACE FOR THE JOURNEY, 2025-03-09 | UNENDING OPEN DOORS \|\| DAY 7 EVENING \|\| MERCY CONVENTION 2026 · `zT_adMCeNMA` · uploaded 2026-11-03 (edited convention session, 28m 43s) · speaker UNVERIFIED | **PROPOSED** |
| 15 | `/sermons` card 5 | THE HEART OF WORSHIP, 2025-03-02 | BUSINESS BREAKTHROUGH \|\| DAY 6 MORNING SESSION \|\| MERCY CONVENTION 2026 · `ueE1tAoNzHw` · uploaded 2026-11-03 (edited convention session, 1h 38m) · speaker UNVERIFIED. **Mismatch to resolve:** title says "Day 6 Morning", description says "Day 5 Evening". Needs media-team confirmation before use | **PROPOSED** (hold on this specific card pending title/description resolution) |
| 16 | `/sermons` card 6 | STANDING ON THE WORD, 2025-02-23 | UNENDING OPEN DOORS \|\| DAY 5 EVENING \|\| MERCY CONVENTION 2026 · `pbJ7sx0fW6w` · uploaded 2026-11-03 (edited convention session, 24m 54s) · speaker UNVERIFIED | **PROPOSED** |
| 17 | `/` LATEST SERMON panel | LIVING IN THE NEW, 2025-03-30, Pastor Daniel Olawande | Current latest = THE KING'S DAUGHTER \|\| ROYAL DIADEM CONFERENCE (`Oe0gbIzLLbQ`). Strongly suggest wiring to the RSS feed (`channel_id=UCfTXn9jTmbqnGu1qpT9l18Q`) at build or runtime so this panel never goes stale. Speaker on home card: "Unverified" (the historic "Pastor Daniel Olawande" label is not supported by the current video's title). | **PROPOSED** |
| 18 | `/sermons` date field | "Feb–Mar 2025" literals | Distinguish **service date** (parse from title where present) from **upload date** (feed `<published>`). Show the service date as the headline date, and surface the upload date in a secondary line only when they differ. | **PROPOSED** |

### 3.5 Time-aware past-event presentation (preserve history)

| # | Page | Change | Status |
|---|------|--------|--------|
| 19 | `/` + `/mercy-convention` | Mercy Convention 2026 (14–22 Oct) is concluded. Evidence: Envoys-channel day uploads on 2026-11-03 and YouTube oEmbed confirms Day 1–4 session recordings are on the P.Daniel Olawande channel; the pastor's Telegram mirror ("first night of mercy after the Mercy Convention") corroborates. Recommended: flip the hero/CTA to a "has ended — rewatch" variant; keep the event page as history; close or hide the volunteer sign-up form; link rewatch URLs (e.g. Day 1 `hb7z5H3g9hU`, Day 8 Evening `kCL0-HYL50c`; pastor-channel Day 1–4 IDs `VNl-5bZrV00`, `yKrRNzm3MuQ`, `7me4KvmuwH0`, `YWYexkGHF6Q`, `-rCW84cq5dM`, `pF-wkHxyvAg` only after visually confirming each one plays on `@PDanielOlawande`). Do **not** delete event history. Theme on site "The Chain of Open Doors — Unending Open Doors" vs video "Unending Open Doors" — keep the site theme unless the church changes it. | **PROPOSED** |

### 3.6 HQ address and canonical social links

| # | Scope | Change | Status |
|---|-------|--------|--------|
| 20 | site-wide address | `6a cocoa industries road, ikeja, lagos` → `6A Cocoa Industries Road, Ogba, Ikeja, Lagos`. Primary evidence: Facebook page `og:description` = "6A COCOA INDUSTRIES RD, OGBA, IKEJA". Secondary (Telegram mirror) adds "Ogba Industrial Estate" and the alias "The Envoys Centre"; those additions stay **PROPOSED (medium)** until a primary source confirms. **High-confidence change** is limited to adding "Ogba" into the address line. | **PROPOSED (high for Ogba; medium for 'Industrial Estate' / 'The Envoys Centre')** |
| 21 | footer YouTube | Two variants (`youtube.com/@RCCGTheEnvoys`, `youtube.com/rccgtheenvoys`) → single `https://www.youtube.com/@RCCGTheEnvoys` (channel `UCfTXn9jTmbqnGu1qpT9l18Q`) | **PROPOSED** |
| 22 | `/groups/*` + `/` Instagram link | Keep `https://instagram.com/rccgtheenvoys` (verified "RCCG - THE ENVOYS CHURCH HQ", ~63K followers) | **PROPOSED (no-op change)** |
| 23 | site-wide HQ **phone** | `+2349062134890` currently on site. Aggregator `exa.ai` shows `+2348144235656` and "Sun 3–7 PM"; pastor office listed as `+2348101490714` (office, not church). **Do not swap** to an aggregator or office contact. Leave current number pending church-office confirmation. | **DEFERRED** |
| 24 | site-wide **Sunday service time** | Site shows 12:00 PM; Facebook About says "1:00 PM & 3:00 PM"; Telegram mirror mentions "coronation service … 12 pm". **Do not swap.** Leave 12:00 PM pending church-office confirmation (newer sources agree with 12 PM). | **DEFERRED** |

### 3.7 Branch-level findings

> Per the updated instruction: Sango venue/time and Abule Egba primary-page
> lead remain **not implemented** pending browser-primary confirmation.
> Sango's **status change (active, not inauguration-pending)** is backed by
> the pastor's Threads account's activity cadence and branch-page posts
> through Oct 2026 — the countdown-at-zero is already a broken UI state
> and may be removed without introducing new claims. Branch venue/time
> stays unimplemented.

| # | Page | Proposed change | Status |
|---|------|-----------------|--------|
| 25 | `/churches/vi` | Instagram `@rccgtheenvoysvi` ("RCCG - THE ENVOYS VICTORIA ISLAND") | **DEFERRED** (medium; search index only; profile wall blocked fetch; not confirmed as linked from HQ) |
| 26 | `/churches/igando` | Instagram `@rccgtheenvoysigando` ("RCCG - THE ENVOYS IGANDO"). A reel cites Pastor Raymond Iroham ministering — guest vs resident unknown, do not label as pastor | **DEFERRED** (same caveat) |
| 27 | `/churches/sango` — status | Replace the stuck `00:00:00:00` inauguration countdown with a non-claim-making state (e.g. remove the countdown block entirely). Evidence for activity: branch's Facebook page via `prayers1.com` mirror shows posts through 2026-10 announcing Celebration Service and Night of Mercy. Confidence for "active": medium (secondary mirror); confidence for "countdown is broken UI": high (visible on the live site). | **PROPOSED (remove countdown only)** |
| 28 | `/churches/sango` — venue / time | "Maridom Palace Hotel, 1/3 Maridom Close, Toll Gate, Ota, Ogun State" and "Sun 8:00 AM" and alias "The Light House" are from the `prayers1.com` secondary mirror of the branch Facebook page. **Do NOT implement.** Pending browser-primary confirmation on Facebook. | **DEFERRED** |
| 29 | `/churches/abule-egba` — official account | Facebook page `976814785515674` "RCCG The Envoys Abule Egba" via `prayers1.com` mirror; posts 2–3 Nov 2026. Primary-page lead pending; **do NOT implement** address, time, or lead-pastor copy. | **DEFERRED** |
| 30 | `/churches/ajah` — existence | Pastor's Threads post 2025-10-07 (`threads.com/@pdanielolawande/post/DPgWmBiAivu`): "Yes! RCCG THE ENVOYS AJAH is hereeee" with hashtag `#envoysajah`. Confidence: **high** (pastor's own account). No address or time in the snippet. Safe to keep the page listed; **do not** add venue/time. | **PROPOSED (existence only)** |
| 31 | `/churches` (index) + `/` — branch count / footprint | Pastor's official site (`pdanielolawande.com`): "a community-oriented family church across 12 expressions in Lagos, Nigeria, South Africa, the USA, and online" — matches the 12 branch pages. Use "branches" per user. | **PROPOSED (copy framing only; no listing changes)** |

### 3.8 Generic `_DSC*` image reuse

| # | Scope | Change | Status |
|---|-------|--------|--------|
| 32 | site-wide (not `/wraps`) | Stop reusing `_DSC4231/4278/4280/4309/4310/4325/4354` across home groups, group event cards, giving header. Use one image per context; replace with genuine church-supplied labelled photos or YouTube thumbnails for sermon cards. Downloadable local assets preferred; no generated / stock stand-ins; no unstable hotlinked Instagram CDN URLs. (`_DSC*` filenames are not referenced from this repo — zero matches.) | **PROPOSED** |
| 33 | branch / group photos | Genuine branch/group photos **not yet acquired** (browser pass continuing). Until acquired, do not substitute other `_DSC*` reuse, stock art, or hotlinked IG CDN URLs for branch or group headers. | **DEFERRED** |

### 3.9 Explicit exclusions

| Scope | Decision |
|-------|----------|
| `/wraps` and all its data, assets, functionality | **EXCLUDED** per Emmanuel's authorization. No files touched. `/wraps` is not present in this repository; CI regression check for it is trivially green here. |

### 3.10 Observed in THIS repo (anniversary subsite — flagged, NOT fixed)

These items were spotted while confirming the mismatch. They are **not** in
the audit's scope and are left for the user to decide. No change is made.

| # | File / line | Observation |
|---|-------------|-------------|
| O1 | `index.html` L201 | "Join us on 22nd February 2026 as we celebrate together." Today is 2026-11-07; the event is ~9 months past. A "time-aware past-event presentation" treatment (preserve as retrospective) may be desired here, matching the audit's intent for Mercy Convention on the main site. **Not changed** — needs user confirmation that this subsite is in scope. |
| O2 | `index.html` L117 | Testimony-form submission still active. If it should now be read-only, flip to a closed state. **Not changed.** |
| O3 | `WEBSITE_INDEX.md` L250–258, L295 | "22nd February 2026" copy and "108 images" count — stale strings only, not shipped. **Not changed.** |
| O4 | `img/Journey story/`, `img/Gallery/`, `img/Special/desktop.ini` | Image filenames like `Insta_Saver_@rccgtheenvoys_...` and `Insta_Saver__pdanielolawande_...` suggest third-party-saver sourcing. The audit's "no unstable hotlinked Instagram CDN URLs" principle still applies; whether the Instagram subjects consented to use is unverified. **Flagged only.** |
| O5 | `WEBSITE_INDEX.md` L123 (spreadsheet ID) + `APPS_SCRIPT_CODE.gs`, `js/firebase-config.js` | Submission backends. **Out of audit scope**; mentioned only so the user knows the surface exists. |

---

## 4. Open gaps carried forward from the research pack

Verbatim from `replacement-pack.json` → `gaps` (summary; the JSON is the source of truth):

- **Speaker per video** — titles rarely name the speaker; Mercy Convention videos tagged `#pdanielolawande` only; `U-YKDHHkXLc` and `hb7z5H3g9hU` are the only two in-feed titles that explicitly name the speaker.
- **Duplicate / empty Illumination uploads (27 Oct)** — `8h1DFdYcnGQ` and `E2pg_DMnIQY` are `lengthSeconds = 0` (scheduled/empty); `aYzYQchRtxI` (55m 48s, streamed 2026-10-27T17:12Z) is the playable one. Church media team must pick the canonical video. Title typos (`IILLUMINATION`, `UENDING`, `CORNATION`) must not be copied to the site.
- **Mercy Convention rewatch** — pastor-channel Day 1–4 IDs (`VNl-5bZrV00`, `yKrRNzm3MuQ`, `7me4KvmuwH0`, `YWYexkGHF6Q`, `-rCW84cq5dM`, `pF-wkHxyvAg`) are confirmed via oEmbed as being on the `P.Daniel Olawande` channel titled `NIGHT OF MERCY CONVENTION || UNENDING OPEN DOORS || DAY ONE EVENING … DAY FOUR EVENING`. Day 5–9 pastor-channel IDs still unknown.
- **Mercy Convention Day 9 + remaining sessions** — feed exposes only latest 15; needs parent-browser traversal of `youtube.com/@RCCGTheEnvoys/videos`.
- **HQ Sunday service time** (12:00 PM vs 1:00/3:00 PM vs 12 PM) — leave current 12:00 PM pending church-office confirmation; do not swap.
- **HQ phone** — leave `+2349062134890` pending church-office confirmation; do not swap to aggregator or office contacts.
- **`/churches/sango` countdown** — currently stuck at `00:00:00:00`; replace with non-claim-making state (see §3.7 item 27). Branch venue/time stays deferred.
- **Footer branch list** — omits Limitless, Street Church, Tech Church. Confirm active/inactive before changing.
- **Home pastor-photo identity** — `_DSC4278` captioned "Pastor Daniel" and `_DSC4231` captioned "Pastor Nifemi" are the same files used on other pages; identity in the files is not independently verified.
- **`/wraps`** — deliberately left OPEN; no changes per user instruction.
- **11 branches × 4–5 fields each** (social, service time, address + pastor + contact, photo, description copy). The uniform "Sundays at 8:30 AM" default remains unverified. Branch descriptions remain generic template copy (Ajah reuses the site tagline verbatim). None to be updated without a primary branch flyer / branch Instagram bio / church-office confirmation.
- **5 groups × 2 fields each** (past events + photos, meeting times/contact/leader). Replace or hide group "Past Events" with "Follow updates on `@rccgtheenvoys`" rather than deleting silently.
- **Official group Instagram accounts** — none found for any of the 5 groups; pastor site also does not link them.
- **"Interphase" group** — pastor site names it; site has no such page. Do not add without confirmation. Mega Stars appears on site but not on pastor site; do not remove without confirmation.
- **"LIVING IN THE NEW" exact video IDs** — Jan 2026 videos exist on the Envoys channel; exact IDs not captured in this pass. Needs browser pass of `youtube.com/@RCCGTheEnvoys/search?query=living+in+the+new`.
- **Founding history (optional)** — Guardian/ThisDay 2023 reported the inaugural service on 19 Feb 2023, 4 PM, at Excellence Hotel Ogba. Historic only; do not treat as current times.

**Hard rule reaffirmed:** where a gap exists, the site must not be updated
with another guess. "Sundays at 8:30 AM," any branch address, any leader
name, any group event, any caption, or any image association is to be
revised only against a primary source (branch-supplied flyer/post, the HQ
Instagram bio/highlights, or the church office).

---

## 5. Validation checklist (for the correct repo, when it is provided)

When the main-site repo is linked, these QA gates must pass before merge —
included here as acceptance criteria so the user can plan review:

- Build and lint pass.
- `/wraps` byte-diff is empty vs `main` (regression check). Suggested CI
  guard: `git diff --quiet origin/main -- 'wraps/**' 'img/wraps/**'` (adjust
  paths to the real repo layout). This PR documents the guarantee; it does
  not add the CI job because the target repo is not this one.
- Responsive checks at 360, 768, 1024, 1440 for every page that changes.
- Before/after screenshots attached per changed page: home, `/sermons`,
  `/mercy-convention`, each group page that receives a verified fix, each
  branch page that receives a verified fix, footer.
- Every sermon-card speaker label reads `Unverified` unless the YouTube
  title or description explicitly names the speaker.
- Every sermon card is **typed** as "Full live service", "Edited convention
  session", or similar — never as "sermon extract".
- Every sermon card distinguishes **service date** (from title) from
  **upload date** (from feed) when they differ; both are labelled.
- Normalised titles on the site (`ILLUMINATION`, `UNENDING`, `CORONATION`);
  the PDF flags the YouTube typos for the church media team.
- Mercy Convention volunteer form is removed from the DOM or returns a
  "sign-ups closed" state; no silent 200 OK with form-abandon.
- Virtual branches (`/churches/tech-church`, `/churches/limitless`) have
  no "Get Directions" element in the DOM; `google.com/maps` deep-link is
  absent for those two pages.
- Sango page: no inauguration countdown element in the DOM; no new
  venue/time injected.
- Abule Egba page: no new venue/time/lead injected pending primary.
- Terminology sweep: `rg -i '\bcampus(es)?\b'` returns no hits in any
  shipped file (HTML, CSS, JS, meta, JSON data files, sitemap, alt text).
- No swap of HQ phone or Sunday service time to any aggregator- or
  office-sourced value.
- No `_DSC*` reuse across more than one card/context.
- No stock stand-ins; no `scontent*.fbcdn.net` or Instagram CDN hotlinks;
  no generated imagery.
- Groups page list unchanged (Mega Stars remains; Interphase not added)
  unless the church explicitly confirms.

---

## 6. One-file PDF production

The user asked for a **single PDF final report**. This markdown file is
the source. It is linearly structured so the PDF can be produced
mechanically. Suggested commands (run after the real-site PRs land, so
the "Implemented in branch" column is populated):

```bash
# Option A: pandoc (recommended for consistent typography)
pandoc docs/content-audit/CONTENT_AUDIT_FINDINGS.md \
  -o docs/content-audit/CONTENT_AUDIT_FINDINGS.pdf \
  --from gfm \
  --pdf-engine=xelatex \
  -V geometry:margin=1in \
  -V mainfont="DejaVu Sans" \
  --toc --toc-depth=3

# Option B: md-to-pdf (quick HTML/CSS pipeline, no TeX required)
npx --yes md-to-pdf docs/content-audit/CONTENT_AUDIT_FINDINGS.md
```

The PDF's structure mirrors this file's §1–§7:

1. Scope, authorization, exclusions (incl. `/wraps`).
2. Repository-mismatch note (this PR's finding).
3. Per-item table (implemented / proposed / deferred / excluded / observed)
   — one row per `replacement-pack.json` entry.
4. Per-page before/after screenshot gallery (added once the correct repo
   is linked and the items marked PROPOSED are actually implemented).
5. Open-gaps register (all `replacement-pack.json` → `gaps` rows).
6. Primary-source bibliography (YouTube channel + RSS URL + snapshot date,
   Instagram HQ profile URL + observed display name + follower count +
   snapshot date, Facebook page URL + observed About text + staleness
   caveat, P Daniel Telegram mirror URL + caveat, pastor's site, Threads
   launch post, `prayers1.com` branch mirrors with mirror-vs-primary
   caveat).
7. Regression statement for `/wraps` (byte-diff proof) + screenshots of
   the live `/wraps` page before and after to prove untouched rendering.

---

## 7. Next action requested from the user

Point this agent at the repository that renders `rccgtheenvoys.org`
(or grant access to the deployment's source). The updated research pack
in `docs/content-audit/` is ready; items marked **PROPOSED** above are
the safe set to implement first. Items marked **DEFERRED** stay out
until the parent-browser pass finishes and primary-source confirmations
land.
