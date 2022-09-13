import {
  Skeleton,
  TextContent,
  TextList,
  TextListItem,
  TextListItemVariants,
  TextListVariants,
} from "@patternfly/react-core";
import type { ReactChild, VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { FormatDate } from "../../shared";
import type { MarketplaceSubscription } from "../types";
import type { InstanceType } from "../utils";
import { DetailsTabAlert } from "./components/DetailsTabAlert";

/**
 * All fields marked as accepting undefined will show a skeleton loader until the value is available.
 * This is to support fetching the data from different APIs.
 */
export type KafkaDetailsTabProps = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  expiryDate: Date | undefined;
  owner: string;
  region: string;
  instanceType: InstanceType;
  size: string | undefined;
  ingress: number | undefined;
  egress: number | undefined;
  storage: number | undefined;
  maxPartitions: number | undefined;
  connections: number | undefined;
  connectionRate: number | undefined;
  messageSize: number | undefined;
  billing: "prepaid" | MarketplaceSubscription | undefined;
  kafkaVersion: string;
};

export const KafkaDetailsTab: VoidFunctionComponent<KafkaDetailsTabProps> = ({
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
  billing,
  kafkaVersion,
}) => {
  const { t } = useTranslation("kafka");

  const renderTextListItem = (title: string, value: ReactChild | undefined) => (
    <>
      <TextListItem component={TextListItemVariants.dt}>{title}</TextListItem>
      {value ? (
        <TextListItem component={TextListItemVariants.dd}>{value}</TextListItem>
      ) : (
        <Skeleton
          width="50%"
          screenreaderText={t("common:skeleton_loader_screenreader_text", {
            contentName: title,
          })}
        />
      )}
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
              size
                ? t("create-kafka-instance:streaming_size_value", {
                    value: size,
                  })
                : undefined
            )}
          {renderTextListItem(
            t("ingress"),
            ingress
              ? t("create-kafka-instance:ingress_value", {
                  value: ingress,
                })
              : undefined
          )}
          {renderTextListItem(
            t("egress"),
            egress
              ? t("create-kafka-instance:egress_value", {
                  value: egress,
                })
              : undefined
          )}
          {renderTextListItem(
            t("storage"),
            storage
              ? t("create-kafka-instance:storage_value", {
                  value: storage,
                })
              : undefined
          )}
          {renderTextListItem(
            t("partitions"),
            maxPartitions
              ? t("create-kafka-instance:partitions_value", {
                  value: maxPartitions,
                })
              : undefined
          )}
          {renderTextListItem(
            t("client_connections"),
            connections
              ? t("create-kafka-instance:client_connections_value", {
                  value: connections,
                })
              : undefined
          )}
          {renderTextListItem(
            t("connection_rate"),
            connectionRate
              ? t("create-kafka-instance:connection_rate_value", {
                  value: connectionRate,
                })
              : undefined
          )}
          {renderTextListItem(
            t("message_size"),
            messageSize
              ? t("create-kafka-instance:message_size_value", {
                  value: messageSize,
                })
              : undefined
          )}

          {renderTextListItem(t("common:id"), id)}
          {renderTextListItem(t("common:kafka_version"), kafkaVersion)}
          {renderTextListItem(t("common:owner"), owner)}
          {renderTextListItem(
            t("common:time_created"),
            <FormatDate date={createdAt} format={"long"} />
          )}
          {renderTextListItem(
            t("common:time_updated"),
            <FormatDate date={updatedAt} format={"long"} />
          )}
          {renderTextListItem(
            t("common:cloud_provider"),
            t("common:cloudProviders.aws")
          )}
          {renderTextListItem(t("common:region"), region)}
          {renderTextListItem(
            t("create-kafka-instance:billing.field_label"),
            (() => {
              if (billing === undefined) {
                return undefined;
              } else if (billing === "prepaid") {
                return t("create-kafka-instance:billing.prepaid_option");
              } else {
                switch (billing.marketplace) {
                  case "aws":
                    return (
                      <>
                        {t("create-kafka-instance:billing.marketplace_aws")}
                        <br />
                        {billing.subscription}
                      </>
                    );
                  case "azure":
                    return (
                      <>
                        {t("create-kafka-instance:billing.marketplace_azure")}
                        <br />
                        {billing.subscription}
                      </>
                    );
                  case "gcp":
                    return (
                      <>
                        {t("create-kafka-instance:billing.marketplace_gcp")}
                        <br />
                        {billing.subscription}
                      </>
                    );
                  case "rhm":
                    return (
                      <>
                        {t("create-kafka-instance:billing.marketplace_rh")}
                        <br />
                        {billing.subscription}
                      </>
                    );
                }
              }
            })()
          )}
        </TextList>
      </TextContent>
    </div>
  );
};
