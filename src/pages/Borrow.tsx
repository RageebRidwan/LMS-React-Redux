import { useParams, useNavigate } from "react-router-dom";
import { useGetBookByIdQuery } from "@/redux/api/bookApi";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useBorrowBookMutation } from "@/redux/api/borrowApi";
import { useToast } from "@/components/ui/use-toast";

export default function Borrow() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const {
    data: bookData,
    isLoading,
    isError,
  } = useGetBookByIdQuery(bookId || "");
  const [borrowBook, { isLoading: isBorrowing }] = useBorrowBookMutation();

  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");

  if (isLoading) return <p>Loading book details...</p>;
  if (isError || !bookData) return <p>Failed to load book info.</p>;

  const book = bookData.data;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (quantity < 1 || quantity > book.copies) {
      toast({
        title: "Invalid Quantity",
        description: `You can borrow between 1 and ${book.copies} copies.`,
      });
      return;
    }

    if (!dueDate) {
      toast({
        title: "Due Date Required",
        description: "Please select a due date.",
      });
      return;
    }

    try {
      await borrowBook({
        book: book._id,
        quantity,
        dueDate,
      }).unwrap();

      toast({
        title: "Success",
        description: "📚 Book borrowed successfully.",
      });
      navigate("/borrow-summary");
    } catch (err) {
      toast({ title: "Error", description: "❌ Failed to borrow book." });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-indigo-700">
          📘 Borrow "{book.title}"
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Quantity{" "}
              <span className="text-sm text-gray-500">
                (Available: {book.copies})
              </span>
            </label>
            <input
              type="number"
              min={1}
              max={book.copies}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isBorrowing}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            {isBorrowing ? "Borrowing..." : "Borrow"}
          </Button>
        </form>
      </div>
    </div>
  );
}
