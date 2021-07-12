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
        name: "Types",
        user_id: "dvir",
        description: "Types for backend typescript",
        type: "application/typescript",
        team_id: "backend",
        size: 0,
        parent_folder_id: "1",
        created_at: weekAgo,
        updated_at: weekAgo,
      },
      {
        id: uuidv4(),
        name: "Interfaces",
        user_id: "ophir",
        description: "Interfaces for backend typescript",
        type: "application/typescript",
        team_id: "backend",
        size: 0,
        parent_folder_id: "1",
        created_at: dayAgo,
        updated_at: dayAgo,
      },
      {
        id: uuidv4(),
        name: "Ports list",
        user_id: "dvir",
        description: "List of ports",
        type: "application/csv",
        team_id: "backend",
        size: 0,
        parent_folder_id: "master",
        created_at: twoDayAgo,
        updated_at: twoDayAgo,
      },
      {
        id: uuidv4(),
        name: "Important API's",
        user_id: "dvir",
        description: "Our used api's",
        type: "application/csv",
        team_id: "backend",
        size: 0,
        parent_folder_id: "master",
        created_at: threeDayAgo,
        updated_at: threeDayAgo,
      },
      {
        id: uuidv4(),
        name: "Routes",
        user_id: "ophir",
        description: "Explanation for routes",
        type: "application/csv",
        team_id: "backend",
        size: 0,
        parent_folder_id: "master",
        created_at: fourDayAgo,
        updated_at: fourDayAgo,
      },
      {
        id: uuidv4(),
        name: "Ecs container urls",
        user_id: "dvir",
        description: "List of ecs container urls",
        type: "application/csv",
        team_id: "backend",
        size: 0,
        parent_folder_id: "2",
        created_at: fiveDayAgo,
        updated_at: fiveDayAgo,
      },
      {
        id: uuidv4(),
        name: "Contact list",
        user_id: "dvir",
        description: "Employees contact info",
        type: "application/text",
        team_id: "backend",
        size: 0,
        parent_folder_id: "2",
        created_at: twoDayAgo,
        updated_at: twoDayAgo,
      },
      {
        id: uuidv4(),
        name: "Backend memes",
        user_id: "ophir",
        description: "Our best of the best memes",
        type: "application/text",
        team_id: "backend",
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
