import { query, Request, Response } from "express";
import { addTask, changeStatus, getTaskOfTeam } from "../utils/DBqueries";

export const getAllTasksOfTeam = async (req: Request, res: Response) => {
  const teamId = String(req.query.teamId);
  const tasks = await getTaskOfTeam(teamId);
  res.json(tasks);
};

export const addNewTask = async (req: Request, res: Response) => {
  const { task } = req.body;
  try {
    await addTask(task);
    res.send("success");
  } catch (error) {
    res.json(error);
  }
};

export const updateTaskStatus = async (req: Request, res: Response) => {
  const taskId = Number(req.query.taskId);
  const status = String(req.query.status);
  try {
    await changeStatus(taskId, status);
    res.send("success");
  } catch (error) {
    res.json(error);
  }
};
