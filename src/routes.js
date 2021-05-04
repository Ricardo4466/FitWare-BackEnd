const express = require("express");

// Importar o controller
const userStudentController = require("./controllers/User_Students");
const academyController = require("./controllers/Academy");

const userStudentValidator = require('./validators/studentUserValidator');

const authMiddleware = require("./middleware/authorization");

const routes = express.Router();

routes.post("/academy", academyController.store);
routes.post("/userAcademy", userStudentValidator.create, userStudentController.store);
routes.get("/academy", academyController.index);

// routes.use(authMiddleware);

// students routes configuration


// academy routes configuration


module.exports = routes;
