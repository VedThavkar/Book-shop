import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Modal.css"; // Include the CSS file for the modal

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  const [isModalOpen, setModalOpen] = useState(false); // Modal state

  const navigate = useNavigate();
  const location = useLocation();

  const bookId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/books/${bookId}`);
        setBook(res.data); // Populate state with existing book data
      } catch (err) {
        console.log(err);
      }
    };
    fetchBook();
  }, [bookId]);

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:8800/books/${bookId}`, {
        title: book.title,
        desc: book.desc,
        price: book.price || undefined,
        cover: book.cover || undefined,
      });

      if (response.status === 200) {
        console.log("Book updated successfully");
        setModalOpen(false); // Close modal after successful update
        navigate("/"); // Navigate to the homepage or books list
      } else {
        console.log("Update failed", response);
      }
    } catch (err) {
      console.error("Error during update:", err);
    }
  };

  return (
    <div className="form">
      <h1>Update the Book</h1>
      <input
        type="text"
        placeholder="Title"
        onChange={handleChange}
        name="title"
        value={book.title}
      />
      <input
        type="text"
        placeholder="Description"
        onChange={handleChange}
        name="desc"
        value={book.desc}
      />
      <input
        type="number"
        placeholder="Price"
        onChange={handleChange}
        name="price"
        value={book.price}
      />
      <input
        type="text"
        placeholder="Cover"
        onChange={handleChange}
        name="cover"
        value={book.cover}
      />

      <button
        className="formButton"
        onClick={() => setModalOpen(true)} // Open modal
      >
        Update
      </button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirm Update</h2>
            <p>Are you sure you want to update this book?</p>
            <div className="modal-buttons">
              <button onClick={handleUpdate}>Yes, Update</button>
              <button onClick={() => setModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Update;
