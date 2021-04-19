const express = require("express");


// Importar o controller
const UserStudentController =  require("./controllers/User_Students");

const AcademyController = require("./controllers/Academy");


const routes = express.Router();

routes.post("/RegisterAcademy", AcademyController.store);

routes.post("/UserAcademy", UserStudentController.store);


module.exports = routes;