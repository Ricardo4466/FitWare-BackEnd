const Schedule = require("../models/Schedule");
const UserStudent = require("../models/UserStudent");

module.exports = {
  async index(req, res) {
    try {
      const scheduleStudent = await Schedule.findAll({
        attributes: ["id", "date", "hour", "limit_person", "duration"],
        include: {
          association: "UserStudents",
          attributes: ["id", "first_name", "surname", "image_profile"],
          through: { attributes: [] },
        },
      });

      res.send(scheduleStudent);
    } catch (error) {
      console.log(error);
    }
  },

  find(req, res) {},

  async store(req, res) {
    const { scheduleId } = req.params;
    const { userId } = req;

    try {
      let schedule = await Schedule.findByPk(scheduleId);

      if (!schedule)
        return res.status(404).send({ error: "Aula não encontrada" });

      const count = await Schedule.count({
        include: [
          {
            association: "UserStudents",
            required: true,
          },
        ],
        where: {
          id: scheduleId,
        },
      });

      // return console.log(count);

      if (count >= schedule.limit_person)
        return res.status(400).send({ error: "Ops... Vagas Esgotadas" });

      const student = await UserStudent.findByPk(userId);

      // console.log(userId);

      await schedule.addUserStudent(student);

      res.status(201).send({
        schedule_id: schedule.id,
        userId: userId,
      });
    } catch (e) {
      console.log(e);
    }
  },

  update(req, res) {},

  delete(req, res) {},
};

// for (let assoc of Object.keys(Schedule.associations)) {
//   for (let accessor of Object.keys(Schedule.associations[assoc].accessors)) {
//     console.log(Schedule.name + '.' + Schedule.associations[assoc].accessors[accessor] + '()');
//   }
// }
