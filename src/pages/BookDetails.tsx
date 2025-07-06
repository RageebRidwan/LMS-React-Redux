import { useParams, Link } from "react-router-dom";
import { useGetBookByIdQuery } from "@/redux/api/bookApi";
import { formatGenre } from "@/utils/helperFunc";

export default function BookDetails() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetBookByIdQuery(id || "");

  if (isLoading) return <p className="text-center">Loading book details...</p>;
  if (isError || !data)
    return <p className="text-center text-red-500">Failed to load book.</p>;

  const book = data.data;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Link
        to="/books"
        className="inline-block text-indigo-600 hover:underline mb-4"
      >
        ← Back to Books
      </Link>

      <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{book.title}</h1>

        <div className="space-y-2 text-sm sm:text-base text-gray-700">
          <p>
            <span className="font-semibold text-gray-800">✍️ Author:</span>{" "}
            {book.author}
          </p>
          <p>
            <span className="font-semibold text-gray-800">📖 Genre:</span>{" "}
            {formatGenre(book.genre)}
          </p>
          <p>
            <span className="font-semibold text-gray-800">🔢 ISBN:</span>{" "}
            {book.isbn}
          </p>
          <p>
            <span className="font-semibold text-gray-800">📦 Copies:</span>{" "}
            {book.copies}
          </p>
          <p>
            <span className="font-semibold text-gray-800">✅ Available:</span>{" "}
            {book.available ? "Yes" : "No"}
          </p>
          {book.description && (
            <p className="pt-2 border-t text-gray-600">
              <span className="block font-semibold text-gray-800 mb-1">
                📝 Description:
              </span>
              {book.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
