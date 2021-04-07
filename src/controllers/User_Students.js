const User_Student = require("../models/UserStudent");
const AddressStudent = require("../models/StudentUserAddress");

const bcrypt = require("bcrypt");

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
    
    try {
      // const encryptedPassword = bcrypt.hashSync(password);
      
      const student_address = await AddressStudent.create({
        cep,
        street,
        state,
        city,
      });
      
      const user_student = await User_Student.create({
        first_name,
        surname,
        email,
        password,
        weight,
        height,
        cpf,
        birth_date,
        celular,
        image_profile,
      });
      console.log(user_student);
      

      student_address.addUserStudents(student_address);

      res.status(201).send({
        user_student: {
          user_student_id: user_student.id,
          first_name: user_student.first_name,
          surname: user_student.surname,
          email: user_student.email,
          // password: user_student.password,
          weight: user_student.weight,
          height: user_student.height,
          cpf: user_student.cpf,
          birth_date: user_student.birth_date,
          celular: user_student.celular,
          image_profile,
          student_address: student_address
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

// for (let assoc of Object.keys(AddressStudent.associations)) {
//     for (let accessor of Object.keys(AddressStudent.associations[assoc].accessors)) {
//         console.log(AddressStudent.name + '.' + AddressStudent.associations[assoc].accessors[accessor] + '()');
//     }
// }
