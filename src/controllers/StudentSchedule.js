const Schedule = require("../models/Schedule");
const UserStudent = require("../models/UserStudent");

module.exports = {
  find(req, res) {},

  index(req, res) {},

  async store(req, res) {
    const { scheduleId, limit_person } = req;

    const { studentId } = req;

    try {
      let schedule = await Schedule.findByPk(scheduleId);

      if (!schedule)
        return res.status(404).send({ error: "Aula não encontrada" });

      if (limit_person === schedule.limit_person)
        return res.status(404).send({ error: "Ops... Vagas esgotadas" });

       const student = await UserStudent.findByPk(studentId);

      await schedule.addUserStudent(student);

      res.status(201).send({
        schedule_id: schedule.id,
        studentId: studentId
      });


    } catch (error) {}
  },

  update(req, res) {},

  delete(req, res) {},
};

// for (let assoc of Object.keys(Schedule.associations)) {
//   for (let accessor of Object.keys(Schedule.associations[assoc].accessors)) {
//     console.log(Schedule.name + '.' + Schedule.associations[assoc].accessors[accessor] + '()');
//   }
// }