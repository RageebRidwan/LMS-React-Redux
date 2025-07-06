
# 📚 Minimal Library Management System

A clean, responsive, and fully client-side Library Management System built using **React**, **TypeScript**, **Redux Toolkit Query**, **Tailwind CSS**, and **shadcn/ui**. The app allows users to view, add, edit, delete, and borrow books without any authentication or complex flows.

> ⚙️ Backend deployed at: [`https://library-management-api-m61d.onrender.com`](https://library-management-api-m61d.onrender.com)

---

## 🚀 Features

### 1. Public Access Routes

- No login or authentication required.
- All pages are open and accessible to any user.

### 2. 📘 Book Management

- **List View** with sortable and clear table showing:
  - Title, Author, Genre, ISBN, Copies, Availability, Actions.
- **CRUD Operations**:
  - ➕ **Add Book** – Clean form to add new books.
  - ✏️ **Edit Book** – Pre-filled form to update details.
  - 🗑️ **Delete Book** – Confirmation before deletion.
  - 📚 **Borrow Book** – Quantity-based borrowing with due date.
- **Business Logic**:
  - If copies = 0 → the book becomes automatically unavailable.
  - Editing book with 0 copies will also auto-set it as unavailable.

### 3. 🔄 Borrow Book

- Form accepts:
  - 📦 Quantity (cannot exceed available copies)
  - 📅 Due Date
- Borrowing a book reduces the available count.
- Redirects to borrow summary on success.

### 4. 📊 Borrow Summary

- Aggregated view of all borrowed books.
- Columns:
  - Book Title, ISBN, Total Quantity Borrowed

---

## 🧭 Navigation

- **Navbar** includes:
  - 🗂️ All Books
  - ➕ Add Book
  - 📈 Borrow Summary
- **Footer** displays basic credits.

---

## 📁 Project Structure

```bash
📦 src
├── components/ui       # Reusable UI elements (shadcn)
├── layouts             # Main layout with Navbar & Footer
├── pages               # All route-based pages
├── redux               # API slices & RTK store
├── types               # TypeScript types & interfaces
├── utils               # Helper functions
├── App.tsx / main.tsx  # Main entry points
```

---

## 🛠️ Tech Stack

| Category           | Technologies                             |
|--------------------|-------------------------------------------|
| **Frontend**       | React + TypeScript                        |
| **State Management** | Redux Toolkit Query (RTK Query)          |
| **Styling**        | Tailwind CSS + Shadcn UI                  |
| **Routing**        | React Router DOM                          |
| **Deployment**     | Render                                    |

---

## ⚙️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/library-management.git
cd library-management
```

### 2. Install Dependencies

```bash
npm install
```

### 3. ⚙️ Configure API (Environment Variable)

The frontend connects to the backend API using an environment variable.
Create a .env file in the root of the project and add the following:
```env
VITE_API_BASE_URL=https://library-management-api-m61d.onrender.com/api
```
✅ This will allow all RTK Query endpoints to use the correct API base automatically.
🔁 If you're testing locally (with a locally running backend), you can change it to:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Note:
Do not commit your .env file to GitHub. It's already ignored in .gitignore.

---








