import React from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Text,
  TextContent,
  TextVariants,
  Form,
  FormSection,
} from "@patternfly/react-core";
import { TextWithLabelPopover } from "../../../shared";

export type StepReplicasProps = {
  replicationFactor: number;
  minInSyncReplica: number;
  isMultiAZ: boolean | undefined;
};

export const StepReplicas: React.FC<StepReplicasProps> = ({
  replicationFactor,
  minInSyncReplica,
  isMultiAZ,
}) => {
  const { t } = useTranslation(["create-topic"]);

  return (
    <Form>
      <FormSection
        title={t("replicas")}
        id="replica-section"
        titleElement={"h2"}
      >
        <TextContent>
          <Text component={TextVariants.p}>{t("replicas_info")}</Text>
          <Text component={TextVariants.small}>{t("replicas_detail")}</Text>
        </TextContent>
        <Alert
          variant="info"
          isInline
          title={
            isMultiAZ
              ? t("replicas_helper_text_multi_az")
              : t("replicas_helper_text_single_az")
          }
        />

        <TextWithLabelPopover
          fieldId="replicas"
          btnAriaLabel={t("replicas")}
          fieldLabel={t("replicas")}
          fieldValue={replicationFactor.toString()}
          popoverBody={t("topic.replicas_description")}
          popoverHeader={t("replicas")}
        />

        <TextWithLabelPopover
          fieldId="min-insync-replicas"
          btnAriaLabel="topic detail min-in-sync replica"
          fieldLabel="Minimum in-sync replicas"
          fieldValue={minInSyncReplica.toString()}
          popoverBody={t("min_insync_replicas_description")}
          popoverHeader={t("min_insync_replicas")}
        />
      </FormSection>
    </Form>
  );
};
