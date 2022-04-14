export type Message = {
  partition?: number;
  offset?: number;
  timestamp?: Date;
  key?: string;
  value?: string;
  headers: Record<string, string>;
};
