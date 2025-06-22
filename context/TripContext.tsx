"use client";
import { createContext, useContext, useState, useCallback } from "react";
import { TripInput, TripModel, TripPlan } from "@/types/trip";
import { useAuth } from "./AuthContext";
import { useRouter } from "@node_modules/next/navigation";

interface TripContextType {
  isLoading: boolean;
  isSaveLoading: boolean;
  isDeleteLoading: boolean;
  currentStep: number;
  tripInput: TripInput;
  generatedPlan: TripPlan | null;
  updateTripInput: (data: Partial<TripInput>) => void;
  nextStep: () => void;
  prevStep: () => void;
  generatePlan: () => Promise<void>;
  saveTrip: () => Promise<void>;
  getTrip: (id: string) => Promise<TripModel | null>;
  deleteTrip: (id: string) => Promise<boolean>;
  updateTrip: (id: string, updateData: Partial<TripModel>) => Promise<boolean>;
  loadTrip: (trip: TripModel) => void;
  getMyTrips: () => Promise<TripModel[]>;
  resetTrip: () => void;

  ///
  clearError: () => void;
  clearSuccess: () => void;

  error: string | null;
  successMessage: string | null;

  ///
  editDay: (
    dayNumber: number,
    period: "morning" | "afternoon" | "evening",
    newValue: string
  ) => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  ///
  const [tripInput, setTripInput] = useState<TripInput>({
    destination: "",
    startDate: undefined,
    endDate: undefined,
    interests: [],
    adults: 0,
    children: 0,
    budget: 100,
  });

  ///
  const [generatedPlan, setGeneratedPlan] = useState<TripPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const { user } = useAuth();

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const updateTripInput = useCallback((data: Partial<TripInput>) => {
    setTripInput((prev) => ({ ...prev, ...data }));
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => prev + 1);
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  }, []);

  const clearError = useCallback(() => setError(null), []);
  const clearSuccess = useCallback(() => setSuccessMessage(null), []);

  ///
  ///
  ///
  ///
  ///
  ///
  ///

  const getMyTrips = useCallback(async () => {
    try {
      const session = user?.session;
      if (!session) throw new Error("No active session");

      const response = await fetch("/api/trips/my-trips", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to get Trips");

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error getting Trips", error);
    }

    return [];
  }, []);

  ///
  ///
  ///
  ///
  ///
  ///
  ///

  const generate = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/trips/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tripInput),
      });

      if (!response.ok) throw response.status;

      const data = await response.json();
      setGeneratedPlan(data);
    } catch (error) {
      console.error("Error generating plan:", error);
    } finally {
      setIsLoading(false);
    }
  }, [tripInput, nextStep]);

  ///
  ///
  ///
  ///
  ///
  ///
  ///

  const saveTrip = useCallback(async () => {
    if (!generatedPlan) return;

    setIsSaveLoading(true);
    try {
      const session = user?.session;
      if (!session) throw new Error("No active session");

      const response = await fetch("/api/trips/save-trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          ...tripInput,
          plan: generatedPlan,
        }),
      });

      if (!response.ok) throw new Error("Failed to save trip");

      await response.json();

      router.push("/profile");
    } catch (error) {
      console.error("Error saving trip:", error);
    } finally {
      setIsSaveLoading(false);
    }
  }, [tripInput, generatedPlan, nextStep]);

  ///
  ///
  ///
  ///
  ///
  ///
  ///

  const deleteTrip = useCallback(
    async (id: string): Promise<boolean> => {
      setIsDeleteLoading(true);
      setError(null);
      try {
        const session = user?.session;
        if (!session) {
          setError("Authentication required");
          return false;
        }

        const response = await fetch(`/api/trips/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || "Failed to delete trip");
        }

        setSuccessMessage("Trip deleted successfully");
        return true;
      } catch (error) {
        console.error("Error deleting trip:", error);
        setError(
          error instanceof Error ? error.message : "Failed to delete trip"
        );
        return false;
      } finally {
        setIsDeleteLoading(false);
      }
    },
    [user?.session]
  );

  ///
  ///
  ///
  ///
  ///
  ///
  ///

  const updateTrip = useCallback(
    async (id: string, updateData: Partial<TripModel>): Promise<boolean> => {
      setIsSaveLoading(true);
      setError(null);
      try {
        const session = user?.session;
        if (!session) {
          setError("Authentication required");
          return false;
        }

        const response = await fetch(`/api/trips/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify(updateData),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || "Failed to update trip");
        }

        setSuccessMessage("Trip updated successfully");

        return true;
      } catch (error) {
        console.error("Error updating trip:", error);
        setError(
          error instanceof Error ? error.message : "Failed to update trip"
        );
        return false;
      } finally {
        setIsSaveLoading(false);
      }
    },
    [user?.session]
  );

  ///
  ///
  ///
  ///
  ///
  ///
  ///
  ///
  ///
  ///
  const getTrip = useCallback(
    async (id: string): Promise<TripModel | null> => {
      setIsLoading(true);
      setError(null);
      try {
        const session = user?.session;
        if (!session) {
          setError("Authentication required");
          return null;
        }

        const response = await fetch(`/api/trips/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.access_token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to Get trip");
        }

        const data = await response.json();

        return data;
      } catch (error) {
        console.error("Error Get trip:", error);
        setError(error instanceof Error ? error.message : "Failed to Get trip");
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [user?.session]
  );
  ///
  ///
  ///
  ///
  ///
  ///
  ///
  ///
  ///
  ///

  const editDay = useCallback(
    (
      dayNumber: number,
      period: "morning" | "afternoon" | "evening",
      newValue: string
    ) => {
      setGeneratedPlan((prev) => {
        if (!prev) return null;
        const updatedItinerary = prev.itinerary.map((day) =>
          day.day === dayNumber ? { ...day, [period]: newValue } : day
        );
        return { ...prev, itinerary: updatedItinerary };
      });
    },
    []
  );

  ///
  ///
  ///
  ///
  ///
  ///
  ///

  const loadTrip = useCallback((trip: TripModel) => {
    setTripInput({
      destination: trip.destination,
      startDate: trip.startDate,
      endDate: trip.endDate,
      interests: trip.interests,
      budget: trip.budget,
      adults: trip.adults,
      children: trip.children,
    });
    setGeneratedPlan(trip.plan);
    setCurrentStep(5);
  }, []);

  ///
  ///
  ///
  ///
  ///
  ///
  ///

  const resetTrip = useCallback(() => {
    setTripInput({
      destination: "",
      startDate: undefined,
      endDate: undefined,
      interests: [],
      adults: 0,
      children: 0,
      budget: 100,
    });
    setGeneratedPlan(null);
    setCurrentStep(0);
  }, []);

  ///
  ///
  ///
  ///
  ///
  ///
  ///

  return (
    <TripContext.Provider
      value={{
        isLoading,
        isSaveLoading,
        isDeleteLoading,
        currentStep,
        tripInput,
        generatedPlan,
        getMyTrips,
        updateTripInput,
        nextStep,
        prevStep,
        generatePlan: generate,
        saveTrip,
        getTrip,
        deleteTrip,
        updateTrip,
        loadTrip,
        resetTrip,
        ///
        error,
        successMessage,
        clearError,
        clearSuccess,
        ///
        editDay,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error("useTrip must be used within a TripProvider");
  }
  return context;
};
