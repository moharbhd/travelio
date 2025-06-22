"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useTrip } from "@context/TripContext";
export function TripInterestsStepComponent() {
  const { tripInput, updateTripInput } = useTrip();
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    tripInput.interests || []
  );

  useEffect(() => {
    if (tripInput.interests) {
      setSelectedInterests(tripInput.interests);
    }
  }, [tripInput.interests]);

  const allInterests = [
    { name: "Traditional Sights", icon: "⛩️" },
    { name: "Food Spots", icon: "🍜" },
    { name: "Unique Experiences", icon: "🎪" },
    { name: "Modern Architecture", icon: "🏙️" },
    { name: "Historical Sites", icon: "🏛️" },
    { name: "Local Markets", icon: "🛍️" },
    { name: "Nightlife", icon: "🌃" },
    { name: "Parks & Gardens", icon: "🌳" },
  ];

  const toggleInterest = (interest: string) => {
    const newInterests = selectedInterests.includes(interest)
      ? selectedInterests.filter((item) => item !== interest)
      : [...selectedInterests, interest];

    setSelectedInterests(newInterests);
    updateTripInput({
      interests: newInterests,
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-center">
        What interests you in {tripInput.destination}
      </h1>

      <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
        {allInterests.map((interest) => (
          <Card
            key={interest.name}
            onClick={() => toggleInterest(interest.name)}
            className={`px-4 py-2 shadow-none cursor-pointer transition-colors ${
              selectedInterests.includes(interest.name)
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            <span className="text-sm font-medium">
              {interest.name} {interest.icon}
            </span>
          </Card>
        ))}
      </div>
    </div>
  );
}
