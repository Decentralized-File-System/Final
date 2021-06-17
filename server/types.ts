export interface ServerFile {
  name: string;
  data: Buffer;
  size: number;
  encoding: string;
  tempFilePath: string;
  truncated: boolean;
  mimetype: string;
  md5: string;
  mv: [mv: Function];
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
