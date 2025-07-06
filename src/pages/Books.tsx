import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  useGetAllBooksQuery,
  useDeleteBookMutation,
} from "@/redux/api/bookApi";
import { formatGenre } from "@/utils/helperFunc";
import { Link } from "react-router-dom";

export default function Books() {
  const { data, isLoading, isError } = useGetAllBooksQuery(undefined);
  const [deleteBook] = useDeleteBookMutation();
  const toast = useToast();
  const books = (data as any)?.data ?? [];

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Delete this book?");
    if (!confirmDelete) return;

    try {
      await deleteBook(id).unwrap();
      toast({
        title: "Deleted ✅",
        description: "Book deleted successfully.",
      });
    } catch (err) {
      toast({
        title: "Error ❌",
        description: "Failed to delete the book.",
      });
    }
  };

  if (isLoading) return <p className="text-center">Loading books...</p>;
  if (isError)
    return <p className="text-center text-red-500">Failed to fetch books.</p>;

  if (books.length === 0)
    return (
      <div className="text-center mt-10 text-gray-500">
        No books available.{" "}
        <Link to="/create-book" className="text-indigo-600 underline">
          Add one now.
        </Link>
      </div>
    );

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-800">
          📖 All Books
        </h2>
        <Link to="/create-book">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow">
            ➕ Add New Book
          </Button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm rounded overflow-hidden">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Author</th>
              <th className="p-3 border">Genre</th>
              <th className="p-3 border">ISBN</th>
              <th className="p-3 border">Copies</th>
              <th className="p-3 border">Available</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book: any) => (
              <tr
                key={book._id}
                className="hover:bg-gray-50 transition border-t"
              >
                <td className="p-3 border font-medium text-indigo-700">
                  <Link to={`/books/${book._id}`} className="hover:underline">
                    {book.title}
                  </Link>
                </td>
                <td className="p-3 border">{book.author}</td>
                <td className="p-3 border">{formatGenre(book.genre)}</td>
                <td className="p-3 border">{book.isbn}</td>
                <td className="p-3 border">{book.copies}</td>
                <td className="p-3 border">{book.available ? "✅" : "❌"}</td>
                <td className="p-3 border text-center space-x-2 flex flex-wrap justify-center gap-2">
                  <Link to={`/edit-book/${book._id}`}>
                    <Button
                      size="sm"
                      className="bg-amber-100 text-amber-800 hover:bg-amber-200 border border-amber-300"
                    >
                      ✏️ Edit
                    </Button>
                  </Link>

                  <Link to={`/borrow/${book._id}`}>
                    <Button
                      size="sm"
                      className="bg-sky-100 text-sky-800 hover:bg-sky-200 border border-sky-300"
                    >
                      📚 Borrow
                    </Button>
                  </Link>

                  <Button
                    size="sm"
                    className="bg-rose-100 text-rose-700 hover:bg-rose-200 border border-rose-300"
                    onClick={() => handleDelete(book._id)}
                  >
                    🗑️ Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
