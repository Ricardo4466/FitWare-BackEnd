const addressAcademy = require("../models/AddressAcademy");
const Academy = require("../models/Academy");

module.exports = {
  index(req, res) {},

  find(req, res) {},

  async store(req, res) {
    const {name, cnpj, telefone, email, password_academy, cep, street, state, city } = req.body;

    try {
      const AddressAcademy = AddressAcademy.create({
        cep, 
        street,
        state,
        city,
      });

      const AcademyRegister = await Academy.create({
        name_academy,
        cnpj,
        telefone,
        email,
        password_academy,
      });
      //console.log(AcademyRegister);

      res.status(201).send({
        AcademyRegister: {
          academy_id: AcademyRegister.id,
          name_academy: AcademyRegister.name_academy,
          cnpj: AcademyRegister.cnpj,
          telefone: AcademyRegister.telefone,
          email: AcademyRegister.email,
          password_academy: AcademyRegister.password_academy,
          cep: AddressAcademy.cep,
          street: AddressAcademy.street,
          state: AddressAcademy.state,
          city: AddressAcademy.city,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  update(req, res) {},

  delete(req, res) {},
};
