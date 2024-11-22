const { Product, Sequelize, Review, User } = require("../models/index");
const { Op } = Sequelize;

const ReviewController = {
  async getAll(req, res) {
    //Endpoint para ver todas las categorias
    try {
      const review = await Review.findAll();
      res.status(200).send(review);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "There was a problem", error });
    }
  },
  async create(req, res) {
    try {
      //chapuza =>
      req.body.user_id = req.user.id;

      const review = await Review.create(req.body);

      res.status(201).send({ message: "Publicación creada", review });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Ha habido un error", review });
    }
  },
  async getAll_Product(req, res) {
    try {
      const review = await Review.findAll({
        include: {
          model: Product,
        },
      });
      res.status(200).send(review);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "There was a problem", error });
    }
  },
  async getAll_User(req, res) {
    try {
      const review = await Review.findAll({
        include: {
          model: User,
        },
      });
      res.status(200).send(review);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "There was a problem", error });
    }
  },
  async getByProduct(req, res) {
    try {
      const review = await Review.findAll({
        include: {
          model: Product,
          where: {
            id: req.params.id,
          },
          attributes: ["name_product"],
        },
      });
      res.status(200).send(review);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "There was a problem", error });
    }
  },
  async getByUser(req,res) {
    try {
      const review = await Review.findAll({
        include: {
          model: User,
          where: {
            id: req.params.id,
          },
          attributes: ["name"],
        },
      });
      res.status(200).send(review);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "There was a problem", error });
    }
  },
};
module.exports = ReviewController;
