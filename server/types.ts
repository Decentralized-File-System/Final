export interface ServerFile {
  name: string;
  data: Buffer;
  size: number;
  id: string;
}
export interface dataNodePercentageStorage {
  nodeId: number;
  availableStorage: number;
  availableStoragePercentage: number;
}
export interface dataNodeWithOutPercentage {
  nodeId: number;
  availableStorage: number;
  availableStoragePercentage?: number;
}
export interface nodeDataType {
  id: number;
  totalStorage: string;
  availableStorage: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface user {
  name: string;
  email: string;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  teamId: string | null;
  password: string | undefined;
}

export interface task {
  title: string;
  content: string;
  userName: string;
  status: string;
  teamId: string;
  deadline: Date;
  finishDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface chunk {
  id: number;
  fileId: string;
  size: number;
  nodeId: number;
  orderIndex: number;
  createdAt: Date;
  updatedAt: Date;
}
