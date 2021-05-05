const express = require("express");

// Importar o controller
const userStudentController = require("./controllers/User_Students");
const academyController = require("./controllers/Academy");

const userStudentValidator = require('./validators/studentUserValidator');

const authMiddleware = require("./middleware/authorization");

const routes = express.Router();

routes.post("/academy", academyController.store);
routes.post("/userAcademy", userStudentValidator.create, userStudentController.store);


routes.use(authMiddleware);

// students routes configuration
routes.get("/userAcademy", userStudentController.index);
routes.get("/userAcademy/:id", userStudentController.find);

// academy routes configuration
routes.get("/academy", academyController.index);


module.exports = routes;
