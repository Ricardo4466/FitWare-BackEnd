const express = require("express");


// Importar o controller
const UserStudentController =  require("./controllers/User_Students");
const AcademyController = require("./controllers/Academy");


const routes = express.Router();

routes.post("/UserAcademy", UserStudentController.store);
routes.post("/RegisterAcademy", AcademyController.store);

module.exports = routes;