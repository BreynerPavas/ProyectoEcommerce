const { Product ,Sequelize, Category,Review,User } = require("../models/index");
const {Op} = Sequelize

const ProductController = {
    async create(req, res) { //Endpoint para crear un Producto
        try {
            const { name_product, price } = req.body;

            // Validacion
            if (!name_product || !price) {
                return res.status(400).send({ message: "Todos los campos son obligatorios: name_product y price." });
            }
          
          const product = await Product.create(req.body);
          await product.addCategory(req.body.categories_id)
          res.status(201).send({ message: "Publicación creada", Product });
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "Ha habido un error", Product });
        }
      },
      async update(req, res) {
        try {
          await Product.update(req.body, {
            where: {
              id: req.params.id,
            },
          });
          res.send({ message: "Product successfully updated" });
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "There was a problem", error });
        }
      },
      async delete(req, res) { 
        try {
          await Product.destroy({
            where: {
              id: req.params.id,
            },
          });
          res.send({ message: `Product with id ${req.params.id} deleted` });
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "There was a problem", error });
        }
      },
      async getAll(req, res) { 
        try {
          const products = await Product.findAll();
          res.status(200).send(products);
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "There was a problem", error });
        }
      },
      async getById(req, res) { 
        try {
          const product = await Product.findByPk(req.params.id);
          res.send(product);
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "Ha habido un error", error });
        }
      },
      async getByName(req,res){
        try {
          const product = await Product.findAll({
            where:{
              name_product:{
                [Op.like]:`%${req.params.name}%`
              }
            }
          })
          res.send(product)
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "Ha habido un error", error });
        }
      },
      async getByPriceAbove(req,res){
        try {
          const product = await Product.findAll({
            where:{
              price:{
                [Op.gte]:req.params.price
              }
            }
          })
          res.send(product)
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "Ha habido un error", error });
        }
      },
      async getByPriceBelow(req,res){
        try {
          const product = await Product.findAll({
            where:{
              price:{
                [Op.lte]:req.params.price
              }
            }
          })
          res.send(product)
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "Ha habido un error", error });
        }
      },
      async getByPriceHigherToLower(req,res){
        try {
            const products = await Product.findAll({
                order:[["price","DESC"]] // ASC en la segunda posicion del array para convertirla a menor a mayor
            });
            res.status(200).send(products);
          } catch (error) {
            console.error(error);
            res.status(500).send({ message: "There was a problem", error });
          }
      },
      async getWithIdCategories(req,res){
        try {
          const product = await Product.findByPk(req.params.id,{
            attributes:["name_product","price"],
            include:{
              model:Category,
              attributes: ["name_category"],
              through: { attributes: [] }
            }
          });
          res.status(201).send({product});
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "There was a problem", error });
        }
      },
      async getCategoriesAndReviews(req,res){
        try {
          const products = await Product.findAll({
            attributes:["name_product","price"],
            include:[{
              model:Category,
              attributes: ["name_category"],
              through: { attributes: [] }
            },{
              model:Review,
              attributes:["title","description"],
              include:{
                model:User,
                attributes: ["name","role"]
              }
            }]
        });
        res.status(200).send(products);
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "There was a problem", error });
        }
      },
      async getByIdCategoriesAndReviews(req,res){
        try {
          const products = await Product.findByPk(req.params.id,{
            attributes:["name_product","price"],
            include:[{
              model:Category,
              attributes: ["name_category"],
              through: { attributes: [] }
            },{
              model:Review,
              attributes:["title","description"],
              include:{
                model:User,
                attributes: ["name","role"]
              }
            }]
        });
        
        res.status(200).send(products);
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "There was a problem", error });
        }
      },
      
}

module.exports = ProductController;