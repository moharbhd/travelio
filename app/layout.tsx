import "@styles/globals.css";
import type { Metadata } from "next";
import { AuthProvider } from "@context/AuthContext";

export const metadata: Metadata = {
  title: "Travel Planner",
  description: "AI-powered travel itinerary generator",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
