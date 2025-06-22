import { supabase } from "@lib/supabase";
import { TripModel } from "../../../../types/trip";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { error: "Authorization required" },
        { status: 401 }
      );
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 });
    }

    const { data: trips, error } = await supabase
      .from("trips")
      .select("*")
      .eq("user_id", user.id)
      .order("createdAt", { ascending: false });

    if (error) throw error;

    const tripModel: TripModel[] = trips.map((trip) => ({
      id: trip.id,
      destination: trip.destination,
      startDate: new Date(trip.startDate),
      endDate: new Date(trip.endDate),
      interests: trip.interests || [],
      adults: trip.adults || 0,
      children: trip.children || 0,
      budget: trip.budget || 0,
      createdAt: new Date(trip.createdAt),
      plan: trip.plan || {
        itinerary: [],
        packingList: [],
        localTips: [],
      },
    }));
    return NextResponse.json(tripModel);
  } catch (error) {
    console.error("Get trips error:", error);
    return NextResponse.json(
      { error: "Failed to fetch trips" },
      { status: 500 }
    );
  }
}
