'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Review,{
        foreignKey:'product_id'
      }),
      Product.belongsToMany(models.Order,{
        through:models.PedidoProducto,
        foreignKey: 'product_id',
        otherKey:'order_id'
      }),
      Product.belongsToMany(models.Category,{
        through:models.ProductoCategoria,
        foreignKey:"product_id",
        otherKey:"category_id"
      })
    }
  }
  Product.init({
    name_product: DataTypes.STRING,
    price: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};