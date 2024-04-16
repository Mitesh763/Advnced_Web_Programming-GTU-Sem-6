
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const PORT = 3000;

main()
  .then(() => {
    console.log("Connection Successfull");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/AWP");
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const Schema = mongoose.Schema;
const bookSchema = new Schema({
  title: String,
  author: String,
  isbn: String,
});
const Book = mongoose.model("Book", bookSchema);

app.get("/", (req, res) => {
  res.send("root");
});

app.get("/library", async (req, res) => {
  let books = await Book.find().limit(10);
  res.render("index.ejs", { books });
});

app.post("/library/new", async (req, res) => {
  let book = req.body.book;
  console.log(book);
  let newBook = new Book(book);
  console.log(newBook);
  let add = await newBook.save();
  console.log(add);
  let books = await Book.find().limit(10);
  res.render("index.ejs", { books });
});

app.post("/library/search", async (req, res) => {
  const { title,author,isbn } = req.body;
  const searchBook = await Book.findOne({$or : [{ title:title },{ author: author },{ isbn:isbn }]});
  if(!searchBook){
    res.send("No book Found")
  }
  res.render("search.ejs", { searchBook });
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
