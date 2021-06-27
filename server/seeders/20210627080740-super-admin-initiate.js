"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.insertBulk("users", [
      {
        name: "super",
        teamId: null,
        isAdmin: true,
        isSuperAdmin: true,
        email: "super@super.com",
        password: "super",
      },
      {
        name: "admin",
        teamId: null,
        isAdmin: true,
        isSuperAdmin: false,
        email: "admin@admin.com",
        password: "admin",
      },
      {
        name: "normal",
        teamId: null,
        isAdmin: false,
        isSuperAdmin: false,
        email: "normal@normal.com",
        password: "normal",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
