import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import {
  TextContent,
  TextList,
  TextListItem,
  TextListItemVariants,
  TextListVariants,
} from "@patternfly/react-core";
import { DetailsTabAlert } from "./components/DetailsTabAlert";
import { format } from "date-fns";
import { InstanceType } from "../utils";

type KafkaDetailsTabProps = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  expiryDate?: Date;
  owner: string;
  region: string;
  instanceType: InstanceType;
  size?: string;
  ingress: number;
  egress: number;
  storage: number;
  maxPartitions: number;
  connections: number;
  connectionRate: number;
  messageSize: number;
};

export const KafkaDetailsTab: FunctionComponent<KafkaDetailsTabProps> = ({
  id,
  createdAt,
  updatedAt,
  owner,
  region,
  expiryDate,
  instanceType,
  size,
  ingress,
  egress,
  storage,
  maxPartitions,
  connections,
  connectionRate,
  messageSize,
}) => {
  const { t } = useTranslation("kafka");

  const renderTextListItem = (title: string, value?: string) =>
    value && (
      <>
        <TextListItem component={TextListItemVariants.dt}>{title}</TextListItem>
        <TextListItem component={TextListItemVariants.dd}>{value}</TextListItem>
      </>
    );

  return (
    <div className="mas--details__drawer--tab-content">
      {instanceType !== "standard" && expiryDate && (
        <DetailsTabAlert expiryDate={expiryDate} />
      )}
      <TextContent>
        <TextList component={TextListVariants.dl}>
          {instanceType === "standard" &&
            renderTextListItem(
              t("common:size"),
              t("create-kafka-instance:size_value", {
                value: size,
              })
            )}
          {renderTextListItem(
            t("ingress"),
            t("create-kafka-instance:ingress_value", {
              value: ingress,
            })
          )}
          {renderTextListItem(
            t("egress"),
            t("create-kafka-instance:egress_value", {
              value: egress,
            })
          )}
          {renderTextListItem(
            t("storage"),
            t("create-kafka-instance:storage_value", {
              value: storage,
            })
          )}
          {renderTextListItem(
            t("partitions"),
            t("create-kafka-instance:partitions_value", {
              value: maxPartitions,
            })
          )}
          {renderTextListItem(
            t("client_connections"),
            t("create-kafka-instance:client_connections_value", {
              value: connections,
            })
          )}
          {renderTextListItem(
            t("connection_rate"),
            t("create-kafka-instance:connection_rate_value", {
              value: connectionRate,
            })
          )}
          {renderTextListItem(
            t("message_size"),
            t("create-kafka-instance:message_size_value", {
              value: messageSize,
            })
          )}
          {renderTextListItem(t("common:id"), id)}
          {renderTextListItem(t("common:owner"), owner)}
          {renderTextListItem(
            t("common:time_created"),
            format(createdAt, "PPPP p")
          )}
          {renderTextListItem(
            t("common:time_updated"),
            format(updatedAt, "PPPP p")
          )}
          {renderTextListItem(
            t("common:cloud_provider"),
            t("common:cloudProviders.aws")
          )}
          {renderTextListItem(t("common:region"), region)}
        </TextList>
      </TextContent>
    </div>
  );
};
