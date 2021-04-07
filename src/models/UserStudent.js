const { Model, DataTypes } = require("sequelize");

class UserStudent extends Model {
  static init(sequelize) {
    super.init(
      {
        first_name: DataTypes.STRING,
        surname: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        image_profile: DataTypes.STRING,
        weight: DataTypes.STRING,
        height: DataTypes.STRING,
        cpf: DataTypes.STRING,
        birth_date: DataTypes.STRING,
        celular: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }
  static associate(models) {
    this.belongsToMany(models.StudentUserAddress, {through: "user_student_address", foreignKey:"student_address_id"});
    this.belongsToMany(models.Academy, {through: "student_academy"});
  }
}

module.exports = UserStudent;
