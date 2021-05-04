
const Academy = require("../models/Academy");

module.exports = {
   async index(req, res) {

    try {
      const academy = await Academy.findAll();

      res.send(academy);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
    
  },

  find(req, res) {},

  async store(req, res) {
    const {name, cnpj, telefone, email, password_academy, cep, street, state, city } = req.body;

    try {
      
      const AcademyRegister = await Academy.create({
        name,
        cnpj,
        telefone,
        email,
        password_academy,
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
          password_academy: AcademyRegister.password_academy,
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
