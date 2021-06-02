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

const connection = new Sequelize(dbConfig);

// INICIANDO OS MODELS
Schedules.init(connection);
Academy.init(connection);
AddressStudent.init(connection);
UserStudent.init(connection);
AddressAcademy.init(connection);
TraningCategory.init(connection);
PersonalTrainer.init(connection);

// INICIANDO OS RELACIONAMENTOS
Schedules.associate(connection.models);
Academy.associate(connection.models);
AddressStudent.associate(connection.models);
UserStudent.associate(connection.models);
AddressAcademy.associate(connection.models);
TraningCategory.associate(connection.models);
PersonalTrainer.associate(connection.models);



