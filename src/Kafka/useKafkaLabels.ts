import { useTranslation } from "react-i18next";
import type { CloudProvider, KafkaInstanceField } from "./types";

export function useKafkaLabels() {
  const { t } = useTranslation("kafka");

  const statuses: { [status: string]: string } = {
    ready: t("statuses-filter.ready"),
    failed: t("statuses-filter.failed"),
    pending: t("statuses-filter.pending"),
    creating: t("statuses-filter.creating"),
    deleting: t("statuses-filter.deleting"),
  };
  const providers: { [status in CloudProvider]: string } = {
    aws: t("common:cloudProviders.aws"),
    azure: t("common:cloudProviders.azure"),
  };
  const fields: {
    [field in KafkaInstanceField]: string;
  } = {
    id: t("fields.id"),
    name: t("fields.name"),
    createdAt: t("fields.createdAt"),
    updatedAt: t("fields.updatedAt"),
    expiryDate: t("fields.expiryDate"),
    owner: t("fields.owner"),
    provider: t("fields.provider"),
    region: t("fields.region"),
    status: t("fields.status"),
    plan: t("fields.plan"),
    size: t("fields.size"),
    ingress: t("fields.ingress"),
    egress: t("fields.egress"),
    storage: t("fields.storage"),
    maxPartitions: t("fields.maxPartitions"),
    connections: t("fields.connections"),
    connectionRate: t("fields.connectionRate"),
    messageSize: t("fields.messageSize"),
    billing: t("fields.billing"),
  };
  return {
    fields,
    statuses,
    providers,
  };
}
