import { useGetBorrowSummaryQuery } from "@/redux/api/borrowApi";

export default function BorrowSummary() {
  const { data, isLoading, isError } = useGetBorrowSummaryQuery(undefined);

  if (isLoading)
    return (
      <p className="text-center text-sm text-gray-500">
        Loading borrow summary...
      </p>
    );

  if (isError || !data)
    return (
      <p className="text-center text-red-500">❌ Failed to load summary.</p>
    );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">
        📊 Borrowed Books Summary
      </h2>

      <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
        <table className="min-w-full text-sm text-gray-800">
          <thead className="bg-blue-50 border-b">
            <tr>
              <th className="p-3 text-left font-semibold">📖 Title</th>
              <th className="p-3 text-left font-semibold">🔢 ISBN</th>
              <th className="p-3 text-left font-semibold">📦 Total Quantity</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((item: any, idx: number) => (
              <tr key={idx} className="border-t hover:bg-gray-50 transition">
                <td className="p-3">{item.book.title}</td>
                <td className="p-3">{item.book.isbn}</td>
                <td className="p-3">{item.totalQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
