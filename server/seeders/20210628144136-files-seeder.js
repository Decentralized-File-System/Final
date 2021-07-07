"use strict";
const { v4: uuidv4 } = require("uuid");

const weekAgo = new Date();
weekAgo.setDate(weekAgo.getDate() - 7);

const dayAgo = new Date();
dayAgo.setDate(dayAgo.getDate() - 1);

const twoDayAgo = new Date();
twoDayAgo.setDate(twoDayAgo.getDate() - 2);

const threeDayAgo = new Date();
threeDayAgo.setDate(threeDayAgo.getDate() - 3);

const fourDayAgo = new Date();
fourDayAgo.setDate(fourDayAgo.getDate() - 4);

const fiveDayAgo = new Date();
fiveDayAgo.setDate(fiveDayAgo.getDate() - 5);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("files", [
      {
        id: uuidv4(),
        name: "movie",
        user_id: "admin",
        description: "bla bla bla",
        type: "application/mp4",
        team_id: "team 1",
        size: 0,
        parent_folder_id: "1",
        created_at: weekAgo,
        updated_at: weekAgo,
      },
      {
        id: uuidv4(),
        name: "dummy-file",
        user_id: "normal",
        description: "bla bla bla for lorem to bla",
        type: "application/csv",
        team_id: "team 1",
        size: 0,
        parent_folder_id: "1",
        created_at: dayAgo,
        updated_at: dayAgo,
      },
      {
        id: uuidv4(),
        name: "text-file",
        user_id: "admin",
        description: "another description bla bla bla bla bla bla bla bla bla",
        type: "application/text",
        team_id: "team 1",
        size: 0,
        parent_folder_id: "master",
        created_at: twoDayAgo,
        updated_at: twoDayAgo,
      },
      {
        id: uuidv4(),
        name: "another-text-file",
        user_id: "admin",
        description: "bla bla bla bla bla bla bla bla bla",
        type: "application/text",
        team_id: "team 1",
        size: 0,
        parent_folder_id: "master",
        created_at: threeDayAgo,
        updated_at: threeDayAgo,
      },
      {
        id: uuidv4(),
        name: "movie-2",
        user_id: "normal",
        description: "lorem lorem lorem lorem lorem lorem lorem lorem lorem",
        type: "application/mp4",
        team_id: "team 1",
        size: 0,
        parent_folder_id: "master",
        created_at: fourDayAgo,
        updated_at: fourDayAgo,
      },
      {
        id: uuidv4(),
        name: "csv-file",
        user_id: "admin",
        description:
          "hello world hello world hello world hello world hello world ",
        type: "application/csv",
        team_id: "team 1",
        size: 0,
        parent_folder_id: "2",
        created_at: fiveDayAgo,
        updated_at: fiveDayAgo,
      },
      {
        id: uuidv4(),
        name: "text",
        user_id: "admin",
        description: " hello world hello world hello world hello world",
        type: "application/text",
        team_id: "team 1",
        size: 0,
        parent_folder_id: "2",
        created_at: twoDayAgo,
        updated_at: twoDayAgo,
      },
      {
        id: uuidv4(),
        name: "lorem",
        user_id: "normal",
        description:
          "nothing nothing nothing nothing nothing nothing nothing nothing",
        type: "application/text",
        team_id: "team 1",
        size: 0,
        parent_folder_id: "2",
        created_at: weekAgo,
        updated_at: weekAgo,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("files", null, {});
  },
};
