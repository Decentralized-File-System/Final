// @ts-ignore
import { DataNode, Chunk, File, sequelize, User, Task } from "../models";
import { Op } from "sequelize";
import { ChunkClass } from "../utils/classes";
import { chunk } from "../types";

export const getAllNodesData = async () => {
  try {
    const response = await DataNode.findAll({ order: [["id", "ASC"]] });
    const nodes = response.map((data: any) => data.toJSON());
    return nodes;
  } catch (error) {
    throw new Error(error);
  }
};

export const addChunk = async (chunksArray: ChunkClass[]) => {
  for (const chunk of chunksArray) {
    const data = {
      fileId: chunk.fileId,
      size: chunk.buffer.length,
      nodeId: chunk.nodeId,
      orderIndex: chunk.index,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    try {
      await Chunk.create(data);
    } catch (error) {
      throw new Error(error);
    }
  }
};

export const addFile = async (
  file: {
    name: string;
    size: number;
    type: string;
    id: string;
    description: string;
  },
  userId: string,
  teamId: string
) => {
  const data = {
    id: file.id,
    name: file.name,
    userId,
    teamId,
    description: file.description,
    type: file.type,
    size: file.size,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  try {
    await File.create(data);
  } catch (error) {
    throw new Error(error);
  }
};

export const updateDataNodes = async (chunksArray: ChunkClass[]) => {
  try {
    for (const chunk of chunksArray) {
      await DataNode.update(
        {
          availableStorage: sequelize.literal(
            `available_storage - ${chunk.buffer.length} `
          ),
        },
        {
          where: {
            id: chunk.nodeId,
          },
        }
      );
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const getChunks = async (fileId: string) => {
  try {
    const res = await Chunk.findAll({ where: { fileId: fileId } });
    const chunksArray = res.map((data: any) => data.toJSON());
    return chunksArray;
  } catch (error) {
    throw new Error(error);
  }
};

export const getFileById = async (fileId: string) => {
  try {
    const res = await File.findOne({ where: { id: fileId } });
    const data = res.toJSON();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getFilesByTeamId = async (teamId: string) => {
  try {
    const res = await File.findAll({
      where: { team_id: teamId },
      order: [["createdAt", "DESC"]],
    });
    const filesArray = res.map((data: any) => data.toJSON());
    return filesArray;
  } catch (error) {
    throw new Error(error);
  }
};

export const getFileByName = async (text: string, teamId: string) => {
  try {
    const res = await File.findAll({
      where: { name: { [Op.like]: `%${text}%` }, team_id: teamId },
    });
    const filesArray = res.map((data: any) => data.toJSON());
    return filesArray;
  } catch (error) {
    throw new Error(error);
  }
};

export const dataNodeStorageAfterDelete = async (chunksArray: chunk[]) => {
  try {
    for (const chunk of chunksArray) {
      await DataNode.update(
        {
          availableStorage: sequelize.literal(
            `available_storage + ${chunk.size} `
          ),
        },
        {
          where: {
            id: chunk.nodeId,
          },
        }
      );
    }
    return "success";
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteFileAndChunks = async (fileId: string) => {
  try {
    await File.destroy({ where: { id: fileId } });
    await Chunk.destroy({ where: { fileId: fileId } });
    return "success";
  } catch (error) {
    throw new Error(error);
  }
};
