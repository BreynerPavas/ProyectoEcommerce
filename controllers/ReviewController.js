const {Product,Sequelize,Review,User} = require("../models/index");
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
          const review = await Review.create(req.body);
          //chapuza => 
            console.log("asdasd",req.user);
            
            await Review.update(req.user.id,{
              where: {
                id:review.id
              }
            })
          res.status(201).send({ message: "Publicación creada", review });
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "Ha habido un error", review });
        }
      },async getAll_Product(req, res) { 
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
      async getAll_User(req, res) { 
        try {
          const review = await Review.findAll({
            include:{
                model:User,
                
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