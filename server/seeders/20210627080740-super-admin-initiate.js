"use strict";
const { hashSync, genSaltSync } = require("bcrypt");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("users", [
      {
        name: "super_admin",
        team_id: null,
        is_admin: true,
        is_super_admin: true,
        email: "super@teamshare.com",
        password: hashSync("password", genSaltSync(10)),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "dvir",
        team_id: "backend",
        is_admin: true,
        is_super_admin: false,
        email: "dvir@teamshare.com",
        password: hashSync("password", genSaltSync(10)),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "ophir",
        team_id: "backend",
        is_admin: false,
        is_super_admin: false,
        email: "ophir@teamshare.com",
        password: hashSync("password", genSaltSync(10)),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
