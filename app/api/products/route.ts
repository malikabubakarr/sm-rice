export const dynamic = "force-dynamic";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// ---------------- CREATE PRODUCT ----------------
export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("SmRice");
    const data = await req.json();

    if (!data.name || !data.spec) {
      return NextResponse.json(
        { success: false, error: "Name and spec are required" },
        { status: 400 }
      );
    }

    const result = await db.collection("products").insertOne({
      name: data.name,
      spec: data.spec,  // Changed from description to spec
      img: data.img || undefined,  // Added img field
      price: data.price || 0,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, product: { ...data, _id: result.insertedId } });
  } catch (err) {
    console.error("Product POST error:", err);
    return NextResponse.json({ success: false, error: "Failed to create product" }, { status: 500 });
  }
}

// ---------------- READ PRODUCTS ----------------
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("SmRice");

    const products = await db
      .collection("products")
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    const formattedProducts = products.map((p: any) => ({
      _id: p._id.toString(),
      name: p.name,
      spec: p.spec,  // Changed from description to spec
      img: p.img || undefined,  // Added img field
      price: p.price,
      createdAt: p.createdAt,
    }));

    return NextResponse.json({ success: true, products: formattedProducts });
  } catch (err) {
    console.error("Product GET error:", err);
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 });
  }
}

// ---------------- UPDATE PRODUCT ----------------
export async function PATCH(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("SmRice");
    const { _id, name, spec, img, price } = await req.json();  // Added img

    if (!_id || !name || !spec) {
      return NextResponse.json(
        { success: false, error: "ID, name, and spec are required" },
        { status: 400 }
      );
    }

    const updateData: any = { name, spec, price };
    if (img !== undefined) updateData.img = img;  // Only update img if provided

    const result = await db.collection("products").updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, result });
  } catch (err) {
    console.error("Product PATCH error:", err);
    return NextResponse.json({ success: false, error: "Failed to update product" }, { status: 500 });
  }
}

// ---------------- DELETE PRODUCT ----------------
export async function DELETE(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("SmRice");
    const { _id } = await req.json();

    if (!_id) {
      return NextResponse.json({ success: false, error: "Product ID required" }, { status: 400 });
    }

    const result = await db.collection("products").deleteOne({ _id: new ObjectId(_id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, result });
  } catch (err) {
    console.error("Product DELETE error:", err);
    return NextResponse.json({ success: false, error: "Failed to delete product" }, { status: 500 });
  }
}