import { createClient } from "@/lib/supabase/server";
import { SettingsFormCard } from "@/components/admin/SettingsFormCard";

interface SettingRow {
  key: string;
  value: Record<string, string>;
}

export default async function AdminSettingsPage() {
  const supabase = createClient();
  const { data: settings } = await supabase.from("settings").select("key, value");

  const byKey = new Map((settings as SettingRow[] | null)?.map((s) => [s.key, s.value]) ?? []);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold tracking-tight">Settings</h1>
      <p className="mt-1 text-sm text-ink-900/60 dark:text-paper/60">
        Site-wide configuration used across the public site.
      </p>

      <div className="mt-8 space-y-6">
        <SettingsFormCard
          settingsKey="site"
          title="Site"
          description="Basic identity shown throughout the site."
          fields={[
            { key: "name", label: "Site name" },
            { key: "tagline", label: "Tagline" }
          ]}
          initialValue={byKey.get("site") ?? { name: "BuildWithThapa", tagline: "" }}
        />

        <SettingsFormCard
          settingsKey="seo"
          title="SEO defaults"
          description="Fallback metadata for pages without their own SEO fields."
          fields={[
            { key: "defaultTitle", label: "Default title" },
            { key: "defaultDescription", label: "Default description" }
          ]}
          initialValue={byKey.get("seo") ?? { defaultTitle: "", defaultDescription: "" }}
        />

        <SettingsFormCard
          settingsKey="social_links"
          title="Social links"
          description="Shown in the footer and structured data."
          fields={[
            { key: "github", label: "GitHub URL" },
            { key: "linkedin", label: "LinkedIn URL" },
            { key: "twitter", label: "Twitter / X URL" }
          ]}
          initialValue={byKey.get("social_links") ?? {}}
        />

        <SettingsFormCard
          settingsKey="email"
          title="Email"
          description="Where contact-form notifications are sent (SMTP credentials stay in environment variables, never here)."
          fields={[{ key: "notificationRecipient", label: "Notification recipient" }]}
          initialValue={byKey.get("email") ?? {}}
        />
      </div>
    </div>
  );
}
