"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import CustomLoadingPage from "./custom/CustomLoading";

export default function CheckAuthRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user?.session) {
      router.push("/auth/login");
    }
  }, [isLoading, user?.session]);

  if (isLoading || !user?.session) {
    return <CustomLoadingPage />;
  }

  return <>{children}</>;
}
