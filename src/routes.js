const express = require("express");

// Importar o controller
const UserStudentController = require("./controllers/User_Students");
const AcademyController = require("./controllers/Academy");

const userStudentValidator = require('./validators/studentUserValidator');

const authMiddleware = require("./middleware/authorization");

const routes = express.Router();

routes.post("/RegisterAcademy", AcademyController.store);
routes.post("/UserAcademy", userStudentValidator.create, UserStudentController.store);

routes.use(authMiddleware);

// students routes configuration

module.exports = routes;
