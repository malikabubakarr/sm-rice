// app/api/contact/route.ts

export const dynamic = "force-dynamic";
export const runtime = "nodejs"; // ✅ REQUIRED for MongoDB

import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// ---------------- CREATE CONTACT ----------------
export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data?.name || !data?.email || !data?.message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("SmRice");

    const result = await db.collection("contact").insertOne({
      name: data.name.trim(),
      email: data.email.trim(),
      message: data.message.trim(),
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      contact: {
        email: data.email.trim(),
        name: data.name.trim(),
        message: data.message.trim(),
      },
    });
  } catch (err) {
    console.error("Contact POST error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to create contact" },
      { status: 500 }
    );
  }
}

// ---------------- READ CONTACTS ----------------
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("SmRice");

    const contacts = await db
      .collection("contact")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const formattedContacts = contacts.map((c: any) => ({
      name: c.name || "",
      email: c.email || "",
      message: c.message || "",
      createdAt: c.createdAt ? new Date(c.createdAt).toISOString() : null,
    }));

    return NextResponse.json({ success: true, contacts: formattedContacts });
  } catch (err) {
    console.error("Contact GET error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}

// ---------------- DELETE CONTACT ----------------
export async function DELETE(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required to delete contact" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("SmRice");

    const result = await db.collection("contact").deleteOne({
      email: email.trim(),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Contact not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact DELETE error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to delete contact" },
      { status: 500 }
    );
  }
}
