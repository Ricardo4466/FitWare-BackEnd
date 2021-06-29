const express = require("express");
const authMiddleware = require("./middleware/authorization");

// Importar o controller
const academyController = require("./controllers/Academy");
const sessionController = require("./controllers/Sessions");
const scheduleController = require("./controllers/Schedules");
const userStudentController = require("./controllers/User_Students");
const personalTrainerController = require("./controllers/Personal_trainer");
const traningCategoriesController = require("./controllers/TraningCategories");
const studentScheduleController = require("./controllers/StudentSchedule");
const ScheduleOfPersonal = require("./controllers/SchedulesOfPersonal");

//Importa os validators
const scheduleValidator = require("./validators/scheduleValidator");
const userStudentValidator = require("./validators/studentUserValidator");
const administratorValidator = require("./validators/administratorUserValidator");
const userPersonalTrainerValidator = require("./validators/personalUserValidator");

const routes = express.Router();

routes.post("/sessions", sessionController.store);
routes.post("/academy", administratorValidator.create, academyController.store);
routes.post("/userAcademy", userStudentController.store);
routes.get("/userAcademy", userStudentController.index);

// TOKEN routes configuration
routes.use(authMiddleware);

// students routes configuration
routes.get("/userAcademy/:id", userStudentController.find);
routes.delete("/userAcademy/:id", userStudentController.delete);
routes.put(
  "/userAcademy/:id",
  userStudentValidator.create,
  userStudentController.update
);

// academy routes configuration
routes.get("/academy", academyController.index);
routes.get("/academy/:id", academyController.find);
routes.put("/academy/:id", academyController.update);
routes.delete("/academy/:id", academyController.delete);

// personal Trainer routes configuration

routes.post(
  "/personalTrainer",
  userPersonalTrainerValidator.create,
  personalTrainerController.store
);
routes.get("/personalTrainer", personalTrainerController.index);
routes.get("/personalTrainer/:id", personalTrainerController.find);
routes.delete("/personalTrainer/:id", personalTrainerController.delete);
routes.put(
  "/personalTrainer/:id",
  userPersonalTrainerValidator.create,
  personalTrainerController.update
);

// schedules routes configuration
routes.get("/schedule/:id", scheduleController.find);
routes.get("/schedule", scheduleController.index);

routes.delete("/schedule/:id", scheduleController.delete);
routes.put("/scheduled/:id", scheduleController.update);
routes.post("/academy/:id/schedule", scheduleController.store);

// traning categories routes configuration
routes.get("/traningCategories", traningCategoriesController.index);

// Schedules of student routes configuration
routes.post("/schedule/:scheduleId/student", studentScheduleController.store);
routes.get("/student/schedules", studentScheduleController.find);
routes.get("/schedule/:scheduleId/student", studentScheduleController.index);


// Schedules of Personal routes configuration
routes.get("/schedules", ScheduleOfPersonal.index);

module.exports = routes;
