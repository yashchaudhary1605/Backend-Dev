const validateYear = (req, res, next) => {
  const { year } = req.query;

  if (!year) {
    return next();
  }

  const yearNum = Number(year);
  const currentYear = new Date().getFullYear();

  // number check
  if (isNaN(yearNum)) {
    return res.status(400).json({
      error: "Year must be a valid number"
    });
  }

  // range check
  if (yearNum < 1900 || yearNum > currentYear) {
    return res.status(400).json({
      error: `Year must be between 1900 and ${currentYear}`
    });
  }

  next();
};

export default validateYear;