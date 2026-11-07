# RCCG The Envoys: research pack (internal, 7 Nov 2026 WAT)
Terminology: BRANCHES, never "campuses". Wraps stays untouched; it is listed only as an open item.
Structured data: replacement_pack.json (25 replacements, 75 open gaps). YouTube feed snapshot: yt_feed.xml / yt_feed.json. Thumbnails: images/yt_<id>.jpg, each from https://i.ytimg.com/vi/<id>/hqdefault.jpg (official channel uploads).

## Verified sources
- YouTube: https://www.youtube.com/@RCCGTheEnvoys, channel UCfTXn9jTmbqnGu1qpT9l18Q. The public RSS feed gives the latest 15 uploads, newest first: Oe0gbIzLLbQ (Royal Diadem conference, 7 Nov), TNRDoJrq2SQ (Illumination 3 Nov), the Mercy Convention day uploads, d6chqGb08oQ (Celebration 1 Nov), d37qOZrvbiM (Coronation 25 Oct).
- Instagram HQ: https://www.instagram.com/rccgtheenvoys/ ("RCCG - THE ENVOYS CHURCH HQ", 63K followers, 6,519 posts).
- Facebook: https://www.facebook.com/rccgtheenvoys. Its About text says "6A Cocoa Industries Rd, Ogba, Ikeja; Sunday service 1:00PM & 3:00PM". These times conflict with the site's 12 PM and are probably old.
- Pastor's Telegram (third-party mirror telemetr.io): address "The Envoys Centre, 6A Cocoa Industries Road, Ogba Industrial Estate, Ikeja"; Sunday coronation service at 12pm; "first night of mercy after the Mercy Convention". This shows the convention has ended.
- Branch Instagram accounts found by search (not yet confirmed as linked from HQ): @rccgtheenvoysvi and @rccgtheenvoysigando.

## Key fixes
1. Sermons and the Home "Latest Sermon" panel: replace the six 2025 entries, which cannot be verified, with real videos from the feed and exact watch URLs. Leave the speaker as "unverified" unless it is confirmed.
2. Mercy Convention: mark it concluded, add rewatch links, and close the volunteer form.
3. Branches: change the heading to "About This Branch". Remove "Get Directions" on the virtual branches (Tech Church, Limitless). Everything else (times, addresses, leaders, photos) stays in the gap register; do not invent values.
4. Groups: remove the duplicated description and the boilerplate paragraph. The past events and their reused images cannot be verified; keep them flagged rather than deleting them silently. Royal Diadem has one real item: Oe0gbIzLLbQ.
5. Images: stop reusing the seven _DSC files across cards.

## Needs parent browser (Instagram profiles are behind a login wall over curl after the first request)
- https://www.instagram.com/rccgtheenvoys/ : bio links, highlights, tagged branch and group accounts.
- https://www.instagram.com/rccgtheenvoysvi/ and https://www.instagram.com/rccgtheenvoysigando/ (reel https://www.instagram.com/rccgtheenvoysigando/reel/DG--8NjtEEg/ names Pastor Raymond Iroham ministering; whether he is the resident pastor is unknown).
- https://www.youtube.com/@RCCGTheEnvoys/videos : full Mercy Convention list and the Day 9 video.
- Sango page: check visually whether the countdown stays at zero.

## Not found anywhere
Official accounts for Ikeja (beyond HQ), Yaba, Ajah, Sango, Abule Egba, Street Church, Limitless, South Africa, USA and Tech Church, and for all 5 Natural Groups. Real branch times, addresses and leaders. Real group events and photos. All are listed in the gaps section of the JSON.

## Deep pass additions (see search_log.md, yt_video_metadata.json, replacement_pack.json)
- Sango is active, not awaiting inauguration: the branch's Facebook page (mirror) shows Maridom Palace Hotel, Toll Gate, Ota, Sun 8:00 AM, "The Light House". Confirm on Facebook.
- Abule Egba has an official Facebook page (976814785515674) and was active in Nov 2026.
- Ajah: the pastor's Threads post of 7 Oct 2025 announced the launch.
- The pastor's site confirms 12 branches across Lagos, Nigeria, South Africa, the USA and online. It also lists a group called "The Interphase" and omits Mega Stars.
- Mercy Convention: session videos on the pastor's YouTube channel are confirmed by oEmbed (Days 1-4). The Envoys channel has edited uploads.
- "Living in the New" is a real Jan 2026 series. The site's 2025 date conflicts with it.
- Still none found: Yaba, Street Church, Limitless, South Africa, USA, Tech Church accounts; any group accounts; any branch addresses or times beyond Sango.
