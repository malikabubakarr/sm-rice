import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

/* ---------- PATCH (Update Status) ---------- */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // ✅ FIX
) {
  try {
    const { id } = await params; // ✅ FIX
    const { status } = await req.json();

    if (!status) {
      return NextResponse.json(
        { success: false, error: "Missing status" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("SmRice");

    const result = await db.collection("orders").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );

    return NextResponse.json({
      success: true,
      modifiedCount: result.modifiedCount,
    });
  } catch (err) {
    console.error("PATCH /order/[id] error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to update order" },
      { status: 500 }
    );
  }
}

/* ---------- DELETE (Remove Order) ---------- */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // ✅ FIX
) {
  try {
    const { id } = await params; // ✅ FIX

    const client = await clientPromise;
    const db = client.db("SmRice");

    const result = await db
      .collection("orders")
      .deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({
      success: true,
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    console.error("DELETE /order/[id] error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to delete order" },
      { status: 500 }
    );
  }
}
