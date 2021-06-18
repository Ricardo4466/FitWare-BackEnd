const UserStudent = require("../models/UserStudent");
const PersonalTrainer = require("../models/PersonalTrainer");
const TraningCategorie = require("../models/TraningCategorie");
const Schedule = require("../models/Schedule")
module.exports = {
  async index(req, res) {


    const { userId } = req;

    console.log(userId)

    try {
      const scheduleOfPersonal = await PersonalTrainer.findByPk(userId, {
        attributes: ["id", "name"],
        include: [
          {
            model: Schedule,
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
