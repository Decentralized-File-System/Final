"use strict";
const { Model } = require("sequelize");
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
  File.init(
    {
      name: DataTypes.STRING,
      userId: DataTypes.STRING,
      teamId: DataTypes.STRING,
      type: DataTypes.STRING,
      description: DataTypes.TEXT,
      size: DataTypes.BIGINT,
      parentFolderId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "File",
      tableName: "files",
      underscored: true,
    }
  );
  return File;
};
