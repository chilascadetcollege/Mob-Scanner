import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "./AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans" dir="ltr">
      <AdminSidebar user={session.user} />
      <div className="flex-1 p-8 ml-64">
        {children}
      </div>
    </div>
  );
}
