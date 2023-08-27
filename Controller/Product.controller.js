const { Product } = require("../Model/Product.model");
const { Image } = require("../Model/Image.model");
const { User } = require("../Model/user.model")

const ProductController = {
  async getProducts(req, res) {
    try {
      const products = await Product.findAll({
        include: [
          { model: Image },
        ]
      });

      return res.status(200).json(products);
    } catch (err) {
      return res.status(500).json({ msg: "Server error", err: err.message });
    }
  },

  async addProduct(req, res) {
    const { name, SKU, images } = req.body;
    const userId=req.user.id

    try {
      const product = await Product.create({ name, SKU, user_id:userId });

      const imagePromises = images.map(async (url) => {
        return await Image.create({ url, product_id: product.id });
      });
  
      const addedImages = await Promise.all(imagePromises);

      return res
        .status(201)
        .json({ msg: "Product added successfully", product, images: addedImages });
    } catch (err) {
      return res.status(500).json({ msg: "Server error", err: err.message });
    }
  },

  async getProductById(req, res) {
    const productId = req.params.productId;

    try {
      const product = await Product.findOne({
        where: { id: productId },
        include: [
          { model: Image },
          {
            model: User,
            as: "user",
            attributes: ["id", "name"], // Include only desired user fields
          },
        ],
      });

      if (!product) {
        return res.status(404).json({ msg: "Product not found" });
      }

      return res.status(200).json(product);
    } catch (err) {
      return res.status(500).json({ msg: "Server error", err: err.message });
    }
  },

  async deleteProductById(req, res) {
    const productId = req.params.productId;

    try {
      // Find the product by ID
      const product = await Product.findByPk(productId);

      if (!product) {
        return res.status(404).json({ msg: "Product not found" });
      }

      // Delete associated images (optional)
      await Image.destroy({ where: { product_id: productId } });

      // Delete the product
      await product.destroy();

      return res.status(200).json({ msg: "Product deleted successfully" });
    } catch (err) {
      return res.status(500).json({ msg: "Server error", err: err.message });
    }
  },

}

module.exports = ProductController;
