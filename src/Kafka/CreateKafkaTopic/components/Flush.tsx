import type React from "react";
import { useTranslation } from "react-i18next";
import {
  FormSection,
  TextVariants,
  TextContent,
  Text,
} from "@patternfly/react-core";
import { TextWithLabelPopover } from "../../../shared";

type FlushProps = {
  defaultFlushIntervalMessages: string;
  defaultFlushIntervalTime: string;
};

const Flush: React.FC<FlushProps> = ({
  defaultFlushIntervalMessages,
  defaultFlushIntervalTime,
}) => {
  const { t } = useTranslation(["create-topic"]);

  return (
    <FormSection title={t("flush")} id="flush" titleElement={"h2"}>
      <TextContent>
        <Text component={TextVariants.p} className="section-info">
          {t("flush_section_info")}
        </Text>
      </TextContent>

      <TextWithLabelPopover
        fieldId="flush-interval-messages"
        btnAriaLabel={t("flush_interval_messages")}
        fieldLabel={t("flush_interval_messages")}
        fieldValue={t("messages_time", {
          value: defaultFlushIntervalMessages,
        })}
        popoverBody={t("flush_interval_messages_description")}
        popoverHeader={t("flush_interval_messages")}
      />

      <TextWithLabelPopover
        fieldId="flush-interval-time"
        btnAriaLabel={t("flush_interval_time")}
        fieldLabel={t("flush_interval_time")}
        fieldValue={t("milliseconds_time", { value: defaultFlushIntervalTime })}
        popoverBody={t("flush_interval_time_description")}
        popoverHeader={t("flush_interval_time")}
      />
    </FormSection>
  );
};

export { Flush };
