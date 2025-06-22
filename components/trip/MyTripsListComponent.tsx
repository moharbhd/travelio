"use client";

import { useAuth } from "@context/AuthContext";
import { formatDate } from "@utils/dates";
import { Button } from "@components/ui/button";
import { useRouter } from "@node_modules/next/navigation";
import { useEffect, useState } from "react";
import { TripModel } from "../../types/trip";
import { useTrip } from "@context/TripContext";
import { format } from "date-fns";
import { CircularProgress } from "@mui/material";
import { FaEdit, FaEye, FaTrash } from "@node_modules/react-icons/fa";
import ItinerariesCard from "./ItinerariesCard";

export default function MyTripListComponent() {
  const { getMyTrips, isDeleteLoading } = useTrip();
  const router = useRouter();
  const { user } = useAuth();

  const [trips, setTrips] = useState<TripModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getTrips = async () => {
      try {
        const data = await getMyTrips();
        setTrips(data);
      } catch (error) {
        console.log("Error generating plan:", error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    getTrips();
  }, [isDeleteLoading]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">My Itineraries</h2>
        <Button
          onClick={() => {
            router.push("/trips/new");
          }}
        >
          New Trip
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <CircularProgress color="inherit" />
          <p className="mt-1 text-gray-500">Loading Itinerary...</p>
        </div>
      ) : trips.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No trips yet
          </h3>
          <p className="mt-1 text-gray-500">
            Start by creating your first travel itinerary
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trips.map((trip) => (
            <ItinerariesCard key={trip.id} params={{ tripModel: trip }} />
          ))}
        </div>
      )}
    </div>
  );
}
