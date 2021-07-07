import { query, Request, Response } from "express";
import {
  addTask,
  changeStatus,
  deleteTaskById,
  finishedTasks,
  getFromDateRange,
  getTaskOfTeam,
  relevantTasks,
  getTaskByName,
} from "../DBQueries/taskQueries";

export const getAllTasksOfTeam = async (req: Request, res: Response) => {
  const teamId = String(req.query.teamId);
  try {
    const tasks = await getTaskOfTeam(teamId);
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json("Failed to load tasks");
  }
};

export const addNewTask = async (req: Request, res: Response) => {
  const { task } = req.body;
  try {
    await addTask(task);
    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to add new task" });
  }
};

export const updateTaskStatus = async (req: Request, res: Response) => {
  const taskId = Number(req.query.taskId);
  const status = String(req.query.status);
  try {
    await changeStatus(taskId, status);
    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update task" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { taskId }: any = req.query;
  try {
    await deleteTaskById(taskId);
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete task" });
  }
};

export const getRelevant = async (req: Request, res: Response) => {
  const { teamId }: any = req.query;
  try {
    const relevant = await relevantTasks(teamId);
    res.status(200).json(relevant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get tasks" });
  }
};

export const getFinished = async (req: Request, res: Response) => {
  const { teamId }: any = req.query;
  try {
    const finished = await finishedTasks(teamId);
    res.status(200).json(finished);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get tasks" });
  }
};

export const getRangeOfDate = async (req: Request, res: Response) => {
  const { teamId, start, finish }: any = req.query;
  try {
    const rangeTasks = await getFromDateRange(teamId, start, finish);
    res.status(200).json(rangeTasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get tasks" });
  }
};

export const taskByNameGet = async (req: Request, res: Response) => {
  const { text, teamId }: any = req.query;
  if (!teamId) {
    return res.status(401).json({ message: "Bad request" });
  }
  try {
    const taskArray = await getTaskByName(text, teamId);
    return res.status(200).json(taskArray);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get tasks" });
  }
};
