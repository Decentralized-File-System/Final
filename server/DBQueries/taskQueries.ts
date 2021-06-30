// @ts-ignore
import { Task } from "../models";
import { task } from "../types";
import { Op } from "sequelize";

export const getTaskOfTeam = async (teamId: string) => {
  try {
    const allTasks = await Task.findAll({ where: { team_id: teamId } });
    return allTasks;
  } catch (error) {
    throw new Error(error);
  }
};

export const addTask = async (taskObject: {
  title: string;
  content: string;
  userName: string;
  status: string;
  teamId: string;
  deadline: Date;
}) => {
  const task: task = {
    title: taskObject.title,
    content: taskObject.content,
    userName: taskObject.userName,
    status: taskObject.status,
    teamId: taskObject.teamId,
    deadline: taskObject.deadline,
    finishDate: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  try {
    await Task.create(task);
  } catch (error) {
    throw new Error(error);
  }
};

export const changeStatus = async (taskId: number, newStatus: string) => {
  try {
    await Task.update({ status: newStatus }, { where: { id: taskId } });
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteTaskById = async (taskId: number) => {
  try {
    await Task.destroy({ where: { id: taskId } });
    return "success";
  } catch (error) {
    throw new Error(error);
  }
};

export const relevantTasks = async (teamId: string) => {
  try {
    const relevant = await Task.findAll({
      where: {
        finish_date: {
          [Op.is]: null,
        },
        team_id: teamId,
      },
    });
    return relevant;
  } catch (error) {
    throw new Error(error);
  }
};

export const finishedTasks = async (teamId: string) => {
  try {
    const finished = await Task.findAll({
      where: {
        status: "Done",
        team_id: teamId,
      },
    });
    return finished;
  } catch (error) {
    throw new Error(error);
  }
};

export const getFromDateRange = async (
  teamId: string,
  startDate: Date,
  finishDate: Date
) => {
  try {
    const rangeTasks = await Task.findAll({
      where: {
        created_at: {
          [Op.between]: [startDate, finishDate],
        },
        team_id: teamId,
      },
    });
    return rangeTasks;
  } catch (error) {
    throw new Error(error);
  }
};
