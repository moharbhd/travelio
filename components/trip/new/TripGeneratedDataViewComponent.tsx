import { useTrip } from "@/context/TripContext";
import TripLoadingComponent from "./TripLoadingComponent";
import { useState } from "react";
import { Button } from "@components/ui/button";

export const TripGeneratedDataViewComponent = () => {
  const { generatedPlan, isLoading, editDay } = useTrip();
  const [editingDay, setEditingDay] = useState<number | null>(null);

  const handleSaveDay = (dayNumber: number) => {
    setEditingDay(null);
  };

  if (isLoading) {
    return <TripLoadingComponent />;
  }

  if (!generatedPlan) return null;

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Daily Itinerary
        </h3>
        <div className="space-y-6">
          {generatedPlan.itinerary.map((day) => (
            <div
              key={day.day}
              className="border-l-2 border-teal-400 pl-4 relative"
            >
              <div className="absolute -left-2 top-0 w-4 h-4 bg-teal-600 rounded-full"></div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-md font-medium text-gray-800">
                  Day {day.day}
                </h4>
                {editingDay !== day.day ? (
                  <Button
                    onClick={() => setEditingDay(day.day)}
                    variant="outline"
                    className="text-sm"
                  >
                    Edit
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleSaveDay(day.day)}
                    variant="default"
                    className="text-sm"
                  >
                    Save
                  </Button>
                )}
              </div>

              {editingDay === day.day ? (
                <div className="space-y-3">
                  {(["morning", "afternoon", "evening"] as const).map(
                    (period) => (
                      <div key={period} className="bg-gray-50 p-3 rounded-lg">
                        <span className="font-medium text-gray-700 capitalize">
                          {period}:
                        </span>
                        <textarea
                          className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          value={day[period]}
                          onChange={(e) =>
                            editDay(day.day, period, e.target.value)
                          }
                          rows={3}
                        />
                      </div>
                    )
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {(["morning", "afternoon", "evening"] as const).map(
                    (period) => (
                      <div key={period} className="bg-gray-50 p-3 rounded-lg">
                        <span className="font-medium text-gray-700 capitalize">
                          {period}:
                        </span>
                        <p className="text-gray-600 mt-1 whitespace-pre-line">
                          {day[period]}
                        </p>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Packing List */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Packing List
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {generatedPlan.packingList.map((category, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-700 mb-2">
                {category.category}
              </h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {category.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Local Tips */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Local Tips</h3>
        <div className="space-y-3">
          {generatedPlan.localTips.map((tip, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border-l-4 border-primary"
            >
              <h4 className="font-medium text-teal-600">{tip.title}</h4>
              <p className="text-muted-foreground">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
