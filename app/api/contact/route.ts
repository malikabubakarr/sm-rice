import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("SmRice");

    const contacts = await db
      .collection("contact")
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    const formattedContacts = contacts.map((c: any) => ({
      _id: c._id.toString(),
      name: c.name || "",
      email: c.email || "",
      message: c.message || "",
      createdAt: c.createdAt ? new Date(c.createdAt).toISOString() : new Date().toISOString(),
    }));

    return NextResponse.json({ success: true, contacts: formattedContacts });
  } catch (err) {
    console.error("Contacts GET error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}
