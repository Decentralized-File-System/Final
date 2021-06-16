"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chunk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Chunk.init(
    {
      fileId: DataTypes.STRING,
      size: DataTypes.INTEGER,
      nodeId: DataTypes.STRING,
      orderIndex: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Chunk",
      tableName: "chunks",
      underscored: true,
    }
  );
  return Chunk;
};
