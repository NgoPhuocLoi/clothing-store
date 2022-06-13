import { APIfeature } from '../lib/features';
import Products from '../models/productModel';

const productController = {
  getProducts: async (req, res) => {
    try {
      const features = new APIfeature(Products.find(), req.query)
        .paginating()
        .sorting()
        .searching()
        .filtering();

      const results = await Promise.allSettled([
        features.query,
        Products.countDocuments(),
      ]);

      const products =
        results[0].status === 'fulfilled' ? results[0].value : [];
      const count = results[1].status === 'fulfilled' ? results[1].value : 0;

      return res.status(200).json({ products, count });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getProduct: async (req, res) => {
    try {
      const product = await Products.findById(req.params.id);

      if (!product)
        return res.status(404).json({ message: 'This product does not exist' });

      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  addProduct: async (req, res) => {
    try {
      const newProduct = new Products(req.body);

      await newProduct.save();

      return res.status(200).json({ success: true, product: newProduct });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const product = await Products.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
      );

      if (!product)
        return res.status(404).json({ message: 'This product does not exist' });

      return res.status(200).json({ success: true, product: product });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const product = await Products.findByIdAndDelete(req.params.id);

      if (!product)
        return res.status(404).json({ message: 'This product does not exist' });

      return res
        .status(200)
        .json({ success: true, message: 'Delete successfully' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

export default productController;
