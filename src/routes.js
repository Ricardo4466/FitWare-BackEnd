const express = require("express");


// Importar o controller
const UserStudentController =  require("./controllers/User_Students");



const routes = express.Router();

routes.post("/UserAcademy", UserStudentController.store);


module.exports = routes;