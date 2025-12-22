import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic"; // Always fetch fresh data

type Contact = {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string; // ISO string
};

// Server function to fetch contacts
async function getContacts(): Promise<Contact[]> {
  const client = await clientPromise;
  const db = client.db("SmRice");

  const contacts = await db
    .collection("contact")
    .find()
    .sort({ createdAt: -1 })
    .toArray();

  return contacts.map((c: any) => ({
    _id: c._id.toString(),
    name: c.name || "",
    email: c.email || "",
    message: c.message || "",
    createdAt: c.createdAt
      ? new Date(c.createdAt).toISOString()
      : new Date().toISOString(),
  }));
}

// Page Component
export default async function ContactPage() {
  let formattedContacts: Contact[] = [];

  try {
    formattedContacts = await getContacts();
  } catch (error) {
    console.error("DB FETCH ERROR:", error);
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <h1 className="text-3xl font-bold text-[#5B3A1E]">Contact Messages</h1>

      <div className="overflow-x-auto bg-white shadow rounded">
        {formattedContacts.length > 0 ? (
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
                  <td className="p-3">{new Date(item.createdAt).toUTCString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="p-4 text-center text-gray-500">No messages yet</p>
        )}
      </div>
    </div>
  );
}