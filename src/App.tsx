import Books from "./pages/Books";
import { Routes, Route } from "react-router-dom";
import Borrow from "./pages/Borrow";
import BorrowSummary from "./pages/BorrowSummary";
import CreateBook from "./pages/CreateBook";
import EditBook from "./pages/EditBook";
import MainLayout from "./layouts/MainLayout";
import BookDetails from "./pages/BookDetails";
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Books />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/books" element={<Books />} />
        <Route path="/create-book" element={<CreateBook />} />
        <Route path="/edit-book/:id" element={<EditBook />} />
        <Route path="/borrow/:bookId" element={<Borrow />} />
        <Route path="/borrow-summary" element={<BorrowSummary />} />
      </Route>
    </Routes>
  );
}

export default App;
