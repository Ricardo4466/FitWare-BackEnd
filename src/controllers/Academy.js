const Academy = require("../models/AdministratorAcademy");
const bcrypt = require("bcryptjs");

module.exports = {
  async index(req, res) {
    try {
      const academy = await Academy.findAll({
        include: {
          association: "AddressAcademy",
        },
      });

      res.send(academy);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },

  async find(req, res) {
    const academy_id = req.params.id;

    try {
      let academy = await Academy.findByPk(academy_id, {
        attributes: ["id", "name", "email", "telefone"],
      });

      //const address = await academy.getAddressStudent();

      if (!academy)
        return res.status(404).send({ erro: "Academia não encontrada" });
      res.send(academy);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },

  async store(req, res) {
    const { name, cnpj, telefone, email, password, cep, street, state, city } =
      req.body;

    try {
      let userAdmin = await Academy.findOne({
        where: {
          email,
        },
      });

      if (userAdmin)
        return res
          .status(401)
          .send({ error: "Ops... Email ja cadastrado no sistema." });

      const encryptedPassword = bcrypt.hashSync(password);

      const AcademyRegister = await Academy.create({
        name,
        cnpj,
        telefone,
        email,
        password: encryptedPassword,
      });
      //console.log(AcademyRegister);

      AcademyRegister.createAddressAcademy({
        cep,
        street,
        state,
        city,
      });

      res.status(201).send({
        AcademyRegister: {
          academy_id: AcademyRegister.id,
          name: AcademyRegister.name,
          cnpj: AcademyRegister.cnpj,
          telefone: AcademyRegister.telefone,
          email: AcademyRegister.email,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  async update(req, res) {
    const academy_id = req.params.id;
    let academy = await Academy.findByPk(academy_id);

    const {
      name,
      cnpj,
      telefone,
      email,
      password_academy,
      cep,
      street,
      state,
      city,
    } = req.body;

    try {
      if (!academy) res.status(404).send({ error: "Academia não encontrada" });

      academy.password_academy = password_academy;
      academy.telefone = telefone;
      academy.email = email;
      academy.name = name;
      academy.cnpj = cnpj;

      const address = await academy.getAddressAcademy();
      address.street = street;
      address.state = state;
      address.city = city;
      address.cep = cep;

      academy.save();
      address.save();

      res.status(204).send();
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  async delete(req, res) {
    const academy_id = req.params.id;

    try {
      let academy = await Academy.findByPk(academy_id);

      if (!academy)
        return res.status(404).send({ error: "Academia não encontrada" });

      await academy.destroy();

      return res.status(200).send({ succes: "Registro deletado com sucesso" });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
