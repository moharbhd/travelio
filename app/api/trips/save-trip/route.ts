import { supabase } from "@lib/supabase";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const {
      destination,
      startDate,
      endDate,
      interests,
      budget,
      adults,
      children,
      plan,
    } = await request.json();

    // Simple validation
    if (!destination || !startDate || !endDate) {
      return NextResponse.json(
        { error: "Missing required trip details" },
        { status: 400 }
      );
    }

    // Get user from auth token
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

    // Simplified database insert
    const { data, error } = await supabase
      .from("trips")
      .insert({
        user_id: user.id,
        destination,
        startDate: startDate,
        endDate: endDate,
        adults,
        children,
        interests,
        budget,
        plan,
      })

      .select("*")
      .maybeSingle();

    if (error) throw error;

    return NextResponse.json({
      id: data.id,
      destination,
      startDate: data.startDate,
      endDate: data.endDate,
    });
  } catch (error) {
    console.error("Save trip error:", error);
    return NextResponse.json({ error: "Failed to save trip" }, { status: 500 });
  }
}
