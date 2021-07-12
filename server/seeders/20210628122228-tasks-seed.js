"use strict";

const weekAgo = new Date();
weekAgo.setDate(weekAgo.getDate() - 7);

const dayAgo = new Date();
dayAgo.setDate(dayAgo.getDate() - 1);

const oneDay = new Date();
oneDay.setDate(oneDay.getDate() + 1);

const twoDays = new Date();
twoDays.setDate(twoDays.getDate() + 2);

const week = new Date();
week.setDate(week.getDate() + 7);

const twoWeeks = new Date();
twoWeeks.setDate(twoWeeks.getDate() + 14);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("tasks", [
      {
        title: "Fixing get user route",
        content:
          "When requesting a user without headers the api gives a user back",
        user_name: "dvir",
        status: "Not Started",
        team_id: "backend",
        deadline: oneDay,
        finish_date: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Server requests",
        content: "Sending 5 requests or more crashes the server",
        user_name: "dvir",
        status: "In Progress",
        team_id: "backend",
        deadline: twoDays,
        finish_date: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "DB migrations",
        content: "New db migrations need to be migrated to the postgreSql",
        user_name: "dvir",
        status: "In Progress",
        team_id: "backend",
        deadline: week,
        finish_date: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Server routes",
        content: "Finish all the server routes",
        user_name: "dvir",
        status: "Done",
        team_id: "backend",
        deadline: twoWeeks,
        finish_date: dayAgo,
        created_at: weekAgo,
        updated_at: weekAgo,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("tasks", null, {});
  },
};
