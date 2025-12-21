import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("DBNAME"); // your database name

    // Example: fetch data from a collection
    const data = await db.collection("testCollection").find({}).toArray();

    res.status(200).json({ data });
  } catch (e) {
    res.status(500).json({ error: "Database connection failed" });
  }
}
