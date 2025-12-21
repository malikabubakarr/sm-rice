import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// Create Product (POST)
export async function POST(req: Request) {
  const client = await clientPromise;
  const db = client.db("SmRice");
  const data = await req.json();

  const result = await db.collection("products").insertOne({
    name: data.name,
    description: data.description,
    price: data.price || 0,
    createdAt: new Date(),
  });

  return NextResponse.json({ success: true, product: result });
}

// Read Products (GET)
export async function GET() {
  const client = await clientPromise;
  const db = client.db("SmRice");

  const products = await db.collection("products").find().toArray();
  return NextResponse.json({ products });
}

// Update Product (PATCH)
export async function PATCH(req: Request) {
  const client = await clientPromise;
  const db = client.db("SmRice");
  const { _id, name, description, price } = await req.json();

  const result = await db.collection("products").updateOne(
    { _id: new ObjectId(_id) },
    { $set: { name, description, price } }
  );

  return NextResponse.json({ success: true, result });
}

// Delete Product (DELETE)
export async function DELETE(req: Request) {
  const client = await clientPromise;
  const db = client.db("SmRice");
  const { _id } = await req.json();

  const result = await db.collection("products").deleteOne({ _id: new ObjectId(_id) });
  return NextResponse.json({ success: true, result });
}
