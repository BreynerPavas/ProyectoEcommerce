const { User, Token, Sequelize,Review } = require("../models/index"); //importar modelo
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/config.json')['development']
const {Op}= Sequelize

const UserController = {
  async create(req, res) {
    try {
      // console.log(req.body)
      const { name, email,password } = req.body;

            // Validacion
            if (!name || !email || !password) {
                return res.status(400).send({ message: "Todos los campos son obligatorios" });
            }
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const user = await User.create(req.body);
      res.status(201).send({ message: "Usuario creado", user });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "There was a problem", error });
    }
  },
  async getAll(req, res) {
    try {
      const users = await User.findAll();
      res.status(200).send(users);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "There was a problem", error });
    }
  },
  async delete(req, res) {
    try {
      //eliminar las publicaciones del usuario
      await Review.destroy({
        where: {
          user_id: req.params.id,
        },
      });
      //eliminar el usuario
      await User.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.send({ message: `User with id ${req.params.id} deleted` });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "There was a problem", error });
    }
  },
  async update(req, res) {
    try {
      await User.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.send({ message: "User successfully updated" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "There was a problem", error });
    }
  },
  async login(req, res) {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      return res.status(400).send({ message: "Incorrect email or password" });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    // const isMatch = await bcrypt.compare("quieromuchoamitia","$10$wzRkyjrV30ay3tgFr.k/6OJ8VhZdBhKTf9t/tIfU0MYhktoTzgK6G")
    if (!isMatch) {
        return res.status(400).send({message: "Incorrect email or password"})
    }
    let token = jwt.sign({id:user.id},jwt_secret)//he creado el Token
    await Token.create({token,user_id:user.id}) //guardar Token en la tabla Tokens
    res.send({token,message:"Successfully logged",user})
  },
  async logout(req, res) {
    try {
        await Token.destroy({
            where: {
                [Op.and]: [
                    { user_id: req.user.id },
                    { token: req.headers.authorization }
                ]
            }
        });
        res.send({ message: 'Desconectado con éxito' })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'hubo un problema al tratar de desconectarte' })
    }
}
};

module.exports = UserController;
