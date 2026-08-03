"use client";

import { useRef, useState } from "react";
import { UploadCloud, File as FileIcon, Trash2, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { uniqueFileName } from "@/lib/utils";
import { recordUpload, deleteUpload } from "@/app/actions/uploads";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
const MAX_SIZE = 10 * 1024 * 1024;

export interface UploadRecord {
  id: string;
  bucket: string;
  path: string;
  original_filename: string | null;
  mime_type: string | null;
  size_bytes: number | null;
  created_at: string;
}

function formatBytes(bytes: number | null): string {
  if (!bytes) return "";
  const kb = bytes / 1024;
  return kb > 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${Math.round(kb)} KB`;
}

export function UploadManager({ userId, initialUploads }: { userId: string; initialUploads: UploadRecord[] }) {
  const [uploads, setUploads] = useState<UploadRecord[]>(initialUploads);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setError(null);
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Only JPEG, PNG, WebP, or PDF files are allowed.");
      return;
    }
    if (file.size > MAX_SIZE) {
      setError("File must be smaller than 10MB.");
      return;
    }

    setIsUploading(true);
    try {
      const path = `${userId}/${uniqueFileName(file.name)}`;
      const supabase = createClient();
      const { error: uploadError } = await supabase.storage.from("uploads").upload(path, file, {
        contentType: file.type
      });
      if (uploadError) throw uploadError;

      const result = await recordUpload({
        bucket: "uploads",
        path,
        originalFilename: file.name,
        mimeType: file.type,
        sizeBytes: file.size
      });

      if (result.success) {
        setUploads((prev) => [
          {
            id: crypto.randomUUID(),
            bucket: "uploads",
            path,
            original_filename: file.name,
            mime_type: file.type,
            size_bytes: file.size,
            created_at: new Date().toISOString()
          },
          ...prev
        ]);
      }
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (upload: UploadRecord) => {
    setUploads((prev) => prev.filter((u) => u.id !== upload.id));
    await deleteUpload(upload.id, upload.bucket, upload.path);
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={isUploading}
        className="flex items-center gap-2 rounded-full border border-dashed border-ink-900/20 px-5 py-3 text-sm font-medium text-ink-900/70 hover:border-signal-500 hover:text-signal-500 dark:border-paper/20 dark:text-paper/70"
      >
        {isUploading ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />}
        {isUploading ? "Uploading..." : "Upload a file"}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={ALLOWED_TYPES.join(",")}
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}

      <div className="mt-6 divide-y divide-ink-900/10 rounded-2xl border border-ink-900/10 dark:divide-paper/10 dark:border-paper/10">
        {uploads.length === 0 && (
          <p className="p-6 text-sm text-ink-900/50 dark:text-paper/50">No files uploaded yet.</p>
        )}
        {uploads.map((upload) => (
          <div key={upload.id} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-900/5 dark:bg-paper/10">
                <FileIcon size={16} />
              </span>
              <div>
                <p className="text-sm font-medium">{upload.original_filename}</p>
                <p className="text-xs text-ink-900/45 dark:text-paper/45">
                  {formatBytes(upload.size_bytes)} · {new Date(upload.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleDelete(upload)}
              aria-label="Delete file"
              className="rounded-full p-2 text-red-500 hover:bg-red-500/10"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
