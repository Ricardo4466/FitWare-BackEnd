const TraningCategorie = require("../models/TraningCategorie");

module.exports = {
  async index(req, res) {
    try {
      const categories = await TraningCategorie.findAll();

      res.send(categories);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};


