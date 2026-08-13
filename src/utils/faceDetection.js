import * as tf from "@tensorflow/tfjs";
import * as blazeface from "@tensorflow-models/blazeface";

let modelPromise = null;

/**
 * Loads (and caches) the BlazeFace model. First call pays the load
 * cost; every call after reuses the same promise/model instance.
 */
function getFaceModel() {
  if (!modelPromise) {
    modelPromise = tf.ready().then(() => blazeface.load());
  }
  return modelPromise;
}

/**
 * Kicks off model loading without waiting on it — call this early
 * (e.g. on mount) so the first photo upload doesn't pay the cold
 * start cost.
 */
export function preloadFaceModel() {
  getFaceModel().catch(() => {
    // Swallow here; the real error surfaces on the next detectFaces call.
  });
}

/**
 * Runs face detection on an already-loaded HTMLImageElement.
 * Returns bounding boxes in the image's natural pixel coordinates,
 * largest face first: [{ x, y, width, height, probability }].
 * Returns [] when no face is found (or none the model is confident
 * about) — callers treat that as "not a valid profile photo".
 */
export async function detectFaces(img) {
  const model = await getFaceModel();
  const predictions = await model.estimateFaces(img, false);

  return predictions
    .map((p) => {
      const [x1, y1] = p.topLeft;
      const [x2, y2] = p.bottomRight;
      const probability = Array.isArray(p.probability) ? p.probability[0] : p.probability ?? 1;
      return { x: x1, y: y1, width: x2 - x1, height: y2 - y1, probability };
    })
    // BlazeFace is already fairly conservative, but drop low-confidence
    // stragglers so noisy backgrounds don't sneak through as "faces".
    .filter((f) => f.probability >= 0.7)
    .sort((a, b) => b.width * b.height - a.width * a.height);
}
