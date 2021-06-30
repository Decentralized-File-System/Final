import { query, Request, Response } from "express";
import {
  addTask,
  changeStatus,
  deleteTaskById,
  finishedTasks,
  getFromDateRange,
  getTaskOfTeam,
  relevantTasks,
} from "../DBQueries/taskQueries";

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

export const deleteTask = async (req: Request, res: Response) => {
  const { taskId }: any = req.query;
  try {
    await deleteTaskById(taskId);
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};

export const getRelevant = async (req: Request, res: Response) => {
  const { teamId }: any = req.query;
  try {
    const relevant = await relevantTasks(teamId);
    res.status(200).json(relevant);
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};

export const getFinished = async (req: Request, res: Response) => {
  const { teamId }: any = req.query;
  try {
    const finished = await finishedTasks(teamId);
    res.status(200).json(finished);
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};

export const getRangeOfDate = async (req: Request, res: Response) => {
  const { teamId, start, finish }: any = req.query;
  try {
    const rangeTasks = await getFromDateRange(teamId, start, finish);
    res.status(200).json(rangeTasks);
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};
