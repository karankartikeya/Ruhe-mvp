import { ReactNode } from "react";
import { getLoggedInUser } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";

interface AuthLayoutProps {
  children: ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const user = await getLoggedInUser();

  // Redirect to login if no user session
  if (!user) {
    redirect("/login");
  }

  // Render the protected content if authenticated
  return <>{children}</>;
}
