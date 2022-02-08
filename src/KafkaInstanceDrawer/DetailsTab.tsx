import React from "react";
import { useTranslation } from "react-i18next";
import {
  TextContent,
  TextList,
  TextListItem,
  TextListItemVariants,
  TextListVariants,
} from "@patternfly/react-core";
import { DetailsTabAlert } from "./DetailsTabAlert";
import { format } from "date-fns";

type DetailsTabProps = {
  id: string;
  created_at: Date;
  updated_at: Date;
  owner: string;
  region: string;
};

export const DetailsTab: React.FunctionComponent<DetailsTabProps> = ({
  id,
  created_at,
  updated_at,
  owner,
  region,
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
      <DetailsTabAlert creationDate={created_at} />
      <TextContent>
        <TextList component={TextListVariants.dl}>
          {renderTextListItem(
            t("common:cloud_provider"),
            t("common:cloudProviders.aws")
          )}
          {renderTextListItem(t("common:region"), region)}
          {renderTextListItem(t("common:id"), id)}
          {renderTextListItem(t("common:owner"), owner)}
          {renderTextListItem(
            t("common:created"),
            format(created_at, "PPPP,p")
          )}
          {renderTextListItem(
            t("common:updated"),
            format(updated_at, "PPPP,p")
          )}
        </TextList>
      </TextContent>
    </div>
  );
};

export default DetailsTab;
