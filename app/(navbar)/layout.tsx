import "@styles/globals.css";
import Navbar from "@components/NavBar";

export default async function NavBarGroupPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
