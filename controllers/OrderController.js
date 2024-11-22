const { Order,Sequelize,Product,PedidoProducto,User } = require("../models/index");
const {Op} = Sequelize

const OrderController = {
    async create(req, res) {
        try {
          const order = await Order.create(req.body);
         order.addProduct(req.body.product_id)
          res.status(201).send({ message: "Publicación creada", order });
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "Ha habido un error", order });
        }
      },
      async getAll(req, res) { 
        try {
          const order = await Order.findAll();
          res.status(200).send(order);
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "There was a problem", error });
        }
      },
      async getByIdProducts(req,res){
        try {
          const order = await Order.findByPk(req.params.id,{
            attributes:["createdAt"],
            include:[{
              model:User,
              attributes: ["name"]
            },{
              model:Product,
              attributes: ["name_product","price"],
              through: { attributes: [] }
            }]
          });
          res.status(201).send({order });
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "There was a problem", error });
        }
      },
      async getByUser_idProducts(req,res){
        try {
          // const orders = await Order.findAll({
          //     attributes: ["createdAt"], // Atributos de la tabla Order
          //     where: {
          //         user_id: req.user.id // Condición para filtrar por user_id
          //     },
          //     include: [
          //         {
          //             model: Product, // Incluye los productos asociados
          //             attributes: ["name_product", "price"], // Atributos del modelo Product
          //             through: { attributes: [] } // Excluye atributos de la tabla de unión
          //         }
          //     ]
          // });
          console.log(req.user);
          
          const orders = await Order.findAll({
            where:{
              user_id : req.user.id
            },
            include: [
                      {
                          model: Product, // Incluye los productos asociados
                          attributes: ["name_product", "price"], // Atributos del modelo Product
                          through: { attributes: [] } // Excluye atributos de la tabla de unión
                      }
                  ]
          });
          res.status(201).send({ orders });
      } catch (error) {
          console.error(error);
          res.status(500).send({ message: "There was a problem", error });
      }
      }
}
module.exports = OrderController;