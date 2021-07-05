const { Op } = require("sequelize");
const User_Student = require("../models/UserStudent");
const AdministratorAcademy = require("../models/AdministratorAcademy");
const bcrypt = require("bcryptjs");

module.exports = {
  async index(req, res) {
    const { search } = req.query;

    try {
      const userStudent = await User_Student.findAll({
        attributes: [
          "id",
          "first_name",
          "surname",
          "email",
          "image_profile",
          "cpf",
          "celular",
          "birth_date",
          "created_at",
        ],
        include: {
          association: "AddressStudent",
        },
        where: {
          [Op.or]: [
            {
              first_name: {
                [Op.substring]: search,
              },
            },
            {
              surname: {
                [Op.substring]: search,
              },
            },
          ],
        },
      });
      res.send(userStudent);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },

  async find(req, res) {
    const userStudentId = req.params.id;

    try {
      let userStudent = await User_Student.findByPk(userStudentId, {
        attributes: ["id", "first_name", "email", "celular"],
      });

      if (!userStudent)
        return res.status(404).send({ erro: "Usuario não encontrado" });
      res.send(userStudent);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },

  // async store(req, res) {
  //   const {
  //     first_name,
  //     surname,
  //     email,
  //     password,
  //     image_profile,
  //     weight,
  //     height,
  //     cpf,
  //     birth_date,
  //     celular,
  //     cep,
  //     street,
  //     state,
  //     city,
  //     number,
  //     gender,
  //     academy,
  //     contact_type,
  //   } = req.body;

  //   try {
  //     let user = await User_Student.findOne({
  //       where: {
  //         cpf,
  //       },
  //     });

  //     if (user)
  //       return res
  //         .status(401)
  //         .send({ error: "Ops... Esse CPF ja esta cadastrado!" });

  //     const encryptedPassword = bcrypt.hashSync(password);

  //     const userStudent = await User_Student.create({
  //       first_name,
  //       surname,
  //       email,
  //       password: encryptedPassword,
  //       weight,
  //       height,
  //       cpf,
  //       birth_date,
  //       celular,
  //       gender,
  //       contact_type,
  //       academy
  //     });

  //     await userStudent.addAdministratorAcademy(academy);

  //     await userStudent.createAddressStudent({
  //       cep,
  //       street,
  //       state,
  //       city,
  //       number,
  //     });

  //     res.status(201).send({
  //       user_student: {
  //         first_name: userStudent.first_name,
  //         user_student_id: userStudent.id,
  //         surname: userStudent.surname,
  //         birth_date: userStudent.birth_date,
  //         email: userStudent.email,
  //         weight: userStudent.weight,
  //         height: userStudent.height,
  //         cpf: userStudent.cpf,
  //         celular: userStudent.celular,
  //         gender: userStudent.gender,
  //         contact_type: userStudent.contact_type,
  //       },
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).send(error);
  //   }
  // },



  async store(req, res) {
    
    const {
      first_name,
      surname,
      email,
      password,
      image_profile,
      weight,
      height,
      cpf,
      birth_date,
      celular,
      cep,
      street,
      state,
      city,
      
    } = req.body;

    const {userId} = req;
    console.log("store -> user_id", userid)

    try {
      let user = await User_Student.findOne({
        where: {
          cpf,
        },
      });

      if (user)
        return res
          .status(401)
          .send({ error: "Ops... Esse CPF ja esta cadastrado!" });

      const encryptedPassword = bcrypt.hashSync(password);

      const userStudent = await User_Student.create({
        first_name,
        surname,
        email,
        password: encryptedPassword,
        weight,
        height,
        cpf,
        birth_date,
        celular,
      });

      await userStudent.addAdministratorAcademies(academy)

      userStudent.createAddressStudent({
        cep,
        street,
        state,
        city,
      });

      res.status(201).send({
        user_student: {
          first_name: userStudent.first_name,
          user_student_id: userStudent.id,
          surname: userStudent.surname,
          birth_date: userStudent.birth_date,
          email: userStudent.email,
          weight: userStudent.weight,
          height: userStudent.height,
          cpf: userStudent.cpf,
          celular: userStudent.celular,
          academy: userStudent.academy
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },





  

  async delete(req, res) {
    const user_student_id = req.params.id;

    try {
      let student = await User_Student.findByPk(user_student_id);

      if (!student)
        return res.status(404).send({ error: "Aluno não encontrado" });

      await student.destroy();

      return res.status(200).send({ succes: "Registro deletado com sucesso" });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  async update(req, res) {
    const user_student_id = req.params.id;

    let student = await User_Student.findByPk(user_student_id);

    const {
      first_name,
      surname,
      email,
      weight,
      height,
      celular,
      password,
      cep,
      street,
      state,
      city,
      number,
    } = req.body;

    try {
      if (!student) res.status(404).send({ error: "Aluno não encontrado" });

      student.first_name = first_name;
      student.password = password;
      student.surname = surname;
      student.celular = celular;
      student.height = height;
      student.email = email;
      student.weight = weight;

      // Atualizando tambem a tabela de endereço
      const address = await student.getAddressStudent();

      address.street = street;
      address.state = state;
      address.city = city;
      address.cep = cep;
      address.number = number;

      student.save();
      address.save();

      res.status(204).send();
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};

// for (let assoc of Object.keys(AdministratorAcademy.associations)) {
//   for (let accessor of Object.keys(
//     AdministratorAcademy.associations[assoc].accessors
//   )) {
//     console.log(
//       AdministratorAcademy.name +
//         "." +
//         User_StuAdministratorAcademydent.associations[assoc].accessors[accessor] +
//         "()"
//     );
//   }
// }
