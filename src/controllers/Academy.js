const addressAcademy = require("../models/AddressAcademy");
const Academy = require("../models/Academy");

module.exports = {
  index(req, res) {},

  find(req, res) {},

<<<<<<< HEAD
  async store(req, res) {
    const {
      name_academy,
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
      const AddressAcademy = await addressAcademy.create({
        cep,
=======
  store(req, res) {
    const {name, cnpj, telefone, email, password, cep, street, state, city } = req.body;

    try {
      const Address_Academy = AddressAcademy.create({
        cep, 
>>>>>>> 6b12428424b80b2b1165f6cceb91abeb478c3cfb
        street,
        state,
        city,
      });

<<<<<<< HEAD
      const AcademyRegister = await Academy.create({
        name_academy,
        cnpj,
        telefone,
        email,
        password_academy,
=======
      const AcademyRegister = Academy.create({
        name,
        cnpj,
        telefone,
        email,
        password,
>>>>>>> 6b12428424b80b2b1165f6cceb91abeb478c3cfb
      });
      //console.log(AcademyRegister);

      res.status(201).send({
        AcademyRegister: {
          academy_id: AcademyRegister.id,
<<<<<<< HEAD
          name_academy: AcademyRegister.name_academy,
          cnpj: AcademyRegister.cnpj,
          telefone: AcademyRegister.telefone,
          email: AcademyRegister.email,
          password_academy: AcademyRegister.password_academy,
          cep: AddressAcademy.cep,
          street: AddressAcademy.street,
          state: AddressAcademy.state,
          city: AddressAcademy.city,
=======
          name: AcademyRegister.name,
          cnpj: AcademyRegister.cnpj,
          telefone: AcademyRegister.telefone,
          email: AcademyRegister.email,
          password: AcademyRegister.password,
          //Address_Academy: Address_Academy,
>>>>>>> 6b12428424b80b2b1165f6cceb91abeb478c3cfb
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
