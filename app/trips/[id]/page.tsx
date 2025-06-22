"use client"; // Mark as client component

import { TripCard } from "@components/trip/TripCard";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTrip } from "@context/TripContext";
import { TripModel } from "../../../types/trip";

export default function SingleTripDetailViewComponent() {
  const params = useParams();
  const id = params.id as string;

  const { getTrip } = useTrip();
  const [trip, setTrip] = useState<TripModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        setIsLoading(true);
        const tripData = await getTrip(id);
        setTrip(tripData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load trip");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchTrip();
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen font-medium text-xl">
        <p>Loading trip details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 font-medium">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="flex justify-center items-center h-screen font-medium text-xl">
        <p>Trip not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full mx-auto">
        <TripCard params={{ tripModel: trip, isEdit: true }} />;
      </div>
    </div>
  );
}
