import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // ✅ MUST be Promise
) {
  try {
    const { id } = await params; // ✅ MUST await
    const data = await req.json();

    if (!data?.status) {
      return NextResponse.json(
        { success: false, error: "Missing status field" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("SmRice");

    const result = await db.collection("orders").updateOne(
      { _id: new ObjectId(id) }, // ✅ correct Mongo ID
      { $set: { status: data.status } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { success: false, error: "No order updated" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      modifiedCount: result.modifiedCount,
    });
  } catch (err) {
    console.error("Order PATCH error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to update order" },
      { status: 500 }
    );
  }
}
