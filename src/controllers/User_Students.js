const User_Student = require("../models/UserStudent");

const bcrypt = require("bcryptjs");

module.exports = {
  async index(req, res) {
    try {
      const userStudent = await User_Student.findAll({
        include: {
          association: "AddressStudent",
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

    try {
      if (first_name === "")
        return res.status(400).send({
          error:
            "Não é possivel efetuar o cadastro sem que primeiro nome não esteja preenchido!",
        });

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
    } = req.body;

    try {
      if (!student) res.status(404).send({ error: "Aluno não encontrado" });

      student.first_name = first_name;
      student.password = password;
      student.surname = surname;
      student.celular = celular;
      student.weight = weight;
      student.height = height;
      student.email = email;

      // Atualizando tambem a tabela de endereço
      const address = await student.getAddressStudent();
      address.street = street;
      address.state = state;
      address.city = city;
      address.cep = cep;

      student.save();
      address.save();

      res.status(204).send();
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};

// for (let assoc of Object.keys(User_Student.associations)) {
//   for (let accessor of Object.keys(User_Student.associations[assoc].accessors)) {
//     console.log(User_Student.name + '.' + User_Student.associations[assoc].accessors[accessor] + '()');
//   }
// }
