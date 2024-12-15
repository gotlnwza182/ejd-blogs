import express from "express";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";

const app = express();
const port = 3000;

let blogs = [];
var postCreated = false;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { blogs: blogs });
});

app.get("/create", (req, res) => {
  res.render("create.ejs", { created: postCreated });
});

app.post("/submit", (req, res) => {
  const newBlog = {
    id: uuidv4(),
    title: req.body["title"],
    content: req.body["content"],
  };
  blogs.unshift(newBlog);
  postCreated = true;
  res.render("create.ejs", { created: postCreated });
  postCreated = false;
});

app.get("/edit", (req, res) => {
  const blogId = req.query.id;
  const blogToEdit = blogs.find((blog) => blog.id === blogId);
  res.render("edit.ejs", { blog: blogToEdit });
});

app.post("/update", (req, res) => {
  const blogId = req.body.id;
  const updateBlog = {
    id: blogId,
    title: req.body["title"],
    content: req.body["content"],
  };

  blogs = blogs.map((blog) => (blog.id === blogId ? updateBlog : blog));
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const blogId = req.body.id;
  blogs = blogs.filter((blog) => blog.id !== blogId);
  res.render("index.ejs", { blogs: blogs });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
