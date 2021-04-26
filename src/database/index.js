const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

// IMPORTANDO OS MODELS
const UserStudent = require("../models/UserStudent");
const AddressStudent = require("../models/AddressStudent");
const Academy = require("../models/Academy");
const AddressAcademy = require("../models/AddressAcademy");


const connection = new Sequelize(dbConfig);

// INICIANDO OS MODELS
UserStudent.init(connection);
AddressStudent.init(connection);
AddressAcademy.init(connection);
Academy.init(connection);

// INICIANDO OS RELACIONAMENTOS
UserStudent.associate(connection.models);
AddressStudent.associate(connection.models);
AddressAcademy.associate(connection.models);
Academy.associate(connection.models);
