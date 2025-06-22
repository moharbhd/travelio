"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTrip } from "@context/TripContext";

export function TripSelectPeopleStepComponent() {
  const { tripInput, updateTripInput } = useTrip();

  const updateCount = (type: "adults" | "children", value: number) => {
    const newValue = Math.max(0, value);
    updateTripInput({ [type]: newValue });
  };

  const increment = (type: "adults" | "children") => {
    updateCount(
      type,
      (type === "adults" ? tripInput.adults : tripInput.children) + 1
    );
  };

  const decrement = (type: "adults" | "children") => {
    updateCount(
      type,
      (type === "adults" ? tripInput.adults : tripInput.children) - 1
    );
  };

  return (
    <div className="space-y-6 mx-6">
      <h2 className="text-lg font-medium">Who is traveling?</h2>

      <div className="flex flex-col gap-4">
        {/* Adults Counter */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Adults</p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => decrement("adults")}
              disabled={tripInput.adults <= 0}
              className="h-8 w-8 rounded-full"
            >
              -
            </Button>
            <span className="w-6 text-center">{tripInput.adults}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => increment("adults")}
              className="h-8 w-8 rounded-full"
            >
              +
            </Button>
          </div>
        </div>

        {/* Children Counter */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Children</p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => decrement("children")}
              disabled={tripInput.children <= 0}
              className="h-8 w-8 rounded-full"
            >
              -
            </Button>
            <span className="w-6 text-center">{tripInput.children}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => increment("children")}
              className="h-8 w-8 rounded-full"
            >
              +
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
