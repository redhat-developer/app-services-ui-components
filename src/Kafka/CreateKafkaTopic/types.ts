import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export type NewTopic = {
  name: string;
  numPartitions: number;
  replicationFactor: number;
  retentionTime: number;
  retentionTimeUnit: RetentionTimeUnits;
  retentionBytes: number;
  retentionBytesUnit: RetentionSizeUnits;
  cleanupPolicy: string;
  customRetentionTimeUnit: RetentionTimeUnits;
  customRetentionSizeUnit: RetentionSizeUnits;
  minInSyncReplica: number;
  isMultiAZ: boolean;
};

export enum RetentionTimeUnits {
  MILLISECOND = "milliseconds",
  SECOND = "seconds",
  MINUTE = "minutes",
  HOUR = "hours",
  DAY = "days",
  WEEK = "weeks",
  CUSTOM = "custom",
  UNLIMITED = "unlimited",
}

export enum CustomRetentionTimeUnits {
  MILLISECOND = "milliseconds",
  SECOND = "seconds",
  MINUTE = "minutes",
  HOUR = "hours",
  DAY = "days",
  WEEK = "weeks",
}

export enum RetentionSizeUnits {
  BYTE = "bytes",
  KIBIBYTE = "kibibytes",
  MEBIBYTE = "mebibytes",
  GIBIBYTE = "gibibytes",
  TEBIBYTE = "tebibytes",
  CUSTOM = "custom",
  UNLIMITED = "unlimited",
}
export const unitsToBytes = {
  [RetentionSizeUnits.BYTE]: 1,
  [RetentionSizeUnits.KIBIBYTE]: 1024,
  [RetentionSizeUnits.MEBIBYTE]: 1048576,
  [RetentionSizeUnits.GIBIBYTE]: 1073741824,
  [RetentionSizeUnits.TEBIBYTE]: 1.0995116e12,
};

export const unitsToMilliSecond = {
  [RetentionTimeUnits.MILLISECOND]: 1,
  [RetentionTimeUnits.SECOND]: 1000,
  [RetentionTimeUnits.MINUTE]: 60000,
  [RetentionTimeUnits.HOUR]: 3600000,
  [RetentionTimeUnits.DAY]: 86400000,
};

export const RetentionTimeUnitToValue = {
  ...unitsToMilliSecond,
  [RetentionTimeUnits.DAY]: 1,
  [RetentionTimeUnits.WEEK]: 7,
};

export type SelectOptions = {
  key: string;
  value: string;
  isPlaceholder?: boolean;
  isDisabled?: boolean;
};

export const kebabToDotSeparated = (val: string): string => {
  if (typeof val === "string") {
    return val.replace(/-/g, ".");
  }
  return val;
};

export const retentionTimeSelectOptions: SelectOptions[] = [
  { key: "days", value: "days", isPlaceholder: true },
  { key: "hours", value: "hours" },
  { key: "minutes", value: "minutes" },
  { key: "seconds", value: "seconds" },
  { key: "milliseconds", value: "milliseconds" },
];

export const retentionSizeSelectOptions: SelectOptions[] = [
  { key: "bytes", value: "bytes", isPlaceholder: true },
  { key: "kibibytes", value: "kibibytes" },
  { key: "mebibytes", value: "mebibytes" },
  { key: "gibibytes", value: "gibibytes" },
  { key: "tebibytes", value: "tebibytes" },
];

export const useValidateTopic = (): {
  validateName: (name: string) => string | undefined;
} => {
  const { t } = useTranslation(["create-topic"]);

  return {
    validateName: useCallback(
      (name) => {
        const legalNameChars = new RegExp("^[a-zA-Z0-9._-]+$");
        if (name.length && !legalNameChars.test(name)) {
          return t("topic_name_helper_text");
        } else if (name.length > 249) {
          return t("cannot_exceed_characters");
        } else if (name === "." || name === "..") {
          return t("invalid_name_with_dot");
        }
        return undefined;
      },
      [t]
    ),
  };
};
