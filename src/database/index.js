const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

// IMPORTANDO OS MODELS
const Administrator = require("../models/Administrator");
const Schedules = require("../models/Schedule");
const Academy = require("../models/AdministratorAcademy");

const SchedulesOnline = require("../models/SchedulesOnline");
const AddressStudent = require("../models/AddressStudent");
const UserStudent = require("../models/UserStudent");
const AddressAcademy = require("../models/AddressAcademy");
const TraningCategory = require("../models/TraningCategorie");
const PersonalTrainer = require("../models/PersonalTrainer");


const connection = new Sequelize(dbConfig);

// INICIANDO OS MODELS
Academy.init(connection);
AddressStudent.init(connection);
TraningCategory.init(connection);
Schedules.init(connection);
SchedulesOnline.init(connection);
UserStudent.init(connection);
PersonalTrainer.init(connection);
Administrator.init(connection);
AddressAcademy.init(connection);

// INICIANDO OS RELACIONAMENTOS
TraningCategory.associate(connection.models);
Academy.associate(connection.models);

AddressStudent.associate(connection.models);
UserStudent.associate(connection.models);
Administrator.associate(connection.models);
Schedules.associate(connection.models);
SchedulesOnline.associate(connection.models);
AddressAcademy.associate(connection.models);
PersonalTrainer.associate(connection.models);