import { useEffect, useState } from "react";
import { getBooks, addBook, updateBook, deleteBook } from "../api/bookAPI";

function Books() {
    const [books, setBooks] = useState([]);
    const [form, setForm] = useState({
        title: "",
        author: "",
        published_date: "",
        pages: ""
    });

    const [editId, setEditId] = useState(null);

    // Load all books
    const loadBooks = async () => {
        const res = await getBooks();
        setBooks(res.data);
    };

    useEffect(() => {
        loadBooks();
    }, []);

  // Handle input
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

  // Add Book
    const handleAdd = async () => {
        await addBook(form);
        setForm({ title: "", author: "", published_date: "", pages: "" });
        loadBooks();
    };

    // Edit Book
    const handleEdit = (book) => {
        setEditId(book.id);
        setForm(book);
    };

  // Update Book
    const handleUpdate = async () => {
        await updateBook(editId, form);
        setEditId(null);
        setForm({ title: "", author: "", published_date: "", pages: "" });
        loadBooks();
    };

    // Delete Book
    const handleDelete = async (id) => {
        await deleteBook(id);
        loadBooks();
    };

    return (
        <div style={{ padding: 20 }}>
        <h2>Book Library</h2>

        <input 
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
        />
        <br />

        <input 
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="Author"
        />
        <br />

        <input 
            name="published_date"
            value={form.published_date}
            onChange={handleChange}
            placeholder="YYYY-MM-DD"
        />
        <br />

        <input 
            name="pages"
            value={form.pages}
            onChange={handleChange}
            placeholder="Pages"
        />
        <br />

        {editId ? (
            <button onClick={handleUpdate}>Update Book</button>
        ) : (
            <button onClick={handleAdd}>Add Book</button>
        )}

        <hr />

        <h3>All Books</h3>
        {books.map((b) => (
            <div key={b.id} style={{ marginBottom: 10 }}>
            <b>{b.title}</b> by {b.author}  
            (Pages: {b.pages})
            <br />

            <button onClick={() => handleEdit(b)}>Edit</button>
            <button onClick={() => handleDelete(b.id)}>Delete</button>
            </div>
        ))}
        </div>
    );
}

export default Books;
