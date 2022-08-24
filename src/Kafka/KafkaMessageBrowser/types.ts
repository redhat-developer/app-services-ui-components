import type { DateIsoString } from "../types";

export type Message = {
  partition?: number;
  offset?: number;
  timestamp?: DateIsoString;
  key?: string;
  value?: string;
  headers: Record<string, string>;
};
