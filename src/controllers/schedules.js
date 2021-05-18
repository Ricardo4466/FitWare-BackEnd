const Schedule = require("../models/Schedules");
const AdministratorAcademy = require("../models/AdministratorAcademy");

module.exports = {
  async index(req, res) {},

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
    const { hour, date, limitPerson, duration } = req.body;

    const { administratorId } = req;

    try {
      let admin = await AdministratorAcademy.findByPk(administratorId);

      if (!admin)
        return res.status(404).send({ error: "Administrador não encontrado." });

      let schedule = await Schedule.createSchedule({
        hour,
        date,
        limitPerson,
        duration,
      });

      res.status(201).send({
        id: schedule.id,
        hour: schedule.hour,
        date: schedule.date,
        limitPerson: schedule.limitPerson,
        duration: schedule.duration,
      });
    } catch (error) {}
  },

  async update(req, res) {
    const scheduleId = req.params.id;

    const { administratorId } = req;

    const { hour, date, limitPerson, duration } = req.body;

    try {
      const schedule = await Schedule.findByPk(scheduleId);

      if (!schedule)
        return res.status(404).send({ error: "Ops... Agenda inexistente" });

      if (schedule.AdministratorId != administratorId)
        res.status(404).send({ error: " Autorização Negada!" });

      (schedule.hour = hour),
        (schedule.date = date),
        (schedule.limitPerson = limitPerson),
        (schedule.duration = duration);

      schedule.save();
      res.status(204).send("Informações de agendamentos atualizadas");
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
        res.status(404).send({ error: "Agendamento não encontrado" });

      await schedule.destroy();
      res.status(204).send({ sucess: "Dados deletados com sucesso!" });
      
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
