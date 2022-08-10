import {
  Skeleton,
  TextContent,
  TextList,
  TextListItem,
  TextListItemVariants,
  TextListVariants,
} from "@patternfly/react-core";
import { parseISO } from "date-fns";
import type { ReactChild, VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { FormatDate } from "../../../shared";
import type { KafkaInstance } from "../../types";
import { useKafkaLabels } from "../../useKafkaLabels";
import { DetailsTabAlert } from "./DetailsTabAlert";

/**
 * All fields marked as accepting undefined will show a skeleton loader until the value is available.
 * This is to support fetching the data from different APIs.
 */
export type DetailsTabProps = Omit<KafkaInstance, "status" | "name">;

export const DetailsTab: VoidFunctionComponent<DetailsTabProps> = ({
  id,
  createdAt,
  updatedAt,
  owner,
  provider,
  region,
  expiryDate,
  plan,
  size,
  ingress,
  egress,
  storage,
  maxPartitions,
  connections,
  connectionRate,
  messageSize,
  billing,
}) => {
  const { t } = useTranslation("kafka");
  const labels = useKafkaLabels();

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
    <>
      {plan !== "standard" && expiryDate && (
        <DetailsTabAlert expiryDate={parseISO(expiryDate)} />
      )}
      <TextContent>
        <TextList component={TextListVariants.dl}>
          {plan === "standard" &&
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
          {renderTextListItem(t("common:owner"), owner)}
          {renderTextListItem(
            t("common:time_created"),
            <FormatDate date={parseISO(createdAt)} format={"long"} />
          )}
          {renderTextListItem(
            t("common:time_updated"),
            <FormatDate date={parseISO(updatedAt)} format={"long"} />
          )}
          {renderTextListItem(
            t("common:cloud_provider"),
            labels.providers[provider]
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
    </>
  );
};
