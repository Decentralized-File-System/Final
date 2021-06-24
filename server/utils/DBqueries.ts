// @ts-ignore
import { DataNode, Chunk, File, sequelize, User } from "../models";
import { ChunkClass } from "./classes";
import { ServerFile } from "../types";

export const getAllNodesData = async () => {
  const response = await DataNode.findAll({ order: [["id", "ASC"]] });
  const nodes = response.map((data: any) => data.toJSON());
  return nodes;
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
  file: { name: string; size: number; type: string; id: string },
  userId: string
) => {
  const data = {
    id: file.id,
    name: file.name,
    userId,
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

export const getUserByUserName = async (userName: string) => {
  try {
    const res = await User.findOne({ where: { name: userName } });
    let user;
    if (res !== null) {
      user = res.dataValues;
    }
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserByEmail = async (userEmail: string) => {
  try {
    const res = await User.findOne({ where: { email: userEmail } });
    let user;
    if (res !== null) {
      user = res.dataValues;
    }
    return user;
  } catch (error) {
    throw new Error(error);
  }
};
