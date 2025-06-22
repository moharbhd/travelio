"use client";

import { useTrip } from "@/context/TripContext";
import { Button } from "@components/ui/button";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { Card, CardContent } from "@components/ui/card";
import { useSearchParams } from "@node_modules/next/navigation";
import { useEffect } from "react";
import { format } from "date-fns";
import TripBudgetStepComponent from "./new/TripBudgetStepComponent";
import TripDestinationStepComponent from "./new/TripDestinationStepComponent";
import { TripDatePickerStepComponent } from "./new/TripDatePickerStepComponent";
import { TripSelectPeopleStepComponent } from "./new/TripSelectPeopleStepComponent";
import { TripInterestsStepComponent } from "./new/TripIntrestsStepComponent";
import { TripGeneratedDataViewComponent } from "./new/TripGeneratedDataViewComponent";
import { TripModel } from "../../types/trip";
import { useRouter } from "@node_modules/next/navigation";

interface TripCardProps {
  params: {
    tripModel: TripModel | null;
    isEdit: boolean;
  };
}

export const TripCard = ({ params }: TripCardProps) => {
  const {
    currentStep,
    tripInput,
    updateTripInput,
    isLoading,
    isSaveLoading,
    resetTrip,
    nextStep,
    prevStep,
    saveTrip,
    updateTrip,
    generatePlan,
    loadTrip,
    generatedPlan,
  } = useTrip();

  const router = useRouter();

  const searchParams = useSearchParams();
  const destination = searchParams.get("destination") || undefined;

  useEffect(() => {
    if (!!destination) {
      updateTripInput({
        destination,
      });
    }

    if (params.tripModel !== null) {
      loadTrip(params.tripModel);
    }
  }, []);

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 0: // Destination
        return !!tripInput.destination?.trim();

      case 1: // Budget
        return tripInput.budget >= 100;

      case 2: // Dates
        return !!tripInput.startDate && !!tripInput.endDate;

      case 3: // People
        return (tripInput.adults || 0) + (tripInput.children || 0) > 0;

      case 4: // Interests
        return (tripInput.interests?.length || 0) > 1;

      default:
        return true;
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-15 bg-white rounded-3xl shadow-lg overflow-hidden">
      <div className="flex flex-row items-center justify-between">
        {currentStep > 0 && currentStep < 6 ? (
          <Button
            className="w-10 h-10 mt-3 mx-3 rounded-full"
            onClick={prevStep}
            disabled={isLoading || isSaveLoading}
            variant="outline"
          >
            <FaArrowLeft className="text-gray-700 text-lg" />
          </Button>
        ) : params.isEdit ? (
          <></>
        ) : (
          <div className="w-10 h-10"></div>
        )}
        {!params.isEdit && currentStep >= 0 && currentStep < 4 && (
          <Button
            className="w-10 h-10 mt-3 mx-3 rounded-full"
            onClick={resetTrip}
            disabled={isLoading || isSaveLoading}
            variant="outline"
          >
            <FaTrash className="text-red-500" />
          </Button>
        )}
      </div>

      {/* Card Header */}
      <Card className="rounded-3xl">
        <CardContent className="py-0 p px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Location */}
            <div className="flex flex-col space-y-1 p-3">
              <span className="text-xs font-medium text-gray-500">
                Location
              </span>
              <span className="font-medium text-foreground truncate">
                {tripInput.destination || "Not specified"}
              </span>
            </div>

            {/* Budget */}
            <div className="flex flex-col space-y-1 p-3">
              <span className="text-xs font-medium text-gray-500">Budget</span>
              <span className="font-medium text-gray-900">
                {tripInput.budget ? `$${tripInput.budget}` : "Not set"}
              </span>
            </div>

            {/* Date */}
            <div className="flex flex-col space-y-1 p-3">
              <span className="text-xs font-medium text-gray-500">Dates</span>
              {tripInput.startDate && tripInput.endDate ? (
                <div className="flex flex-col font-medium text-gray-900">
                  <span>{format(tripInput.startDate, "d MMM, yyyy")}</span>
                  <span>{format(tripInput.endDate, "d MMM, yyyy")}</span>
                </div>
              ) : (
                <span className="font-medium text-gray-900">Not set</span>
              )}
            </div>

            {/* Guests */}
            <div className="flex flex-col space-y-1 p-3">
              <span className="text-xs font-medium text-gray-500">Guests</span>
              <span className="font-medium text-gray-900">
                {tripInput.adults || tripInput.children
                  ? `${tripInput.adults || 0} adults, ${
                      tripInput.children || 0
                    } kids`
                  : "Not set"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card Content */}
      <div className="px-6 py-30">
        {currentStep === 0 && <TripDestinationStepComponent />}
        {currentStep === 1 && <TripBudgetStepComponent />}
        {currentStep === 2 && <TripDatePickerStepComponent />}
        {currentStep === 3 && <TripSelectPeopleStepComponent />}
        {currentStep === 4 && <TripInterestsStepComponent />}
        {currentStep === 5 && <TripGeneratedDataViewComponent />}
      </div>

      {/* Card Footer */}
      <div className="px-6 py-5">
        <div className="flex flex-wrap-reverse items-center justify-center gap-3 mx-auto">
          {currentStep < 4 || (currentStep === 4 && generatedPlan) ? (
            <Button
              onClick={nextStep}
              disabled={!validateStep(currentStep)}
              className="rounded-full px-20"
              size="lg"
            >
              Continue
            </Button>
          ) : (
            currentStep === 4 &&
            !generatedPlan && (
              <Button
                onClick={() => {
                  generatePlan();
                  nextStep();
                }}
                className="rounded-full px-15"
                disabled={!validateStep(currentStep) || isLoading}
                size="lg"
              >
                {isLoading ? "Generating..." : "Generate Itinerary"}
              </Button>
            )
          )}

          {generatedPlan && !isLoading && currentStep === 5 && (
            <div className="flex flex-row justify-center items-center gap-3">
              <Button
                onClick={generatePlan}
                className="rounded-full px-15"
                disabled={isLoading || isSaveLoading}
                size="lg"
                variant="outline"
              >
                {isLoading ? "Regenerating" : "Regenerate"}
              </Button>

              <Button
                onClick={async () => {
                  if (params.isEdit && params.tripModel != null) {
                    await updateTrip(params.tripModel?.id, {
                      ...tripInput,
                      plan: generatedPlan,
                    }).then((e) => {
                      if (e) {
                        router.push("/profile");
                      }
                    });
                  } else {
                    await saveTrip();
                  }
                }}
                disabled={isLoading || isSaveLoading}
                className="rounded-full px-15"
                size="lg"
              >
                {isSaveLoading ? "Saving Trip" : "Save Trip"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
