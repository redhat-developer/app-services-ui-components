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

export type SelectOptions = {
  key: string;
  value: string;
  isPlaceholder?: boolean;
  isDisabled?: boolean;
};
export type ConstantValues = {
  DEFAULT_REPLICAS: number;
  DEFAULT_MIN_CLEANBLE_RATIO: number;
  DEFAULT_MIN_INSYNC_REPLICAS: number;
  DEFAULT_SEGMENT_TIME_MILLISECONDS: number;
  DEFAULT_MAX_MESSAGE_TIMESTAMP_DIFF_MILLISECONDS: string;
  DEFAULT_SEGMENT_INDEX_SIZE_BYTES: number;
  DEFAULT_INDEX_INTERVAL_SIZE_BYTES: number;
  DEFAULT_LOG_SEGMENT_SIZE_BYTES: number;
  DEFAULT_DELETE_RETENTION_TIME_MILLISECONDS: number;
  DEFAULT_SEGMENT_JITTER_TIME_MILLISECONDS: number;
  DEFAULT_FILE_DELETE_DELAY_MILLISECONDS: number;
  DEFAULT_MAXIMUM_MESSAGE_BYTES: number;
  DEFAULT_MESSAGE_TIMESTAMP_TYPE: string;
  DEFAULT_MINIMUM_COMPACTION_LAG_TIME_MILLISECONDS: number;
  DEFAULT_FLUSH_INTERVAL_MESSAGES: string;
  DEFAULT_FLUSH_INTERVAL_TIME_MILLISECONDS: string;
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

export type IDropdownOption = {
  value?: string;
  label?: string;
  key?: string;
  isDisabled?: boolean;
};

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
