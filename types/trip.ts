// types/trip.ts
export interface TripInput {
  destination: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  interests: string[];
  adults: number;
  children: number;
  budget: number;
}

export interface ItineraryDay {
  day: number;
  morning: string;
  afternoon: string;
  evening: string;
}

export interface PackingItem {
  category: string;
  items: string[];
}

export interface LocalTip {
  title: string;
  description: string;
}

export interface TripPlan {
  itinerary: ItineraryDay[];
  packingList: PackingItem[];
  localTips: LocalTip[];
}

export interface TripModel extends TripInput {
  id: string;
  destination: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  interests: string[];
  adults: number;
  children: number;
  budget: number;
  plan: TripPlan;
  createdAt: Date | undefined;
}
