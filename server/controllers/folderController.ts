import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import {
  addFolderQuery,
  contentOfFolderQuery,
  deleteFolderQuery,
  getFolderRouteQuery,
} from "../DBQueries/folderQueries";

export const addFolder = async (req: Request, res: Response) => {
  const { folder }: any = req.body;
  try {
    await addFolderQuery(folder.name, folder.teamId, folder.parentFolderId);
    return res.status(200).json({ message: "Success creating folder" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Fail to create folder" });
  }
};

export const getContentOfFolder = async (req: Request, res: Response) => {
  const { folderId, teamId }: any = req.query;
  try {
    const content = await contentOfFolderQuery(folderId, teamId);
    return res.status(200).json(content);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to get content" });
  }
};

export const deleteFolder = async (req: Request, res: Response) => {
  const { folderId, teamId }: any = req.query;
  try {
    await deleteFolderQuery(folderId, teamId);
    return res.status(200).json({ message: "Folder deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to delete folder" });
  }
};

export const getFolderRoute = async (req: Request, res: Response) => {
  const { folderId }: any = req.query;
  try {
    const route = await getFolderRouteQuery(folderId);
    return res.status(200).json(route);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to get route" });
  }
};
