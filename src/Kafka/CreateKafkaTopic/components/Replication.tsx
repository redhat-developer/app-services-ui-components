import type React from "react";
import { useTranslation } from "react-i18next";
import {
  FormSection,
  TextContent,
  Text,
  TextVariants,
} from "@patternfly/react-core";
import { TextWithLabelPopover } from "../../../shared";

const Replication: React.FC = () => {
  const { t } = useTranslation(["create-topic", "common"]);

  return (
    <FormSection title={t("replication")} id="replication" titleElement={"h2"}>
      <TextContent>
        <Text component={TextVariants.p}>
          {t("replication_section_info")}
          <Text component={TextVariants.small}>
            {t("replication_section_info_note")}
          </Text>
        </Text>
      </TextContent>

      <TextWithLabelPopover
        fieldId="unclean-leader-election"
        btnAriaLabel={t("unclean_leader_election")}
        fieldLabel={t("unclean_leader_election")}
        fieldValue={t("common:disabled")}
        popoverBody={t("unclean_leader_election_description")}
        popoverHeader={t("unclean_leader_election")}
      />
    </FormSection>
  );
};

export { Replication };
