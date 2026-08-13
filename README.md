# HH Goa 2026 — Frame / ID Card Generator

Upload a photo (or up to 4 for a team shot), it auto-fits into a branded
frame with no manual cropping, add a name and stack, and download or
share a finished PNG.

Live deployed app: https://goa-frame-generator.netlify.app/

## Run it

```bash
npm install
npm run dev
```

Build for deploy (e.g. drag the `dist/` folder into Vercel or Netlify,
or connect the repo directly):

```bash
npm run build
```

## Structure

```
src/
  constants.js            design tokens (colors, canvas geometry, stack map)
  App.jsx                 owns top-level state, wires panel + preview together
  main.jsx                React entry point
  index.css               global styles, hover/focus states, spin keyframes

  components/
    ControlPanel.jsx       left-hand panel, composes the pieces below
    ModeToggle.jsx          solo / team switch
    PhotoSlots.jsx           upload grid (1 or 4 slots depending on mode)
    DetailsForm.jsx          name + stack inputs, live builder-class preview
    ActionButtons.jsx        download button, share-to-X button
    PreviewCanvas.jsx      right-hand live canvas preview

  hooks/
    useFrameRenderer.js    owns the canvas ref, re-renders on state change,
                           exposes download()

  utils/
    canvasDraw.js          low-level canvas primitives (cover-fit, brackets, grid layout)
    renderFrame.js         composites the full frame (photos + border + ID strip)
    identity.js            builderClass() and idSerial() text generators
```

## Notes

- All image processing is client-side (Canvas API) — no backend needed.
- `renderFrame.js` is a pure function of `{ slots, name, stack }`, so it's
  straightforward to unit test or reuse outside React if needed.
- Swap the procedurally-drawn border in `renderFrame.js` for official HH
  Goa brand assets before shipping, if you have them.
- X's tweet-intent URL can't attach an image by link, so "Share to X"
  opens a pre-filled compose window and the user attaches the PNG they
  just downloaded.
