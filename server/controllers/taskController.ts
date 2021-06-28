import { query, Request, Response } from "express";
import { addTask, changeStatus, getTaskOfTeam } from "../utils/DBqueries";

export const getAllTasksOfTeam = async (req: Request, res: Response) => {
  const teamId = String(req.query.teamId);
  try {
    const tasks = await getTaskOfTeam(teamId);
    res.json(tasks);
  } catch (error) {
    res.json({ message: "Error" });
  }
};

export const addNewTask = async (req: Request, res: Response) => {
  const { task } = req.body;
  try {
    await addTask(task);
    res.json({ message: "Success" });
  } catch (error) {
    res.json({ message: "Error" });
  }
};

export const updateTaskStatus = async (req: Request, res: Response) => {
  const taskId = Number(req.query.taskId);
  const status = String(req.query.status);
  try {
    await changeStatus(taskId, status);
    res.json({ message: "Success" });
  } catch (error) {
    res.json({ message: "Error" });
  }
};
