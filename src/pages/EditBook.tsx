import { useParams, useNavigate } from "react-router-dom";
import {
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from "@/redux/api/bookApi";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { type BookForm } from "@/types";
import { formatGenre } from "@/utils/helperFunc";

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const { data, isLoading, isError } = useGetBookByIdQuery(id || "");
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  const [form, setForm] = useState<BookForm>({
    title: "",
    author: "",
    genre: "Not selected",
    isbn: "",
    description: "",
    copies: 0,
    available: true,
  });

  const genres = [
    "FICTION",
    "NON_FICTION",
    "SCIENCE",
    "HISTORY",
    "BIOGRAPHY",
    "FANTASY",
  ];

  useEffect(() => {
    if (data?.data) {
      const b = data.data;
      setForm({
        title: b.title,
        author: b.author,
        genre: b.genre,
        isbn: b.isbn,
        description: b.description || "",
        copies: b.copies,
        available: b.available,
      });
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    const val =
      type === "checkbox"
        ? checked
        : name === "copies"
        ? value === ""
          ? ""
          : Number(value)
        : value;

    setForm((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedForm = {
      ...form,
      available: form.copies === 0 ? false : form.available,
    };

    try {
      await updateBook({
        id,
        ...updatedForm,
      }).unwrap();

      toast({
        title: "Book Updated",
        description: `${updatedForm.title} updated successfully.`,
      });
      navigate("/books");
    } catch (err) {
      toast({ title: "Error", description: "Failed to update book." });
    }
  };

  if (isLoading) return <p>Loading book info...</p>;
  if (isError)
    return <p className="text-red-500">Failed to fetch book details.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">✏️ Edit Book</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Book Title"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Author
            </label>
            <input
              type="text"
              name="author"
              value={form.author}
              onChange={handleChange}
              placeholder="Author Name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Genre
            </label>
            <select
              name="genre"
              value={form.genre}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              {genres.map((g) => (
                <option key={g} value={g}>
                  {formatGenre(g)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">ISBN</label>
            <input
              type="text"
              name="isbn"
              value={form.isbn}
              onChange={handleChange}
              placeholder="ISBN Code"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Optional"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Copies
            </label>
            <input
              type="number"
              name="copies"
              value={form.copies}
              min={0}
              onChange={handleChange}
              placeholder="Number of Copies"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="checkbox"
              name="available"
              checked={form.available}
              onChange={handleChange}
            />
            Available
          </label>

          <Button type="submit" disabled={isUpdating} className="w-full">
            {isUpdating ? "Updating..." : "Update Book"}
          </Button>
        </form>
      </div>
    </div>
  );
}
