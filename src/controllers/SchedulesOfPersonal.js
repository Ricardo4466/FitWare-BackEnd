const UserStudent = require("../models/UserStudent");
const PersonalTrainer = require("../models/PersonalTrainer");
const TraningCategorie = require("../models/TraningCategorie");
const Schedule = require("../models/Schedule");
module.exports = {
  async index(req, res) {
    const { userId } = req;
    const { userPerfil } = req;

    try {
      
      if (userPerfil !== "PersonalTrainer") {
        return res.status(401).send({ error: "Acesso negado" });
      }

      const scheduleOfPersonal = await PersonalTrainer.findByPk(userId, {
        attributes: ["id", "name"],
        include: [
          {
            association: "Schedules",
            attributes: [
              "id",
              "hour",
              "date",
              "limit_person",
              "duration",
              "is_remote",
            ],
            include: [
              {
                model: UserStudent,
                attributes: ["id", "first_name"],
                through: { attributes: [] },
              },
              {
                model: TraningCategorie,
                attributes: ["id", "description"],
                through: { attributes: [] },
              },
            ],
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
