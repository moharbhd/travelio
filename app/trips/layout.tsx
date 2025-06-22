import "@styles/globals.css";
import Navbar from "@components/NavBar";
import CheckAuthRoute from "@components/CheckProtectedRoute";
import { TripProvider } from "@context/TripContext";

export default async function TripsPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CheckAuthRoute>
        <TripProvider>
          <Navbar />
          {children}
        </TripProvider>
      </CheckAuthRoute>
      {/* <FooterComponent /> */}
    </>
  );
}
