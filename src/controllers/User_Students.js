const User_Student = require("../models/UserStudent");

const bcrypt = require("bcryptjs");

module.exports = {
  index(req, res) {},

  find(req, res) {},

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

    const { studentId } = req;

    try {
      // const encryptedPassword = bcrypt.hashSync(password);

      if (first_name === "")
        return res
          .status(400)
          .send({
            error:
              "Não é possivel efetuar o cadastro sem que primeiro nome não esteja preenchido!",
          });

          const encryptedPassword = bcrypt.hashSync(password)

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
          user_student_id: userStudent.id,
          first_name: userStudent.first_name,
          surname: userStudent.surname,
          email: userStudent.email,
          weight: userStudent.weight,
          height: userStudent.height,
          cpf: userStudent.cpf,
          birth_date: userStudent.birth_date,
          celular: userStudent.celular,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  delete(req, res) {},

  update(req, res) {},
};

// for (let assoc of Object.keys(User_Student.associations)) {
//     for (let accessor of Object.keys(User_Student.associations[assoc].accessors)) {
//         console.log(User_Student.name + '.' + User_Student.associations[assoc].accessors[accessor] + '()');
//     }
// }
