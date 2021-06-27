// @ts-ignore
import { DataNode, Chunk, File, sequelize, User } from "../models";
import { ChunkClass } from "./classes";
import { ServerFile, user } from "../types";

export const getAllNodesData = async () => {
  const response = await DataNode.findAll({ order: [["id", "ASC"]] });
  const nodes = response.map((data: any) => data.toJSON());
  return nodes;
};

export const getAllUsers = async () => {
  const response = await User.findAll({});
  const usersArray = response.map((data: any) => data.toJSON());
  return usersArray;
};

export const updateTeam = async (usersArray: user[], newTeamId: string) => {
  try {
    for (const user of usersArray) {
      await User.update(
        { teamId: "Doe" },
        {
          where: {
            email: user.email,
          },
        }
      );
    }
    return "success";
  } catch (error) {
    return "failed";
  }
};

export const updateAdmin = async (usersArray: user[], adminBool: string) => {
  try {
    for (const user of usersArray) {
      await User.update(
        { isAdmin: adminBool },
        {
          where: {
            email: user.email,
          },
        }
      );
    }
    return "success";
  } catch (error) {
    return "failed";
  }
};

export const getEmployeesByTeamId = async (teamId: string) => {
  const response = await User.findAll({
    where: { team_id: teamId, isAdmin: "false", isSuperAdmin: "false" },
  });
  const regularEmployeesArray = response.map((data: any) => data.toJSON());
  return regularEmployeesArray;
};

export const getAllEmployeesWithoutTeam = async () => {
  const response = await User.findAll({
    where: { team_id: null, isAdmin: "false", isSuperAdmin: "false" },
  });
  const regularEmployeesArray = response.map((data: any) => data.toJSON());
  return regularEmployeesArray;
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

export const getFilesByTeamId = async (teamId: string) => {
  const res = File.findAll({where:{team_id: teamId}});
  const filesArray = res.map((data: any) => data.toJSON());
  return filesArray;
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
