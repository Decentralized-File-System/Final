require("dotenv").config();

module.exports = [
  {
    id: 1,
    url: process.env.NODE_1_ECS_URL,
  },
  {
    id: 2,
    url: process.env.NODE_2_ECS_URL,
  },
  {
    id: 3,
    url: process.env.NODE_3_ECS_URL,
  },
];
