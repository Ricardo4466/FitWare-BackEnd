const express = require("express");
const authMiddleware = require("./middleware/authorization");

// Importar o controller
const academyController = require("./controllers/Academy");
const sessionController = require("./controllers/sessions");
const userStudentController = require("./controllers/User_Students");
const PersonalTrainerController = require("./controllers/Personal_trainer");

//Importa os validators
const userStudentValidator = require("./validators/studentUserValidator");
const userPersonalTrainerValidator = require("./validators/personalUserValidator");


const routes = express.Router();

routes.post("/sessions", sessionController.store);
routes.post("/academy", academyController.store);
routes.post("/academy/:id/userAcademy", userStudentValidator.create, userStudentController.store);
routes.post("/personalTrainer", userPersonalTrainerValidator.create, PersonalTrainerController.store);

routes.use(authMiddleware);

// students routes configuration
routes.get("/userAcademy", userStudentController.index);
routes.get("/userAcademy/:id", userStudentController.find);
routes.delete("/userAcademy/:id", userStudentController.delete);
routes.put("/userAcademy/:id", userStudentValidator.create, userStudentController.update);

// academy routes configuration
routes.get("/academy", academyController.index);
routes.get("/academy/:id", academyController.find);
routes.put("/academy/:id", academyController.update);
routes.delete("/academy/:id", academyController.delete);

// personal Trainer routes configuration
routes.get("/personalTrainer", PersonalTrainerController.index);
routes.get("/personalTrainer/:id", PersonalTrainerController.find);
routes.delete("/personalTrainer/:id", PersonalTrainerController.delete);
routes.put("/personalTrainer/:id", userPersonalTrainerValidator.create, PersonalTrainerController.update);

module.exports = routes;
