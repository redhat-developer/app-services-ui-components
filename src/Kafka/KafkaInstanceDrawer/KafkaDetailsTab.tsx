import React from "react";
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

type KafkaDetailsTabProps = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  expiryDate?: Date;
  owner: string;
  region: string;
};

export const KafkaDetailsTab: React.FunctionComponent<KafkaDetailsTabProps> = ({
  id,
  createdAt,
  updatedAt,
  owner,
  region,
  expiryDate,
}) => {
  const { t } = useTranslation();

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

export default KafkaDetailsTab;
