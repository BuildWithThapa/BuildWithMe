import { createClient } from "@/lib/supabase/server";
import { ProfileForm } from "@/components/dashboard/ProfileForm";
import type { UserProfile } from "@/types";

export default async function DashboardProfilePage() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", user!.id)
    .single();

  const p = profile as UserProfile | null;
  const socialLinks = (p?.social_links ?? {}) as Record<string, string>;

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold tracking-tight">Profile</h1>
      <p className="mt-1 text-sm text-ink-900/60 dark:text-paper/60">
        This information can be reused across your CVs.
      </p>

      <div className="mt-8">
        <ProfileForm
          userId={user!.id}
          initialValues={{
            fullName: p?.full_name ?? "",
            phone: p?.phone ?? "",
            website: p?.website ?? "",
            address: p?.address ?? "",
            bio: p?.bio ?? "",
            avatarUrl: p?.avatar_url ?? "",
            githubUrl: socialLinks.github ?? "",
            linkedinUrl: socialLinks.linkedin ?? ""
          }}
        />
      </div>
    </div>
  );
}
