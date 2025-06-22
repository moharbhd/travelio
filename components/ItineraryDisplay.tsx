"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "./ui/label";
import { saveTrip } from "@lib/trips/actions";

interface ItineraryDay {
  date: string;
  morning: string;
  afternoon: string;
  evening: string;
}

interface ItineraryData {
  itinerary: ItineraryDay[];
  packingList: string[];
  localTips: string[];
}

export default function ItineraryDisplay({
  initialData,
}: {
  initialData: ItineraryData;
}) {
  const [editableItinerary, setEditableItinerary] = useState(initialData);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (dayIndex: number, period: string, value: string) => {
    const updated = { ...editableItinerary };
    updated.itinerary[dayIndex] = {
      ...updated.itinerary[dayIndex],
      [period]: value,
    };
    setEditableItinerary(updated);
  };

  const handlePackingListChange = (index: number, value: string) => {
    const updated = { ...editableItinerary };
    updated.packingList[index] = value;
    setEditableItinerary(updated);
  };

  const handleTipChange = (index: number, value: string) => {
    const updated = { ...editableItinerary };
    updated.localTips[index] = value;
    setEditableItinerary(updated);
  };

  const handleAddPackingItem = () => {
    setEditableItinerary((prev) => ({
      ...prev,
      packingList: [...prev.packingList, ""],
    }));
  };

  const handleAddTip = () => {
    setEditableItinerary((prev) => ({
      ...prev,
      localTips: [...prev.localTips, ""],
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveTrip(editableItinerary);
      alert("Trip saved successfully!");
    } catch (error) {
      console.error("Error saving trip:", error);
      alert("Failed to save trip");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold">Your Itinerary</h2>
        <p className="text-gray-600">Review and customize your trip details</p>
      </div>

      <div className="space-y-6">
        {editableItinerary.itinerary.map((day, dayIndex) => (
          <div
            key={dayIndex}
            className="border rounded-lg p-6 bg-white shadow-sm"
          >
            <h3 className="text-xl font-bold mb-4">{day.date}</h3>

            <div className="space-y-4">
              <div>
                <Label>Morning</Label>
                <textarea
                  value={day.morning}
                  onChange={(e) =>
                    handleChange(dayIndex, "morning", e.target.value)
                  }
                  className="w-full p-3 border rounded-md min-h-[100px] mt-1"
                />
              </div>

              <div>
                <Label>Afternoon</Label>
                <textarea
                  value={day.afternoon}
                  onChange={(e) =>
                    handleChange(dayIndex, "afternoon", e.target.value)
                  }
                  className="w-full p-3 border rounded-md min-h-[100px] mt-1"
                />
              </div>

              <div>
                <Label>Evening</Label>
                <textarea
                  value={day.evening}
                  onChange={(e) =>
                    handleChange(dayIndex, "evening", e.target.value)
                  }
                  className="w-full p-3 border rounded-md min-h-[100px] mt-1"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border rounded-lg p-6 bg-white shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Packing List</h3>
            <Button size="sm" onClick={handleAddPackingItem}>
              Add Item
            </Button>
          </div>

          <div className="space-y-3">
            {editableItinerary.packingList.map((item, index) => (
              <div key={index} className="flex items-start space-x-2">
                <input type="checkbox" className="mt-1.5" />
                <input
                  type="text"
                  value={item}
                  onChange={(e) =>
                    handlePackingListChange(index, e.target.value)
                  }
                  className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="border rounded-lg p-6 bg-white shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Local Tips</h3>
            <Button size="sm" onClick={handleAddTip}>
              Add Tip
            </Button>
          </div>

          <div className="space-y-3">
            {editableItinerary.localTips.map((tip, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="bg-blue-100 rounded-full p-2 mt-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-blue-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <textarea
                  value={tip}
                  onChange={(e) => handleTipChange(index, e.target.value)}
                  className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 resize-none min-h-[60px]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Trip"}
        </Button>
      </div>
    </div>
  );
}
