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

import { InstanceType } from "../../utils";

type KafkaDetailsTabProps = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  expiryDate?: Date;
  owner: string;
  region: string;
  instanceType: InstanceType;
  size?: string;
  ingress: string;
  egress: string;
  storage: string;
  maxPartitions: string;
  connections: string;
  connectionRate: string;
  messageSize: string;
  /*isTesting flag is temporary for show some contet in storybook, not in productio. 
  It will be remove when actual data will available*/
  isTesting?: boolean;
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
  isTesting = false,
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
      <DetailsTabAlert expiryDate={expiryDate} />
      <TextContent>
        <TextList component={TextListVariants.dl}>
          {isTesting && (
            <>
              {renderTextListItem(
                t("common:type"),
                instanceType === "eval"
                  ? t("common:trial")
                  : t("common:standard")
              )}
              {instanceType === "eval" && renderTextListItem(t("size"), size)}
              {renderTextListItem(t("ingress"), ingress)}
              {renderTextListItem(t("egress"), egress)}
              {renderTextListItem(t("storage"), storage)}
              {renderTextListItem(t("partitions"), maxPartitions)}
              {renderTextListItem(t("client_connections"), connections)}
              {renderTextListItem(t("connection_rate"), connectionRate)}
              {renderTextListItem(t("message_size"), messageSize)}
            </>
          )}
          {renderTextListItem(
            t("common:cloud_provider"),
            t("common:cloudProviders.aws")
          )}
          {renderTextListItem(t("common:region"), region)}
          {renderTextListItem(t("common:id"), id)}
          {renderTextListItem(t("common:owner"), owner)}
          {renderTextListItem(t("common:created"), format(createdAt, "PPPP,p"))}
          {renderTextListItem(t("common:updated"), format(updatedAt, "PPPP,p"))}
        </TextList>
      </TextContent>
    </div>
  );
};
