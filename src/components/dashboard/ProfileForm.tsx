"use client";

import { useState, useTransition } from "react";
import { updateProfile, type ProfileFormInput } from "@/app/actions/profile";
import { ImageUploader } from "@/components/uploads/ImageUploader";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

export function ProfileForm({
  userId,
  initialValues
}: {
  userId: string;
  initialValues: ProfileFormInput;
}) {
  const [values, setValues] = useState<ProfileFormInput>(initialValues);
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");

  const set = <K extends keyof ProfileFormInput>(key: K, value: ProfileFormInput[K]) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const result = await updateProfile(values);
      setStatus(result.success ? "saved" : "error");
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-6">
      <ImageUploader
        bucket="profiles"
        folder={userId}
        label="Profile photo"
        initialUrl={values.avatarUrl}
        onUploaded={(url) => set("avatarUrl", url)}
      />

      <FormField
        id="fullName"
        label="Full name"
        value={values.fullName}
        onChange={(e) => set("fullName", e.target.value)}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          id="phone"
          label="Phone"
          value={values.phone}
          onChange={(e) => set("phone", e.target.value)}
        />
        <FormField
          id="website"
          label="Website"
          type="url"
          value={values.website}
          onChange={(e) => set("website", e.target.value)}
        />
      </div>

      <FormField
        id="address"
        label="Address"
        value={values.address}
        onChange={(e) => set("address", e.target.value)}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          id="githubUrl"
          label="GitHub"
          type="url"
          value={values.githubUrl}
          onChange={(e) => set("githubUrl", e.target.value)}
        />
        <FormField
          id="linkedinUrl"
          label="LinkedIn"
          type="url"
          value={values.linkedinUrl}
          onChange={(e) => set("linkedinUrl", e.target.value)}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">Bio</label>
        <textarea
          rows={4}
          value={values.bio}
          onChange={(e) => set("bio", e.target.value)}
          className="w-full rounded-lg border border-ink-900/15 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-signal-500 dark:border-paper/20"
        />
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save changes"}
        </Button>
        {status === "saved" && <span className="text-sm text-success">Saved</span>}
        {status === "error" && <span className="text-sm text-red-500">Save failed</span>}
      </div>
    </form>
  );
}
