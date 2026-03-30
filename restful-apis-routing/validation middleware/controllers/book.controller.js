import books from "../data/data.js";

export const getAllBooks = (req, res) => {
  let { author, year } = req.query;
  let result = books;

  if (author) {
    result = result.filter(
      (b) => b.author.toLowerCase() === author.toLowerCase()
    );
  }

  if (year) {
    result = result.filter(
      (b) => b.year === Number(year)
    );
  }

  res.status(200).json(result);
};