const Schedule = require("../models/Schedule");
const AdministratorAcademy = require("../models/AdministratorAcademy");
const TraningCategorie = require("../models/TraningCategorie");

module.exports = {
  
  async index(req, res) {
    try {
      const schedule = await Schedule.findAll({});

      if (!schedule)
      return res.status(404).send({ error: "Ops... no momento ainda não há aulas disponiveis" });

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
        attributes: ["hour", "date", "limitPerson", "duration"],
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
    const { hour, date, limit_person, duration, traningCategory } = req.body;

    const { userId } = req;

    console.log(limit_person);


    try {
      let admin = await AdministratorAcademy.findByPk(userId);

      if (!admin)
        return res.status(404).send({ error: "Administrador não encontrado." });

      let schedule = await Schedule.create({
        hour,
        date,
        limit_person,
        duration,
      });

      const traning = await TraningCategorie.findByPk(traningCategory);

      await schedule.addTraningCategory(traning);

      res.status(201).send({
        schedule_id: schedule.id,
        hour: schedule.hour,
        date: schedule.date,
        limit_person: schedule.limit_Person,
        duration: schedule.duration,
        traning_categorie_id:traningCategory
        
      });
    } catch (error) {
      console.log(error);
    }
  },

  async update(req, res) {
    const scheduleId = req.params.id;

    const { administratorId } = req;

    const { hour, date, limitPerson, duration } = req.body;

    try {
      const schedule = await Schedule.findByPk(scheduleId);

      if (!schedule)
        return res.status(404).send({ error: "Ops... Aula inexistente" });

      if (schedule.AdministratorId != administratorId)
        res.status(404).send({ error: " Autorização Negada!" });

      (schedule.hour = hour),
        (schedule.date = date),
        (schedule.limitPerson = limitPerson),
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

    const { administratorId } = req;

    try {
      const schedule = await Schedule.findOne({
        where: {
          id: scheduleId,
          administrator_Id: administratorId,
        },
      });

      if (!schedule)
        res.status(404).send({ error: "Aula não encontrado" });

      await schedule.destroy();
      res.status(204).send({ sucess: "Dados deletados com sucesso!" });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};

// for (let assoc of Object.keys(Schedule.associations)) {
//   for (let accessor of Object.keys(Schedule.associations[assoc].accessors)) {
//     console.log(Schedule.name + '.' + Schedule.associations[assoc].accessors[accessor] + '()');
//   }
// }
