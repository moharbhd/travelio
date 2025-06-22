"use client";

import { TripCard } from "@components/trip/TripCard";

export default function TravelPlanner() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full mx-auto">
        <TripCard params={{ isEdit: false, tripModel: null }} />
      </div>
    </div>
  );
}
