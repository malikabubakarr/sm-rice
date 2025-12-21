import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("SmRice");

    await db.collection("contact").insertOne({
      name: body.name,
      email: body.email,
      message: body.message,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("CONTACT API ERROR:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
