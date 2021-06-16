"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("data_nodes", [
      {
        total_storage: 5368709120,
        available_storage: 5368709120,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        total_storage: 10737418240,
        available_storage: 10737418240,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        total_storage: 16106127360,
        available_storage: 16106127360,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("data_nodes", null, {});
  },
};
