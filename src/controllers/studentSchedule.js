const Schedule = require("../models/Schedule");
const UserStudent = require("../models/UserStudent");

module.exports = {
  async index(req, res) {
    const { scheduleId } = req.params;

    try {
      const scheduleStudent = await Schedule.findByPk(scheduleId, {
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

  async find(req, res) {
    const { userId } = req;
    const { userPerfil } = req;

    try {
      if (userPerfil !== "student") {
        return res.status(401).send({ error: "Acesso negado" });
      }

      const scheduleOfStudent = await UserStudent.findByPk(userId, {
        include: {
          association: "Schedules",
          attributes: [
            "id",
            "hour",
            "date",
            "limit_person",
            "duration",
            "is_remote",
            "link",
          ],
          through: { attributes: [] },
        },
      });

      res.send(scheduleOfStudent);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },

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

      if (count >= schedule.limit_person)
        return res.status(400).send({ error: "Ops... Vagas Esgotadas" });

      const student = await UserStudent.findByPk(userId);

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
