"use client";

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE_BYTES = 8 * 1024 * 1024; // 8MB pre-compression ceiling

export class ImageValidationError extends Error {}

export function validateImageFile(file: File): void {
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    throw new ImageValidationError("Only JPEG, PNG, or WebP images are allowed.");
  }
  if (file.size > MAX_SIZE_BYTES) {
    throw new ImageValidationError("Image must be smaller than 8MB.");
  }
}

/**
 * Resizes an image to fit within maxDimension and re-encodes it as WebP,
 * reducing upload size and standardizing format. Runs entirely client-side
 * via the Canvas API.
 */
export async function compressImageToWebP(
  file: File,
  { maxDimension = 1600, quality = 0.82 }: { maxDimension?: number; quality?: number } = {}
): Promise<Blob> {
  const bitmap = await createImageBitmap(file);

  let { width, height } = bitmap;
  if (width > maxDimension || height > maxDimension) {
    const scale = maxDimension / Math.max(width, height);
    width = Math.round(width * scale);
    height = Math.round(height * scale);
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context unavailable.");
  ctx.drawImage(bitmap, 0, 0, width, height);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Image compression failed."))),
      "image/webp",
      quality
    );
  });
}
