// app/api/check-db/route.ts
export const dynamic = "force-dynamic"; // ✅ ensures dynamic execution

import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await clientPromise; // ✅ MUST be called

    return NextResponse.json(
      { message: "MongoDB Connected" },
      { status: 200 }
    );
  } catch (error) {
    console.error("MongoDB connection error:", error);

    return NextResponse.json(
      { message: "MongoDB Connection Failed" },
      { status: 500 }
    );
  }
}
