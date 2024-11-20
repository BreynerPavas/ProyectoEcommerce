const {Product,Sequelize,Review} = require("../models/index");
const {Op} = Sequelize;


const ReviewController = {
    async getAll(req, res) { //Endpoint para ver todas las categorias
        try {
          const review = await Review.findAll();
          res.status(200).send(review);
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "There was a problem", error });
        }
      },
      async create(req, res) { //Endpoint para crear un Producto
        try {
          const product = await Review.create(req.body);
          res.status(201).send({ message: "Publicación creada", product });
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "Ha habido un error", product });
        }
      },async getAll_User(req, res) { //Endpoint para ver todas las categorias
        try {
          const review = await Review.findAll({
            include:{
                model:Product,
                
            }
          });
          res.status(200).send(review);
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "There was a problem", error });
        }
      },
      
}
module.exports = ReviewController;