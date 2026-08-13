# HH Goa 2026 — Frame / ID Card Generator

Upload a photo (or up to 4 for a team shot), it auto-fits into a branded
frame with no manual cropping, add a name and stack, and download or
share a finished PNG.

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

## Face detection + auto-crop

Every uploaded photo is checked client-side with TensorFlow.js
(`@tensorflow-models/blazeface`) before it's accepted:

- **No human face detected** → the upload is rejected with an inline
  message ("No human face detected in that photo...") and nothing is
  added to the slot. Logos, screenshots, landscapes, etc. are all
  rejected this way.
- **Face detected** → the largest/most confident face's bounding box
  is stored alongside the image. `renderFrame.js` then crops around
  that face (`drawFaceCover` in `utils/canvasDraw.js`) instead of a
  blind center-crop, so the subject is consistently framed in the ID
  slot regardless of where they sit in the original photo or its
  aspect ratio.

The model is preloaded on mount (`preloadFaceModel()`) so the first
upload isn't slowed down by the model's cold start; a small spinner
("Checking for a face…") shows per-slot while a photo is verified.

## Notes

- All image processing is client-side (Canvas + TF.js) — no backend needed.
- `renderFrame.js` is a pure function of `{ slots, name, stack }`, so it's
  straightforward to unit test or reuse outside React if needed.
- Swap the procedurally-drawn border in `renderFrame.js` for official HH
  Goa brand assets before shipping, if you have them.
- X's tweet-intent URL can't attach an image by link, so "Share to X"
  opens a pre-filled compose window and the user attaches the PNG they
  just downloaded.
- The TF.js + BlazeFace bundle adds real weight to the app (a few
  hundred KB gzipped plus a small model download on first use) — worth
  knowing if bundle size matters for your deploy.
