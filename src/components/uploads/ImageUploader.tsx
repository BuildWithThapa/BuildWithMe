"use client";

import { useRef, useState } from "react";
import { UploadCloud, Loader2, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { validateImageFile, compressImageToWebP, ImageValidationError } from "@/lib/image";
import { uniqueFileName } from "@/lib/utils";

type Bucket = "profiles" | "projects" | "cv" | "uploads";

interface ImageUploaderProps {
  bucket: Bucket;
  /** Folder prefix within the bucket, typically the user's id — enforced by storage RLS. */
  folder: string;
  initialUrl?: string | null;
  onUploaded: (publicUrl: string, path: string) => void;
  aspect?: "square" | "video";
  label?: string;
}

export function ImageUploader({
  bucket,
  folder,
  initialUrl,
  onUploaded,
  aspect = "square",
  label = "Upload image"
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(initialUrl ?? null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setError(null);
    try {
      validateImageFile(file);
    } catch (err) {
      setError(err instanceof ImageValidationError ? err.message : "Invalid image.");
      return;
    }

    setIsUploading(true);
    // Show an instant local preview while the network upload completes.
    const localPreviewUrl = URL.createObjectURL(file);
    setPreview(localPreviewUrl);

    try {
      const compressed = await compressImageToWebP(file);
      const path = `${folder}/${uniqueFileName("image.webp")}`;

      const supabase = createClient();
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(path, compressed, { contentType: "image/webp", upsert: false });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl }
      } = supabase.storage.from(bucket).getPublicUrl(path);

      setPreview(publicUrl);
      onUploaded(publicUrl, path);
    } catch {
      setError("Upload failed. Please try again.");
      setPreview(initialUrl ?? null);
    } finally {
      setIsUploading(false);
      URL.revokeObjectURL(localPreviewUrl);
    }
  };

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      <div
        className={`relative flex ${
          aspect === "square" ? "aspect-square w-32" : "aspect-video w-full"
        } items-center justify-center overflow-hidden rounded-xl border border-dashed border-ink-900/20 bg-ink-900/[0.02] dark:border-paper/20 dark:bg-paper/[0.02]`}
      >
        {preview ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <button
              type="button"
              aria-label="Remove image"
              onClick={() => {
                setPreview(null);
                onUploaded("", "");
              }}
              className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-ink-900/70 text-white"
            >
              <X size={12} />
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex flex-col items-center gap-1.5 p-4 text-center text-xs text-ink-900/50 dark:text-paper/50"
          >
            {isUploading ? <Loader2 size={20} className="animate-spin" /> : <UploadCloud size={20} />}
            {isUploading ? "Uploading..." : "Click to upload"}
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />

      {preview && !isUploading && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-2 text-xs font-medium text-signal-500"
        >
          Replace image
        </button>
      )}

      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}
