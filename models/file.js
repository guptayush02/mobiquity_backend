'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  File.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    url: DataTypes.STRING,
    isShareable: DataTypes.BOOLEAN,
    privateShare: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'File',
  });
  File.sync({ alter: true })
  return File;
};