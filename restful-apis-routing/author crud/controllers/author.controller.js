import authors from "../data/authors.data.js";

// GET all authors
export const getAllAuthors = (req, res) => {
  res.status(200).json(authors);
};

// GET author by id
export const getAuthorById = (req, res) => {
  const id = Number(req.params.id);
  const author = authors.find((a) => a.id === id);

  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }

  res.status(200).json(author);
};

// CREATE new author
export const createAuthor = (req, res) => {
  const { name, country } = req.body;

  const newAuthor = {
    id: authors.length + 1,
    name,
    country
  };

  authors.push(newAuthor);
  res.status(201).json(newAuthor);
};

// UPDATE author
export const updateAuthor = (req, res) => {
  const id = Number(req.params.id);
  const author = authors.find((a) => a.id === id);

  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }

  const { name, country } = req.body;
  author.name = name ?? author.name;
  author.country = country ?? author.country;

  res.json(author);
};

// DELETE author
export const deleteAuthor = (req, res) => {
  const id = Number(req.params.id);
  const index = authors.findIndex((a) => a.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Author not found" });
  }
  const deletedAuthor = authors.splice(index, 1);
  res.json(deletedAuthor[0]);
};