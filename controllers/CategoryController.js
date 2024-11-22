const { Category ,Sequelize,Product } = require("../models/index");
const {Op} = Sequelize
const CategoryController = {
    async create(req, res) { //Endpoint para crear una categoría
        try {
          const category = await Category.create(req.body);
          res.status(201).send({ message: "Publicación creada", Category });
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "Ha habido un error", Category });
        }
      },
      async update(req, res) {//Endpoint para actualizar una categoría
        try {
          await Category.update(req.body, {
            where: {
              id: req.params.id,
            },
          });
          res.send({ message: "Category successfully updated" });
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "There was a problem", error });
        }
      },
      async delete(req, res) { //Endpoint para eliminar una categoria segun su id
        try {
          await Category.destroy({
            where: {
              id: req.params.id,
            },
          });
          res.send({ message: `Category with id ${req.params.id} deleted` });
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "There was a problem", error });
        }
      },
      async getAll(req, res) { //Endpoint para ver todas las categorias
        try {
          const categories = await Category.findAll();
          res.status(200).send(categories);
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "There was a problem", error });
        }
      },
      async getById(req, res) { //Crea un endpoint que devuelva una categoría por id
        try {
          const category = await Category.findByPk(req.params.id);
          res.send(category);
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "Ha habido un error", error });
        }
      },
      async getByName(req,res){
        try {
          const category = await Category.findAll({
            where:{
              name_category:{
                [Op.like]:`%${req.params.name}%`
              }
            }
          })
          res.send(category)
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "Ha habido un error", error });
        }
      },
      async getWithIdAllProducts(req,res){
        try {
          const category = await Category.findByPk(req.params.id,{
            attributes:["name_category","description"],
            include:{
              model:Product,
              attributes: ["name_product"],
              through: { attributes: [] }
            }
          });
          res.status(201).send({category});
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "There was a problem", error });
        }
      }
}
module.exports = CategoryController;