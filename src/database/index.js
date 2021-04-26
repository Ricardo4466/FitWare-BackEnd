const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

// IMPORTANDO OS MODELS
const UserStudent = require("../models/UserStudent");
const AddressStudent = require("../models/AddressStudent");



const connection = new Sequelize(dbConfig);

// INICIANDO OS MODELS
UserStudent.init(connection);
AddressStudent.init(connection);


// INICIANDO OS RELACIONAMENTOS
UserStudent.associate(connection.models);
AddressStudent.associate(connection.models);
