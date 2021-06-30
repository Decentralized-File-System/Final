// @ts-ignore
import { User } from "../models";

import { user } from "../types";

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

export const getAllUsers = async () => {
  const response = await User.findAll({ order: [["id", "ASC"]] });
  const usersArray = response.map((data: any) => data.toJSON());
  return usersArray;
};

export const getAllEmployeesWithoutTeam = async () => {
  const response = await User.findAll({
    where: { team_id: null, isAdmin: "false", isSuperAdmin: "false" },
  });
  const regularEmployeesArray = response.map((data: any) => data.toJSON());
  return regularEmployeesArray;
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