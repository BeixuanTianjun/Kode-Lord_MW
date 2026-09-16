# Brand assets

Not part of the website. The Pages workflow publishes `Portfolio/` only, so
nothing in here is deployed — these are files to download and upload somewhere
else by hand.

## `linkedin-banner.png` — 1584 × 396

The LinkedIn profile banner. Upload at **Profile → camera icon on the banner →
Change photo**.

It uses the same palette, typeface and gradient as the portfolio site and its
link-preview card, so the three read as one identity rather than three
unrelated designs.

The illustration is not decoration: grey candles are **PRICE**, the gradient
line is **VALUE**, the dashed arrow between them is the **GAP**, and the sheet
is the **DCF** that decides the number. It draws the thesis stated in the
headline.

Two things are deliberate about the layout:

- The **bottom-left is empty**. LinkedIn drops your profile photo there and
  covers roughly the first 240px. Anything put in that corner is thrown away.
- The text sits **right of centre and vertically centred**, because LinkedIn
  crops the banner's height on narrow screens. Centred text survives that crop;
  text near the top or bottom edge does not.

## `source-photo-linkedin-frame.jpg` — 800 × 800

The profile photo as downloaded from LinkedIn, with the green `#OPENTOWORK`
frame still on it. Kept because it is the only original: re-crop from this,
never from the cropped result.

`Portfolio/assets/michael-wibowo.jpg` is the version the site uses — frame
removed, head and shoulders, 440 × 440, ~21 KB.

Removing the frame was possible without losing any of him because the band
never overlaps the subject; it sits entirely on the white studio background
(measured: zero overlapping pixels). So every green pixel could be replaced
with white outright. Two details matter if you redo it:

- Match the band's **anti-aliased edge**, not just its solid colour. A strict
  green test leaves a pale fringe that is not white either, which then merges
  into the subject mask and drags a green arc along the shoulder.
- Centre the crop on the **head**, not on the silhouette's bounding box. The
  shoulders are asymmetric and pull the face off to one side.

## Regenerating the banner

`linkedin-banner.html` is the source. Edit it, then re-render at 2× and
downsample — rendering at 1584 directly gives soft text:

```bash
cd Portfolio && python3 -m http.server 8099 &      # serves the fonts
# point a headless browser at ../brand/linkedin-banner.html,
# viewport 1584×396, deviceScaleFactor 2, screenshot to PNG,
# then resize the 3168×792 result down to 1584×396 (LANCZOS).
```

Keep the 1584 × 396 size. LinkedIn accepts other ratios and crops them badly.
