const PersonalTrainer = require("../models/PersonalTrainer");

const bcrypt = require("bcryptjs");
module.exports = {
  async index(req, res) {
    try {
      const personal = await PersonalTrainer.findAll();

      res.send(personal);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },

  async find(req, res) {
    const personal_id = req.params.id;

    try {
      let personal = await PersonalTrainer.findByPk(personal_id, {
        attributes: ["id", "name", "email", "specialty"],
      });

      if (!personal)
        return res
          .status(404)
          .send({ erro: "Personal Trainer não encontrado" });
      res.send(personal);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },

  async store(req, res) {
    const { name, specialty, email, password } = req.body;

    let userPersonal = await PersonalTrainer.findOne({
      where: {
        email,
      },
    });

    if (userPersonal)
      return res
        .status(400)
        .send({ error: "Ops... Email ja cadastrado no sistema." });

    const encryptedPassword = bcrypt.hashSync(password);

    try {
      const PersonalRegister = await PersonalTrainer.create({
        name,
        specialty,
        email,
        password: encryptedPassword,
      });

      res.status(201).send({
        personal: {
          personal_id: PersonalRegister.id,
          name: PersonalRegister.name,
          specialty: PersonalRegister.specialty,
          email: PersonalRegister.email,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  async update(req, res) {
    const personal_id = req.params.id;
    let personal = await PersonalTrainer.findByPk(personal_id);

    const { name, specialty, email, password } = req.body;

    try {
      if (!personal) res.status(404).send({ error: "Aluno não encontrado" });

      personal.name = name;
      personal.specialty = specialty;
      personal.email = email;
      personal.password = password;

      personal.save();

      res.status(204).send();
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  async delete(req, res) {
    const personal_id = req.params.id;

    try {
      let personal = await PersonalTrainer.findByPk(personal_id);

      if (!personal)
        return res
          .status(404)
          .send({ error: "Personal treiner não encontrado" });

      await personal.destroy();

      return res.status(200).send({ succes: "Registro deletado com sucesso" });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
