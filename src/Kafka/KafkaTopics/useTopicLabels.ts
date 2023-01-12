import { useTranslation } from "react-i18next";
import type { KafkaTopicField } from "./types";

export function useTopicLabels() {
  const { t } = useTranslation("topic");
  const fields: { [field in KafkaTopicField]: string } = {
    name: t("topic_name"),
    partitions: t("partitions"),
    "retention.ms": t("retention_time"),
    "retention.bytes": t("retention_size"),
  };
  return {
    fields,
  };
}
