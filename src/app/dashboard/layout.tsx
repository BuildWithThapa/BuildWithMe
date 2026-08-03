import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  // Belt-and-suspenders: middleware already protects this route, but
  // Server Components should never trust that alone.
  if (!user) {
    redirect("/login?redirectTo=/dashboard");
  }

  return (
    <div className="container-max flex flex-col gap-8 px-6 py-10 md:flex-row md:px-10">
      <DashboardSidebar />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
