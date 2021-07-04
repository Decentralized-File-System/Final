import { file } from "../types";

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
