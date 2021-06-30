// @ts-ignore
import { Task } from "../models";
import { task } from "../types";

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
