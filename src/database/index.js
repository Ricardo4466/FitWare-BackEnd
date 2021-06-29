const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

// IMPORTANDO OS MODELS

const Schedules = require("../models/Schedule");
const Academy = require("../models/AdministratorAcademy");
const AddressStudent = require("../models/AddressStudent");
const UserStudent = require("../models/UserStudent");
const AddressAcademy = require("../models/AddressAcademy");
const TraningCategory = require("../models/TraningCategorie");
const PersonalTrainer = require("../models/PersonalTrainer");
const ContactType = require("../models/ContactType");

const connection = new Sequelize(dbConfig.url, dbConfig.config);


// INICIANDO OS MODELS
Schedules.init(connection);
Academy.init(connection);
AddressStudent.init(connection);
UserStudent.init(connection);
AddressAcademy.init(connection);
TraningCategory.init(connection);
PersonalTrainer.init(connection);
ContactType.init(connection);
Gender.init(connection)

// INICIANDO OS RELACIONAMENTOS
Schedules.associate(connection.models);
Academy.associate(connection.models);
AddressStudent.associate(connection.models);
UserStudent.associate(connection.models);
AddressAcademy.associate(connection.models);
TraningCategory.associate(connection.models);
PersonalTrainer.associate(connection.models);
ContactType.associate(connection.models);
Gender.associate(connection.models)

module.exports = connection;


// for (let assoc of Object.keys(Schedule.associations)) {
//   for (let accessor of Object.keys(Schedule.associations[assoc].accessors)) {
//     console.log(Schedule.name + '.' + Schedule.associations[assoc].accessors[accessor] + '()');
//   }
// }