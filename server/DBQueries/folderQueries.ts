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

// const showAllNestedQuery = async (
//   folders: any[],
//   files: any[],
//   folderId: string,
//   teamId: string
// ) => {
//   if (folders.length == 0 && files.length === 0) {
//     return;
//   }
//   const content = await contentOfFolderQuery(folderId, teamId);
//   const contentFiles = content.files;
//   const contentFolders = content.folders;
//   contentFolders.map(async (folder: any) => {
//     const innerContent = await contentOfFolderQuery(folder.id, folder.teamId);
//     return;
//   });
// };

// export const deleteFolder = async (folderId: string) => {
//   await Folder.destroy({ where: { id: folderId } });
// };
