import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  // Handle webhook events from Farcaster/Base
  try {
    const body = await request.json();
    console.log("Webhook received:", body);
    
    // You can add custom logic here to handle different webhook events
    // For example: tracking game starts, user interactions, etc.
    
    return Response.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function GET() {
  return Response.json({ status: "Webhook endpoint active" });
}
