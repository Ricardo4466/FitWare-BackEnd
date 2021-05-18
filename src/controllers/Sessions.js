const UserStudent = require("../models/UserStudent");
const PersonalTrainer = require("../models/PersonalTrainer");
const Administrador = require("../models/AdministratorAcademy");

const bcrypt = require("bcryptjs");

const { generateToken } = require("../utils");

module.exports = {
  async store(req, res) {
    const { email, password } = req.body;

    try {
      let user = await UserStudent.findOne({
        where: {
          email,
        },
        user: perfil= "student"
      });

      if (!user) {
        user = await PersonalTrainer.findOne({
          where: {
            email,
          },
          user: perfil= "PersonalTrainer"
        });

        if (!user) {
          user =  await Administrador.findOne({
            where: {
              email,
            },
            user: perfil= "admin"
          });
        }
      }

      if (user && !bcrypt.compareSync(password, user.password)) {
        return res
          .status(403) 
          .send({ error: "Usuario e/ou senha invalidos" });
      }

      
        const token = generateToken({
          userId: user.id,
          perfil,
          userName: user.name,
        });

        res.status(201).send({
          user: {
            userId: user.id,
            userName: user.name,
            userEmail: user.email,
            image: user.image,
          },
          perfil,
          token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
