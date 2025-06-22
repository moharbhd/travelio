"use client";

import "@styles/globals.css";
import Navbar from "@components/NavBar";
import CheckAuthRoute from "@components/CheckProtectedRoute";
import FooterComponent from "@components/FooterComponent";

export default function ProfilePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CheckAuthRoute>
        <Navbar />
        {children}
        <FooterComponent />
      </CheckAuthRoute>
    </>
  );
}
