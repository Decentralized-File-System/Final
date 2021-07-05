import { file, task } from "../types";

export const sortByName = (files: file[]) => {
  const temp = [...files];
  temp.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
  return temp;
};

export const sortByUser = (files: file[]) => {
  const temp = [...files];
  temp.sort((a, b) => (a.userId > b.userId ? 1 : b.userId > a.userId ? -1 : 0));
  return temp;
};

export const sortBySize = (files: file[]) => {
  const temp = [...files];
  temp.sort((a, b) => b.size - a.size);
  return temp;
};

export const sortByExtension = (files: file[]) => {
  const temp = [...files];
  temp.sort((a, b) =>
    a.type.split("/")[1] > b.type.split("/")[1]
      ? 1
      : b.type.split("/")[1] > a.type.split("/")[1]
      ? -1
      : 0
  );
  return temp;
};

export const sortByDate = (files: file[]) => {
  const temp: any = [...files];
  temp.sort(
    (a: any, b: any) => +new Date(b.createdAt) - +new Date(a.createdAt)
  );
  return temp;
};

export const sortByTitleTask = (tasks: task[]) => {
  const temp = [...tasks];
  temp.sort((a, b) => (a.title > b.title ? 1 : b.title > a.title ? -1 : 0));
  return temp;
};

export const sortByStatusTask = (tasks: task[]) => {
  const temp = [...tasks];
  temp.sort((a, b) => (a.status > b.status ? 1 : b.status > a.status ? -1 : 0));
  return temp;
};

export const sortByDateTask = (tasks: task[]) => {
  const temp: any = [...tasks];
  temp.sort(
    (a: any, b: any) => +new Date(b.createdAt) - +new Date(a.createdAt)
  );
  return temp;
};

export const sortByDeadlineTask = (tasks: task[]) => {
  const temp: any = [...tasks];
  temp.sort((a: any, b: any) => +new Date(b.deadline) - +new Date(a.deadline));
  return temp;
};
