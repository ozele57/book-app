
import React, { useMemo, useState } from "react";
import {
  BookMarked,
  Search,
  Menu,
  UserCircle,
  Plus,
  MoreVertical,
  Home,
} from "lucide-react";

const initialBooks = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    date: "October 16, 2018.",
  },
  {
    title: "Awaken the Giant Within",
    author: "Tony Robbins",
    date: "November 15, 1991.",
  },
  {
    title: "Releasing your Potential",
    author: "Dr. Myles Munroe",
    date: "June 9, 1992",
  },
  {
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    date: "March 17, 1937",
  },
  {
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    date: "August 15, 1989",
  },
  {
    title: "Man's Search for Meaning",
    author: "Viktor E. Frankl",
    date: "October 13, 1946",
  },
];

export default function BookHome({ onLogout }) {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState(initialBooks);
  const [menu, setMenu] = useState(false);
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const filteredBooks = useMemo(
    () =>
      books.filter((book) =>
        `${book.title} ${book.author}`
          .toLowerCase()
          .includes(query.toLowerCase())
      ),
    [books, query]
  );

  function addBook(e) {
    e.preventDefault();

    if (!title.trim() || !author.trim()) return;

    setBooks([
      {
        title: title.trim(),
        author: author.trim(),
        date: new Date().toLocaleDateString(),
      },
      ...books,
    ]);

    setTitle("");
    setAuthor("");
    setAdding(false);
  }

  function removeBook(bookToRemove) {
    setBooks((current) =>
      current.filter((book) => book !== bookToRemove)
    );
  }

  return (
    <section className="screen home">
    

      <header className="home-header">
        <button
          className="icon"
          onClick={() => setMenu(!menu)}
          aria-label="Open menu"
        >
          <Menu />
        </button>

        <button
          className="profile"
          onClick={() => setMenu(!menu)}
        >
         <img
  src="/assets/ade.svg"
  alt="Ade Phil"
  className="profile-picture"
/>

          <span>
            <b>Ade Phil</b>
            <small>Adephil@gmail.com</small>
          </span>
        </button>

        {menu && (
          <div className="menu">
            <button onClick={onLogout}>
              Log out
            </button>
          </div>
        )}
      </header>

      <div className="home-content">
        <label className="search">
          <Search size={21} />

          <input
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>

        <button
          className="add"
          onClick={() => setAdding(!adding)}
        >
          {adding ? "Cancel" : "Add Book"}
        </button>

        {adding && (
          <form className="add-form" onSubmit={addBook}>
            <input
              placeholder="Book title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <input
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />

            <button className="primary" type="submit">
              Save book
            </button>
          </form>
        )}

        <div className="book-list">
          {filteredBooks.map((book, index) => (
            <article
              className="book"
              key={`${book.title}-${index}`}
            >
             <img
  src="/assets/atomic.svg"
  alt="Book"
  className="book-mark"
/>

              <div className="book-copy">
                <b>{book.title}</b>
                <span>{book.author}</span>
                <small>{book.date}</small>
              </div>

              <button
                className="more"
                aria-label={`Remove ${book.title}`}
                onClick={() => removeBook(book)}
              >
                <MoreVertical size={18} />
              </button>
            </article>
          ))}

          {filteredBooks.length === 0 && (
            <p className="empty">No books found.</p>
          )}
        </div>
      </div>

      <nav className="bottom">
        <button className="selected">
          <img
  src="/assets/ho.svg"
  alt="Home"
  className="home-icon"
/>
          <span>Home</span>
        </button>

        <button onClick={() => setAdding(true)}>
          <Plus size={24} />
          <span>Add</span>
        </button>
      </nav>
    </section>
  );
}
