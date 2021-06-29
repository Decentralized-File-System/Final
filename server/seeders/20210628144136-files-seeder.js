"use strict";
const { v4: uuidv4 } = require("uuid");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("files", [
      {
        id: uuidv4(),
        name: "dummy-file-1",
        user_id: "admin",
        type: "application/mp4",
        team_id: "team 1",
        size: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "dummy-file-2",
        user_id: "admin",
        type: "application/csv",
        team_id: "team 1",
        size: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "dummy-file-3",
        user_id: "admin",
        type: "application/text",
        team_id: "team 1",
        size: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "dummy-file-4",
        user_id: "admin",
        type: "application/text",
        team_id: "team 1",
        size: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "dummy-file-5",
        user_id: "admin",
        type: "application/mp4",
        team_id: "team 1",
        size: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "dummy-file-6",
        user_id: "admin",
        type: "application/csv",
        team_id: "team 1",
        size: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "dummy-file-7",
        user_id: "admin",
        type: "application/text",
        team_id: "team 1",
        size: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "dummy-file-8",
        user_id: "admin",
        type: "application/text",
        team_id: "team 1",
        size: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("files", null, {});
  },
};
