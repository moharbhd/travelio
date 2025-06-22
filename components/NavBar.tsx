"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { redirect, useRouter } from "next/navigation";
import "../styles/globals.css";
import { useAuth } from "@context/AuthContext";
import CustomAvatar from "./custom/CustomAvatar";

export default function Navbar({ className = "" }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  return (
    <nav className="absolute top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-8">
        <div
          className={`flex justify-between items-center h-16 text-foreground ${className}`}
        >
          {/* Logo */}

          <Link href="/">
            <span className="text-2xl font-bold">Travelio</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-8">
            <Link href="/features">Features</Link>

            <Link href="/about">About</Link>

            <Link href="/contact-us">Contact us</Link>
          </div>

          {/* Buttons */}
          <div className="flex flex-row items-center  gap-3">
            {!user && !isLoading ? (
              <Button
                className="blur_button_style"
                onClick={() => {
                  router.push("/auth/login");
                }}
              >
                Login
              </Button>
            ) : (
              !isLoading && (
                <CustomAvatar
                  name={user?.profile?.name ?? "A"}
                  size="sm"
                  onTap={() => {
                    router.push("/profile");
                  }}
                />
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
