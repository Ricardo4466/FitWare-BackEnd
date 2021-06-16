const UserStudent = require("../models/UserStudent");
const PersonalTrainer = require("../models/PersonalTrainer");
const TraningCategorie = require("../models/TraningCategorie");

module.exports = {
  async index(req, res) {
    try {
      const scheduleOfPersonal = await PersonalTrainer.findByPk({
        attributes: ["id", "name"],
        include: [
          {
            association: "Schedule",
            attributes: [
              "id",
              "hour",
              "date",
              "limit_person",
              "duration",
              "is_remote",
            ],
          },
          {
            model: UserStudent,
            attributes: ["id", "name"],
          },
          {
            attributes: ["id", "description"],
            model: TraningCategorie,
            through: { attributes: [] },
          },
        ],
      });

      res.send(scheduleOfPersonal);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },
};
