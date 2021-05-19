const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

// IMPORTANDO OS MODELS
const Schedules = require("../models/Schedule");
const UserStudent = require("../models/UserStudent");
const Administrator = require("../models/Administrator");
const Academy = require("../models/AdministratorAcademy");
const AddressStudent = require("../models/AddressStudent");
const AddressAcademy = require("../models/AddressAcademy");
const PersonalTrainer = require("../models/PersonalTrainer");
const SchedulesOnline = require("../models/SchedulesOnline");
const TraningCategory = require("../models/TraningCategorie");


const connection = new Sequelize(dbConfig);

// INICIANDO OS MODELS
Academy.init(connection);
Schedules.init(connection);
UserStudent.init(connection);
Administrator.init(connection);
AddressStudent.init(connection);
AddressAcademy.init(connection);
PersonalTrainer.init(connection);
SchedulesOnline.init(connection);
TraningCategory.init(connection);

// INICIANDO OS RELACIONAMENTOS
Academy.associate(connection.models);
Schedules.associate(connection.models);
UserStudent.associate(connection.models);
Administrator.associate(connection.models);
AddressStudent.associate(connection.models);
AddressAcademy.associate(connection.models);
PersonalTrainer.associate(connection.models);
TraningCategory.associate(connection.models);
SchedulesOnline.associate(connection.models);