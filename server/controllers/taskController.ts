import { query, Request, Response } from "express";
import { getTaskOfTeam } from "../utils/DBqueries";

export const getAllTasksOfTeam = async (req: Request, res: Response) => {
  const teamId = String(req.query.teamId);
  const tasks = await getTaskOfTeam(teamId);
  res.json(tasks);
};
