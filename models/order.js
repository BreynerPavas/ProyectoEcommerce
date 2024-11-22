'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User,{
        foreignKey:'user_id'
      });
      Order.belongsToMany(models.Product,{
        through:models.PedidoProducto,
        foreignKey:'order_id',
        otherKey:'product_id'
      })
    }
  }
  Order.init({
    fecha: DataTypes.DATE,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};