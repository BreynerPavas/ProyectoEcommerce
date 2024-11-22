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
      }
}
module.exports = OrderController;