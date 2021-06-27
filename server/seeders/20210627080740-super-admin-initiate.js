"use strict";
const { hashSync, genSaltSync } = require("bcrypt");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("users", [
      {
        name: "super",
        team_id: null,
        is_admin: true,
        is_super_admin: true,
        email: "super@super.com",
        password: hashSync("super", genSaltSync(10)),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "admin",
        team_id: "team 1",
        is_admin: true,
        is_super_admin: false,
        email: "admin@admin.com",
        password: hashSync("admin", genSaltSync(10)),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "normal",
        team_id: "team 1",
        is_admin: false,
        is_super_admin: false,
        email: "normal@normal.com",
        password: hashSync("normal", genSaltSync(10)),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
