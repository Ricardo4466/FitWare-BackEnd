const Schedule = require("../models/Schedule");
const AdministratorAcademy = require("../models/AdministratorAcademy");
const TraningCategorie = require("../models/TraningCategorie");
const PersonalTrainer = require("../models/PersonalTrainer")

module.exports = {
  async index(req, res) {
    try {
      const schedule = await Schedule.findAll({
        attributes: [
          "id",
          "hour",
          "date",
          "limit_person",
          "duration",
          "is_remote",
        ],
        include: [{
          model: TraningCategorie,
          attributes: ["id", "description"],
          through: { attributes: [] },
        }, {
          model: PersonalTrainer,
          attributes:["name"]

        }],
      });

      if (!schedule)
        return res
          .status(404)
          .send({ error: "Ops... no momento ainda não há aulas disponiveis" });

      res.send(schedule);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },

  async find(req, res) {
    const scheduleId = req.params.id;

    try {
      let schedule = await Schedule.findByPk(scheduleId, {
        attributes: [
          "id",
          "hour",
          "date",
          "limit_person",
          "duration",
          "is_remote",
        ],
        include: [{
          attributes: ["id", "description"],
          model: TraningCategorie,
          through: { attributes: [] },
        }, {
          model: PersonalTrainer,
          attributes:["name"]

        }],
      });

      if (!schedule)
        return res.status(404).send({ error: "Ops... Agenda inexistente" });
      res.send(schedule);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },

  async store(req, res) {
    const {
      personal_id,
      hour,
      date,
      limit_person,
      duration,
      traningCategory,
      is_remote,
      link,
    } = req.body;

    const { userPerfil } = req;
    const { id } = req.params;

    if (userPerfil !== "admin" && userPerfil !== "PersonalTrainer") {
      return res.status(401).send({ erro: "Acesso negado" });
    }



    try {
      //pegar a academia pelo id
      const academy = await AdministratorAcademy.findByPk(id);

      //verificar se ela existe
      if (!academy)
        return res
          .status(404)
          .send({ error: "Academia inexistente para a criação da aula" });

      //pensar em validar isso depois
      //verificar se o usuário do token pode incluir aulas para essa academia

      //adiciona um schedule para a academia
      const schedule = await academy.createSchedule({
        hour,
        date,
        duration,
        limit_person,
        is_remote,
        link,
        personal_id
      });

      await schedule.addTraningCategories(traningCategory);

      // await schedule.setPersonalTrainer(personal_id);

      const listCategories = await schedule.getTraningCategories({
        attributes: ["id", "description"],
        includeIgnoreAttributes: false,
      });

      const listSchedulePersonal = await schedule.getPersonalTrainer({
        attributes: ["id", "name"],
      })

      res.status(201).send({
        schedule_id: schedule.id,
        hour: schedule.hour,
        date: schedule.date,
        limit_person: schedule.limit_Person,
        duration: schedule.duration,
        is_remote,
        link,
        traning_categories: listCategories,
        userPerfil: userPerfil,
        personal_id: listSchedulePersonal,
      });
    } catch (error) {
      console.log(error);
    }
  },

  async update(req, res) {
    const scheduleId = req.params.id;

    const { userPerfil } = req;

    const { hour, date, limit_person, duration } = req.body;

    try {
      const schedule = await Schedule.findByPk(scheduleId);

      if (!schedule)
        return res.status(404).send({ error: "Ops... Aula inexistente" });

      if (userPerfil !== "admin" && userPerfil !== "PersonalTrainer") {
        return res.status(401).send({ error: "Acesso negado" });
      }

      (schedule.hour = hour),
        (schedule.date = date),
        (schedule.limit_person = limit_person),
        (schedule.duration = duration);

      schedule.save();
      res.status(204).send("Informações da aula atualizadas");
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  async delete(req, res) {
    const scheduleId = req.params.id;

    const { userPerfil } = req;

    try {
      const schedule = await Schedule.findOne({
        where: {
          id: scheduleId,
          administrator_Id: userPerfil,
        },
      });

      if (!schedule) res.status(404).send({ error: "Aula não encontrado" });

      if (userPerfil !== "admin" && userPerfil !== "PersonalTrainer") {
        return res.status(401).send({ error: "Acesso negado!" });
      }

      await schedule.destroy();

      res.status(204).send({ sucess: "Dados deletados com sucesso!" });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};

// for (let assoc of Object.keys(Schedule.associations)) {
//   for (let accessor of Object.keys(
//     Schedule.associations[assoc].accessors
//   )) {
//     console.log(
//       Schedule.name +
//         "." +
//         Schedule.associations[assoc].accessors[accessor] +
//         "()"
//     );
//   }
// }
