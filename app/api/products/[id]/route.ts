import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// ---------------- GET SINGLE PRODUCT ----------------
export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params; // ✅ await the params

  try {
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid product ID" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("SmRice");

    const product = await db.collection("products").findOne({ _id: new ObjectId(id) });

    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      product: {
        _id: product._id.toString(),
        name: product.name,
        spec: product.spec,
        img: product.img ?? null,
        price: product.price ?? 0,
        createdAt: product.createdAt ? product.createdAt.toISOString() : null,
      },
    });
  } catch (err) {
    console.error("GET /api/products/[id] error:", err);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

// ---------------- PATCH PRODUCT ----------------
export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const data = await req.json();
  const { name, spec, img, price } = data;

  try {
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid product ID" }, { status: 400 });
    }

    if (!name || !spec) {
      return NextResponse.json({ success: false, error: "Name and spec are required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("SmRice");

    const result = await db.collection("products").updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, spec, price: Number(price) || 0, ...(img !== undefined ? { img } : {}) } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("PATCH /api/products/[id] error:", err);
    return NextResponse.json({ success: false, error: "Failed to update product" }, { status: 500 });
  }
}

// ---------------- DELETE PRODUCT ----------------
export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  try {
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid product ID" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("SmRice");

    const result = await db.collection("products").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/products/[id] error:", err);
    return NextResponse.json({ success: false, error: "Failed to delete product" }, { status: 500 });
  }
}
