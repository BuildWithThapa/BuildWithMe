import { createClient } from "@/lib/supabase/server";

export async function requireAdmin() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("roles(name)")
    .eq("id", user.id)
    .single();

  const roleName = (profile as unknown as { roles: { name: string } | null } | null)?.roles?.name;
  if (roleName !== "admin") throw new Error("Not authorized");

  return { supabase, userId: user.id };
}

export async function requireUser() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  return { supabase, userId: user.id };
}
