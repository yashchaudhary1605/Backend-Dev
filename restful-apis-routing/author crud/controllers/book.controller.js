import books from "../data/data.js";

export const getAllBooks = (req, res) => {
  let { author, year, page = 1, limit = 10 } = req.query;
  let result = books;

  //FILTERING
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

  //PAGINATION
  page = Number(page);
  limit = Number(limit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedBooks = result.slice(startIndex, endIndex);

  res.status(200).json({
    totalBooks: result.length,
    currentPage: page,
    totalPages: Math.ceil(result.length / limit),
    books: paginatedBooks
  });
};