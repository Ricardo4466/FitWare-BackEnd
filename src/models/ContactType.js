const { Model, DataTypes } = require("sequelize");

class ContactType extends Model {
  static init(sequelize) {
    super.init(
      {
        description: DataTypes.STRING,
      },
      {
        tableName: "contact_type",
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.UserStudent, { foreignKey: "student_id"});
  }
}

module.exports = ContactType;
