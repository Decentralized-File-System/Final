import { query, Request, Response } from "express";
import { addTask, getTaskOfTeam } from "../utils/DBqueries";

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
