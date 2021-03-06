//@ts-ignore
import { Folder, File } from "../models";
import { v4 as uuidv4 } from "uuid";

export const addFolderQuery = async (
  name: string,
  teamId: string,
  parentFolderId: string
) => {
  try {
    await Folder.create({
      id: uuidv4(),
      name,
      teamId,
      parentFolderId,
    });
  } catch (error) {
    throw new Error(error);
  }
};
const contentOfFolder = async (folderId: string, teamId: string) => {
  try {
    const folders = await Folder.findAll({
      where: { parentFolderId: folderId, teamId: teamId },
    });
    const files = await File.findAll({
      where: { parentFolderId: folderId, teamId: teamId },
    });
    return { folders, files };
  } catch (error) {
    throw new Error(error);
  }
};

export const contentOfFolderQuery = async (
  folderId: string,
  teamId: string
) => {
  try {
    const folders = await Folder.findAll({
      where: { parentFolderId: folderId, teamId: teamId },
    });
    const files = await File.findAll({
      where: { parentFolderId: folderId, teamId: teamId },
    });
    return { folders, files };
  } catch (error) {
    throw new Error(error);
  }
};

const showAllNestedQuery = async (folderId: string, teamId: string) => {
  const filesToDelete: any = [];
  const contentOfFolderFunction: any = async (
    folderIdInner: string,
    teamIdInner: string
  ) => {
    const content = await contentOfFolder(folderIdInner, teamIdInner);
    if (content.folders.length === 0) {
      const objFiles = content.files.map((file: any) => {
        return file.toJSON();
      });
      objFiles.forEach((element: any) => {
        filesToDelete.push(element);
      });
      return;
    }
    const objFiles = content.files.map((file: any) => {
      return file.toJSON();
    });
    objFiles.forEach((element: any) => {
      filesToDelete.push(element);
    });
    for (const folder of content.folders) {
      await contentOfFolderFunction(folder.id, folder.teamId);
    }
  };

  await contentOfFolderFunction(folderId, teamId);

  let foldersToDelete = filesToDelete.map((file: any) => {
    return file.parentFolderId;
  });
  foldersToDelete = [...new Set(foldersToDelete)];
  return { filesToDelete, foldersToDelete };
};

export const deleteFolderQuery = async (folderId: string, teamId: string) => {
  const nested = await showAllNestedQuery(folderId, teamId);
  const filePromiseArray = nested.filesToDelete.map((file: any) => {
    return File.destroy({ where: { id: file.id } });
  });
  const folderPromiseArray = nested.filesToDelete.map((folder: any) => {
    return Folder.destroy({ where: { id: folder.id } });
  });
  try {
    await Promise.all(filePromiseArray);
    await Promise.all(folderPromiseArray);
  } catch (error) {
    throw new Error(error);
  }
};

export const getFolderRouteQuery = async (folderId: string) => {
  const folder = await Folder.findOne({ where: { id: folderId } });
  let parentFolderId = folder.toJSON().parentFolderId;
  const routeArray: any = [];
  routeArray.push(parentFolderId);
  while (parentFolderId !== "master") {
    const innerFolder = await Folder.findOne({ where: { id: parentFolderId } });
    parentFolderId = innerFolder.toJSON().parentFolderId;
    routeArray.push(parentFolderId);
  }
  return routeArray;
};
