const express = require("express");
const authMiddleware = require("./middleware/authorization");

// Importar o controller
const academyController = require("./controllers/Academy");
const sessionController = require("./controllers/sessions");
const userStudentController = require("./controllers/User_Students");
const PersonalTrainerController = require("./controllers/Personal_trainer");
const scheduleController = require("./controllers/schedules")

//Importa os validators
const scheduleValidator = require("./validators/scheduleValidator");
const userStudentValidator = require("./validators/studentUserValidator");
const administratorValidator = require("./validators/administratorUserValidator");
const userPersonalTrainerValidator = require("./validators/personalUserValidator");

const routes = express.Router();

routes.post("/sessions", sessionController.store);
routes.post("/academy", administratorValidator.create, academyController.store);
routes.post("/userAcademy", userStudentValidator.create, userStudentController.store);
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

// schedules routes configuration

routes.post("/schedule", scheduleController.find);
routes.post("/schedule/:id", scheduleController.index);
routes.post("/schedule/:id", scheduleController.delete);
routes.post("/scheduled/:id", scheduleController.update);
routes.post("/schedule", scheduleValidator.create, scheduleController.store);

module.exports = routes;
