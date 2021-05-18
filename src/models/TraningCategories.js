const { Model,DataTypes } = require("sequelize");

class TraningCategories extends Model {
  static init(sequelize) {
    super.init(
      {
        description: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
   
  }
}

module.exports = TraningCategories;
