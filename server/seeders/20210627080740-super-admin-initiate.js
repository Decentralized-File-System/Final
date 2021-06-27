"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.insert("users", {
      name: "admin",
      teamId: null,
      isAdmin: true,
      isSuperAdmin: true,
      email: "admin@admin.com",
      password: "admin",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
