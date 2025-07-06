import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateBookMutation } from "@/redux/api/bookApi";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import type { BookForm } from "@/types";
import { formatGenre } from "@/utils/helperFunc";

export default function CreateBook() {
  const navigate = useNavigate();
  const toast = useToast();
  const [createBook, { isLoading }] = useCreateBookMutation();

  const [form, setForm] = useState<BookForm>({
    title: "",
    author: "",
    genre: "Not selected",
    isbn: "",
    description: "",
    copies: 1,
    available: true,
  });

  const genres = [
    "FICTION",
    "NON_FICTION",
    "SCIENCE",
    "HISTORY",
    "BIOGRAPHY",
    "FANTASY",
    "Not selected",
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "copies" ? (value === "" ? "" : Number(value)) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      available: form.copies === 0 ? false : form.available,
    };

    try {
      await createBook(payload).unwrap();
      toast({
        title: "Book Added",
        description: `✅ ${payload.title} has been created.`,
      });
      navigate("/books");
    } catch (err) {
      toast({ title: "Error", description: "❌ Failed to create book." });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          📘 Add New Book
        </h2>

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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Not selected" disabled className="text-gray-400">
                -- Select Genre --
              </option>
              {genres
                .filter((g) => g !== "Not selected")
                .map((g) => (
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="checkbox"
              name="available"
              checked={form.available}
              onChange={(e) =>
                setForm({ ...form, available: e.target.checked })
              }
            />
            Available
          </label>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Submitting..." : "Add Book"}
          </Button>
        </form>
      </div>
    </div>
  );
}
