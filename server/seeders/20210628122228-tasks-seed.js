"use strict";

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
        title: "Title",
        content:
          "Please find me a good title for this task I'm bad at thinking of titles",
        user_name: "admin",
        status: "Didn't Start",
        team_id: "team 1",
        deadline: oneDay,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Client Side",
        content:
          "Need to finish the front end of the team share website that includes the sidebar as well",
        user_name: "admin",
        status: "Started",
        team_id: "team 1",
        deadline: twoDays,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Backend",
        content:
          "Finish all the server route and the new db migrations need to be imported to the posteSql",
        user_name: "admin",
        status: "Mid Way",
        team_id: "team 1",
        deadline: week,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Types",
        content: "Make all the typescript types that you can think of",
        user_name: "admin",
        status: "Finished",
        team_id: "team 1",
        deadline: twoWeeks,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("tasks", null, {});
  },
};
