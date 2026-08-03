import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?redirectTo=/admin");

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("roles(name)")
    .eq("id", user.id)
    .single();

  const roleName = (profile as unknown as { roles: { name: string } | null } | null)?.roles?.name;

  // Middleware already blocks non-admins from /admin, but Server Components
  // should never rely on middleware alone for authorization.
  if (roleName !== "admin") redirect("/dashboard");

  return (
    <div className="container-max flex flex-col gap-8 px-6 py-10 md:flex-row md:px-10">
      <AdminSidebar />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
