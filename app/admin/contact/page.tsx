import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic"; // Always fetch fresh data

type Contact = {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

export default async function ContactPage() {
  try {
    const client = await clientPromise;
    const db = client.db("SmRice");

    // Fetch contacts from MongoDB
    const contacts = await db
      .collection("contact")
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    // Map contacts to TypeScript-safe format
    const formattedContacts: Contact[] = contacts.map((c: any) => ({
      _id: c._id.toString(),
      name: c.name || "",
      email: c.email || "",
      message: c.message || "",
      createdAt: c.createdAt
        ? new Date(c.createdAt).toISOString()
        : new Date().toISOString(),
    }));

    return (
      <div className="flex flex-col gap-6 p-4">
        <h1 className="text-3xl font-bold text-[#5B3A1E]">Contact Messages</h1>

        <div className="overflow-x-auto bg-white shadow rounded">
          <table className="w-full table-auto border">
            <thead className="bg-[#F5F0E6] text-[#5B3A1E]">
              <tr>
                <th className="p-3 border text-left">Name</th>
                <th className="p-3 border text-left">Email</th>
                <th className="p-3 border text-left">Message</th>
                <th className="p-3 border text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {formattedContacts.map((item) => (
                <tr
                  key={item._id}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.email}</td>
                  <td className="p-3">{item.message}</td>
                  <td className="p-3">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {formattedContacts.length === 0 && (
            <p className="p-4 text-center text-gray-500">No messages yet</p>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("DB FETCH ERROR:", error);
    return (
      <p className="p-4 text-red-600">
        Error fetching contact messages. Please try again later.
      </p>
    );
  }
}
