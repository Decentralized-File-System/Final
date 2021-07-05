import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import {
  addFolderQuery,
  contentOfFolderQuery,
} from "../DBQueries/folderQueries";

export const addFolder = async (req: Request, res: Response) => {
  const { folder }: any = req.body;
  try {
    await addFolderQuery(folder.name, folder.teamId, folder.parentFolderId);
    res.status(200).json({ message: "Success creating folder" });
  } catch (error) {
    res.status(500).json({ message: "Fail to create folder" });
  }
};

export const getContentOfFolder = async (req: Request, res: Response) => {
  const { folderId, teamId }: any = req.query;
  try {
    const content = await contentOfFolderQuery(folderId, teamId);
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: "Failed to get content" });
  }
};
