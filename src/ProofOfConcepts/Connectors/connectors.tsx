import React from "react";
import { List, ListItem } from "@patternfly/react-core";
import { useTranslation } from "react-i18next";

export const ListHorizontalRules: React.FunctionComponent = () => {
  const { t } = useTranslation("common");

  return (
    <div class="pf-u-background-color-100">
      <List isPlain isBordered>
        <ListItem>
          First
          <p>{t("terms_conditions_modal.content1")}</p>
        </ListItem>
        <ListItem>Second</ListItem>
        <ListItem>Third</ListItem>
      </List>
    </div>
  );
};
