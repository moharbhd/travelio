"use client";

import { Button } from "@components/ui/button";
import { useRouter } from "@node_modules/next/navigation";
import { useState } from "react";
import { TripModel } from "../../types/trip";
import { useTrip } from "@context/TripContext";
import { format } from "date-fns";
import { FaEye, FaTrash } from "@node_modules/react-icons/fa";

interface ItinerariesCardProps {
  params: {
    tripModel: TripModel;
  };
}

export default function ItinerariesCard({ params }: ItinerariesCardProps) {
  const { deleteTrip } = useTrip();
  const router = useRouter();

  const trip = params.tripModel;

  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const handleDelete = async (id: string) => {
    setIsDeleteLoading(true);
    await deleteTrip(id)
      .then((e) => {
        if (e) {
          router.refresh();
        }
      })
      .finally(() => {
        setIsDeleteLoading(false);
      });
  };

  return (
    <div className="relative border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 bg-white group overflow-hidden">
      {/* Card Content */}
      <div className="flex flex-col h-full">
        {/* Destination Header */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-1">
            {trip.destination}
          </h3>
          <div className="flex items-center text-sm text-gray-500 space-x-2">
            <span className="font-medium text-primary">
              ${trip.budget.toLocaleString()}
            </span>
            <span>•</span>
            <span>
              {format(trip.startDate?.toString() ?? "", "MMM d")} -{" "}
              {format(trip.endDate?.toString() ?? "", "MMM d, yyyy")}
            </span>
          </div>
          <div className="text-sm text-gray-500 mt-1">
            {trip.adults} {trip.adults === 1 ? "adult" : "adults"}
            {trip.children > 0 &&
              `, ${trip.children} ${
                trip.children === 1 ? "child" : "children"
              }`}
          </div>
        </div>

        {/* Interests Tags */}
        {trip.interests.length > 0 && (
          <div className="mb-5">
            <div className="flex flex-wrap gap-2">
              {trip.interests.map((interest, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons - positioned at bottom */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              size="sm"
              className="text-foreground"
              onClick={() => {
                router.push(`trips/${trip.id}`);
              }}
            >
              <FaEye className="mr-2 h-4 w-4" />
              View
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-500"
              disabled={isDeleteLoading}
              onClick={async () => {
                await handleDelete(trip.id);
              }}
            >
              <FaTrash className="mr-2 h-4 w-4" />
              {isDeleteLoading ? "Deleting" : "Delete"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
