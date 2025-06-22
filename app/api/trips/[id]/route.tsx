// app/api/trips/[id]/route.ts
import { supabase } from "@lib/supabase";
import { TripModel } from "../../../../types/trip";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

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

    const { data: trip, error } = await supabase
      .from("trips")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) throw error;

    if (!trip) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }

    const tripModel: TripModel = {
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
    };

    return NextResponse.json(tripModel);
  } catch (error) {
    console.error("Get Trip error:", error);
    return NextResponse.json(
      { error: "Failed to fetch Trip" },
      { status: 500 }
    );
  }
}

///
///
///
///
///
///
///
///
///

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { error: "Authorization required" },
        { status: 401 }
      );
    }

    const { error: authError } = await supabase.auth.getUser(token);

    if (authError) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 });
    }

    const { error } = await supabase.from("trips").delete().eq("id", id);

    if (error) throw error;

    return NextResponse.json(
      { message: "Trip deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete Trip error:", error);
    return NextResponse.json(
      { error: "Failed to delete trip" },
      { status: 500 }
    );
  }
}

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
///
///

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const updateData = await request.json();

    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { error: "Authorization required" },
        { status: 401 }
      );
    }

    const { error: authError } = await supabase.auth.getUser(token);

    if (authError) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 });
    }

    const { data: updatedTrip, error } = await supabase
      .from("trips")
      .update(updateData)
      .eq("id", id)
      .select("*")
      .maybeSingle();

    if (error) throw error;

    const tripModel: TripModel = {
      id: updatedTrip.id,
      destination: updatedTrip.destination,
      startDate: new Date(updatedTrip.startDate),
      endDate: new Date(updatedTrip.endDate),
      interests: updatedTrip.interests || [],
      adults: updatedTrip.adults || 0,
      children: updatedTrip.children || 0,
      budget: updatedTrip.budget || 0,
      createdAt: new Date(updatedTrip.createdAt),
      plan: updatedTrip.plan || {
        itinerary: [],
        packingList: [],
        localTips: [],
      },
    };

    return NextResponse.json(tripModel);
  } catch (error) {
    console.error("Update Trip error:", error);
    return NextResponse.json(
      { error: "Failed to update trip" },
      { status: 500 }
    );
  }
}
