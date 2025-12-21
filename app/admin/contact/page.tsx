import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic"; // live DB fetch

export default async function ContactPage() {
  try {
    const client = await clientPromise;
    const db = client.db("SmRice");

    // Fetch contacts
    const contacts = await db
      .collection("contact")
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    console.log("CONTACT DATA:", contacts);

    return (
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Contact Messages</h1>

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
              {contacts.map((item: any) => (
                <tr key={item._id} className="border-t hover:bg-gray-50 transition-colors">
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.email}</td>
                  <td className="p-3">{item.message}</td>
                  <td className="p-3">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {contacts.length === 0 && (
            <p className="p-4 text-center text-gray-500">
              No messages yet
            </p>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("DB FETCH ERROR:", error);
    return <p>Error fetching data</p>;
  }
}
