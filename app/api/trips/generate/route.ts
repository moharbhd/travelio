import { Mistral } from "@mistralai/mistralai";
import { NextResponse } from "next/server";
import { TripInput } from "@/types/trip";

const apiKey = process.env.MISTRAL_API_KEY || "aa";

const client = new Mistral({ apiKey: apiKey });

export async function POST(request: Request) {
  try {
    const tripInput: TripInput = await request.json();

    if (!tripInput.destination || !tripInput.startDate || !tripInput.endDate) {
      return NextResponse.json(
        { error: "Missing required fields (destination, dates)" },
        { status: 400 }
      );
    }

    const prompt = `
    Create a detailed travel itinerary in JSON format for a trip to ${
      tripInput.destination
    } 
    from ${tripInput.startDate} to ${tripInput.endDate}.
    
    Traveler Preferences:
    - Interests: ${tripInput.interests.join(", ") || "Not specified"}
    - Budget: ${tripInput.budget} in US Dollar

    
    Required JSON Structure:
    {
      "itinerary": [
        {
          "day": 1,
          "morning": "Detailed morning plans (2-3 activities)",
          "afternoon": "Detailed afternoon plans (2-3 activities)",
          "evening": "Detailed evening plans (1-2 activities)"
        }
      ],
      "packingList": [
        {
          "category": "category name",
          "items": ["item1", "item2"]
        }
      ],
      "localTips": [
        {
          "title": "tip title",
          "description": "tip details"
        }
      ]
    }


    IMPORTANT: (itinerary, packingList, localTips) They Must Be List Of Objects.
    Return ONLY the JSON object without any additional text or markdown formatting.`;

    console.log("Sending to Mistral:", {
      model: "mistral-tiny",
      prompt_length: prompt.length,
    });

    const response = await client.chat.complete({
      model: "mistral-small",
      messages: [{ role: "user", content: prompt }],
      responseFormat: { type: "json_object" },
    });

    console.log("Mistral response:", {
      id: response.id,
      usage: response.usage,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No content in Mistral response");
    }

    let parsedContent;
    try {
      parsedContent = JSON.parse(content.toString());
    } catch (e) {
      console.error("Failed to parse Mistral response:", content);
      throw new Error("Invalid JSON response from Mistral");
    }

    if (
      !parsedContent.itinerary ||
      !parsedContent.packingList ||
      !parsedContent.localTips
    ) {
      console.error("Invalid response structure:", parsedContent);
      throw new Error("Mistral response missing required fields");
    }

    return NextResponse.json({
      itinerary: parsedContent.itinerary,
      packingList: parsedContent.packingList,
      localTips: parsedContent.localTips,
    });
  } catch (error) {
    console.error("Error details:", error);

    return NextResponse.json(
      {
        error: "Failed to generate plan",
        details: error instanceof Error ? error.message : "Unknown error",
        suggestion: "Please try again with different parameters",
      },
      { status: 500 }
    );
  }
}
