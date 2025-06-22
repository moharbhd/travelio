"use client";

import { useAuth } from "@context/AuthContext";
import CustomAvatar from "@components/custom/CustomAvatar";
import { Button } from "@components/ui/button";
import MyTripListComponent from "@components/trip/MyTripsListComponent";
import { TripProvider } from "@context/TripContext";
import { useTranslation } from "react-i18next";

export default function ProfilePage() {
  const { user, logout, isLoading } = useAuth();

  return (
    <div className="min-h-screen mt-20 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <CustomAvatar
              name={user?.profile?.name || "A"}
              size="custom"
              className="w-30 h-30 text-3xl"
            />

            <div className="text-center sm:text-left">
              <h1 className="text-xl font-bold text-gray-900">
                {user?.profile?.name || "Anonymous"}
              </h1>
              <p className="text-gray-600 mt-1">{user?.session?.user.email}</p>

              <div className="flex felx-row items-center justify-center sm:justify-start gap-2">
                <Button
                  disabled={isLoading}
                  onClick={logout}
                  className="mt-3 text-red-500 hover:text-red-500"
                  variant="outline"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Trips Section */}
        <TripProvider>
          <MyTripListComponent />
        </TripProvider>
      </div>
    </div>
  );
}
