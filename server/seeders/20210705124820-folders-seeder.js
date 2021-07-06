"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("folders", [
      {
        id: "1",
        name: "Big Folder",
        team_id: "team 1",
        parent_folder_id: "master",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "2",
        name: "Smaller Folder",
        team_id: "team 1",
        parent_folder_id: "1",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("folders", null, {});
  },
};
