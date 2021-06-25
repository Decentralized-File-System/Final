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
  password: string | undefined;
}
