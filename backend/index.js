import express from "express"
import mysql from "mysql"
import cors from "cors";


const app = express()

const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"root",
  database:"test"
})




app.use(express.json());
app.use(cors());


app.get("/", (req,res)=>{
  res.json("Hello this is backend")
})


app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) {
      console.error("Error executing query:", err.message); // Log the error
      return res.json({ error: err.message }); // Return error message in response
    }
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`, `desc`,`price`, `cover`) VALUES (?)"; // Corrected column names
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [values], (err, data) => {
    if (err) {
      console.error("Error executing query:", err.message); // Log the error
      return res.json({ error: err.message }); // Return error message in response
    }
    return res.json("Book has been created succesfully"); // Return success response with inserted data
  });
});

app.delete("/books/:id", (req,res)=>{
  const bookId = req.params.id;
  const q = "DELETE FROM BOOKS WHERE id=?"

  db.query(q,[bookId],(err,data)=>{
    if (err) return res.json(err);
    return res.json("book has been deleted successfully.")
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;

  const getBookQuery = "SELECT * FROM books WHERE id = ?";
  db.query(getBookQuery, [bookId], (err, data) => {
    if (err) {
      console.error("Error fetching book:", err.message);
      return res.json({ error: err.message });
    }

    if (data.length === 0) {
      return res.status(404).json("Book not found");
    }

    const currentBook = data[0];
    const updatedFields = [];
    const values = [];

    // Check and prepare the updated values, or use the current value if not provided
    if (req.body.title !== undefined && req.body.title !== "") {
      updatedFields.push("title = ?");
      values.push(req.body.title);
    } else {
      updatedFields.push("title = ?");
      values.push(currentBook.title);
    }

    if (req.body.desc !== undefined && req.body.desc !== "") {
      updatedFields.push("`desc` = ?");
      values.push(req.body.desc);
    } else {
      updatedFields.push("`desc` = ?");
      values.push(currentBook.desc);
    }

    if (req.body.price !== undefined && req.body.price !== "") {
      updatedFields.push("price = ?");
      values.push(req.body.price);
    } else {
      updatedFields.push("price = ?");
      values.push(currentBook.price);
    }

    if (req.body.cover !== undefined && req.body.cover !== "") {
      updatedFields.push("cover = ?");
      values.push(req.body.cover);
    } else {
      updatedFields.push("cover = ?");
      values.push(currentBook.cover);
    }

    const updateQuery = `UPDATE books SET ${updatedFields.join(", ")} WHERE id = ?`;

    db.query(updateQuery, [...values, bookId], (err, result) => {
      if (err) {
        console.error("Error executing update:", err.message);
        return res.json({ error: err.message });
      }
      return res.json("Book has been updated successfully.");
    });
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;

  const getBookQuery = "SELECT * FROM books WHERE id = ?";
  db.query(getBookQuery, [bookId], (err, data) => {
    if (err) {
      console.error("Error fetching book:", err.message);
      return res.json({ error: err.message });
    }

    if (data.length === 0) {
      return res.status(404).json("Book not found");
    }

    const currentBook = data[0];
    const updatedFields = [];
    const values = [];

    // Check if each field is provided in the request, otherwise use the current value from the database
    // If the field is provided, use the new value
    // If not, keep the current value

    // Handle title
    if (req.body.title !== undefined && req.body.title !== "") {
      updatedFields.push("title = ?");
      values.push(req.body.title);
    } else {
      updatedFields.push("title = ?");
      values.push(currentBook.title); // Retain old value if not provided
    }

    // Handle description
    if (req.body.desc !== undefined && req.body.desc !== "") {
      updatedFields.push("`desc` = ?");
      values.push(req.body.desc);
    } else {
      updatedFields.push("`desc` = ?");
      values.push(currentBook.desc); // Retain old value if not provided
    }

    // Handle price
    if (req.body.price !== undefined && req.body.price !== "") {
      updatedFields.push("price = ?");
      values.push(req.body.price);
    } else {
      updatedFields.push("price = ?");
      values.push(currentBook.price); // Retain old value if not provided
    }

    // Handle cover
    if (req.body.cover !== undefined && req.body.cover !== "") {
      updatedFields.push("cover = ?");
      values.push(req.body.cover);
    } else {
      updatedFields.push("cover = ?");
      values.push(currentBook.cover); // Retain old value if not provided
    }

    // Construct the final update query
    const updateQuery = `UPDATE books SET ${updatedFields.join(", ")} WHERE id = ?`;

    // Execute the query to update the book
    db.query(updateQuery, [...values, bookId], (err, result) => {
      if (err) {
        console.error("Error executing update:", err.message);
        return res.json({ error: err.message });
      }
      return res.json("Book has been updated successfully.");
    });
  });
});




app.listen(8800,()=>{
  console.log("connected to backend!")
})