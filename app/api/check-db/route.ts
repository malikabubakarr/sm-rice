// app/api/check-db/route.ts

export const dynamic = "force-dynamic";
export const runtime = "nodejs"; // ✅ IMPORTANT for MongoDB

import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise; // ✅ forces connection
    await client.db("SmRice").command({ ping: 1 });

    return NextResponse.json(
      { success: true, message: "MongoDB Connected" },
      { status: 200 }
    );
  } catch (error) {
    console.error("MongoDB connection error:", error);

    return NextResponse.json(
      { success: false, message: "MongoDB Connection Failed" },
      { status: 500 }
    );
  }
}
