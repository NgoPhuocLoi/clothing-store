export const checkProductData = async (req, res, next) => {
  const errors = [];

  const { title, image, price, description, category } = req.body;

  for (const key in req.body) {
    if (!req.body[key]) {
      errors.push(`${key} is required!`);
    }
  }

  if (errors.length > 0) return res.status(401).json({ message: errors });

  next();
};
