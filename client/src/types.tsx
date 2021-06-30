export type user = {
  id: string;
  name: string;
  teamId: string | null;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  email: string;
};
export type file = {
  id: number;
  name: string;
  userId: number;
  teamId: string;
  type: string;
  size: number;
  createdAt: Date;
};
export type task = {
  id: number;
  title: string;
  content: string;
  userName: string;
  status: string;
  teamId: string;
  createdAt: Date;
  updatedAt: Date;
};