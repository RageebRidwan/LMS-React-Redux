import ThemeToggle from "@/components/ui/ThemeToggle";
import { Link, NavLink, Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* Navbar */}
      <nav className="bg-indigo-600 text-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-2xl font-semibold tracking-wide">
            📚 Library System
          </Link>
          <div className="flex gap-4 text-sm">
            <NavLink
              to="/books"
              className={({ isActive }) =>
                `px-3 py-1 rounded-md transition ${
                  isActive
                    ? "bg-white text-indigo-600 font-semibold"
                    : "hover:bg-indigo-500"
                }`
              }
            >
              All Books
            </NavLink>
            <NavLink
              to="/create-book"
              className={({ isActive }) =>
                `px-3 py-1 rounded-md transition ${
                  isActive
                    ? "bg-white text-indigo-600 font-semibold"
                    : "hover:bg-indigo-500"
                }`
              }
            >
              Add Book
            </NavLink>
            <NavLink
              to="/borrow-summary"
              className={({ isActive }) =>
                `px-3 py-1 rounded-md transition ${
                  isActive
                    ? "bg-white text-indigo-600 font-semibold"
                    : "hover:bg-indigo-500"
                }`
              }
            >
              Borrow Summary
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 text-center text-sm text-gray-600 py-4 mt-6 border-t">
        © {new Date().getFullYear()}{" "}
        <span className="font-medium">Library System</span> | Built with 💙 by
        Rageeb Ridwan
      </footer>
    </div>
  );
}
