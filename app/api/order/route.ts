export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { CartItem } from "@/context/CartContext";
import { ObjectId } from "mongodb";

type Order = {
  name: string;
  phone: string;
  address?: string;
  products: CartItem[];
  totalAmount: number;
  status: "pending" | "completed" | "processing" | "cancelled";
  createdAt: Date;
};

// ---------------- CREATE ORDER ----------------
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // ---------------- VALIDATION ----------------
    if (
      !data ||
      typeof data.name !== "string" ||
      !data.name.trim() ||
      typeof data.phone !== "string" ||
      !data.phone.trim() ||
      !Array.isArray(data.products) ||
      data.products.length === 0
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid order data" },
        { status: 400 }
      );
    }

    // ---------------- CALCULATE TOTAL ----------------
    const totalAmount = data.products.reduce(
      (sum: number, item: CartItem) => sum + item.price * item.quantity,
      0
    );

    // ---------------- CREATE ORDER OBJECT ----------------
    const order: Order = {
      name: data.name.trim(),
      phone: data.phone.trim(),
      address: typeof data.address === "string" ? data.address.trim() : "",
      products: data.products,
      totalAmount,
      status: "pending",
      createdAt: new Date(),
    };

    // ---------------- SAVE TO DB ----------------
    const client = await clientPromise;
    const db = client.db("SmRice");

    const result = await db.collection("orders").insertOne(order);

    return NextResponse.json(
      { success: true, orderId: result.insertedId },
      { status: 201 }
    );
  } catch (err) {
    console.error("Order POST error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to create order" },
      { status: 500 }
    );
  }
}

// ---------------- GET ALL ORDERS ----------------
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("SmRice");

    const orders = await db
      .collection("orders")
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ success: true, orders });
  } catch (err) {
    console.error("Order GET error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

// ---------------- OPTIONAL: UPDATE ORDER ----------------
export async function PATCH(req: NextRequest) {
  try {
    const data = await req.json();
    const { id, ...updateData } = data;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Order ID is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("SmRice");

    await db.collection("orders").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    return NextResponse.json({ success: true, message: "Order updated" });
  } catch (err) {
    console.error("Order PATCH error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to update order" },
      { status: 500 }
    );
  }
}

// ---------------- OPTIONAL: DELETE ORDER ----------------
export async function DELETE(req: NextRequest) {
  try {
    const data = await req.json();
    const { id } = data;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Order ID is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("SmRice");

    await db.collection("orders").deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ success: true, message: "Order deleted" });
  } catch (err) {
    console.error("Order DELETE error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to delete order" },
      { status: 500 }
    );
  }
}
