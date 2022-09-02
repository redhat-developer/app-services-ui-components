import type React from "react";
import { useTranslation } from "react-i18next";
import {
  FormSection,
  TextContent,
  Text,
  TextVariants,
} from "@patternfly/react-core";
import { TextWithLabelPopover } from "../../../shared";

type MessageProps = {
  defaultMaximumMessageBytes: number;
  defaultMessageTimestampType: string;
  defaultMaxMessageTimestampDiff: string;
};

const Message: React.FC<MessageProps> = ({
  defaultMaximumMessageBytes,
  defaultMessageTimestampType,
  defaultMaxMessageTimestampDiff,
}) => {
  const { t } = useTranslation(["create-topic"]);

  return (
    <FormSection title={t("messages")} id="messages" titleElement={"h2"}>
      <TextContent>
        <Text component={TextVariants.p} className="section-info">
          {t("message_section_info")}
        </Text>
      </TextContent>

      <TextWithLabelPopover
        fieldId="max-message-size"
        btnAriaLabel={t("max_message_size")}
        fieldLabel={t("max_message_size")}
        fieldValue={t("bytes_size", { value: defaultMaximumMessageBytes })}
        popoverBody={t("max_message_size_description")}
        popoverHeader={t("max_message_size")}
      />

      <TextWithLabelPopover
        fieldId="message-timestamp-type"
        btnAriaLabel={t("message_timestamp_type")}
        fieldLabel={t("message_timestamp_type")}
        fieldValue={String(defaultMessageTimestampType)}
        popoverBody={t("message_timestamp_type_description")}
        popoverHeader={t("message_timestamp_type")}
      />
      <TextWithLabelPopover
        fieldId="max-message-timestamp-diff"
        btnAriaLabel={t("max_message_timestamp_diff")}
        fieldLabel={t("max_message_timestamp_diff")}
        fieldValue={t("milliseconds_time", {
          value: defaultMaxMessageTimestampDiff,
        })}
        popoverBody={t("max_message_timestamp_diff_description")}
        popoverHeader={t("max_message_timestamp_diff")}
      />

      <TextWithLabelPopover
        fieldId="compression-type"
        btnAriaLabel={t("compression_type")}
        fieldLabel={t("compression_type")}
        fieldValue={"Producer"}
        popoverBody={t("compression_type_description")}
        popoverHeader={t("compression_type")}
      />

      <TextWithLabelPopover
        fieldId="message-format"
        btnAriaLabel={t("message_format")}
        fieldLabel={t("message_format")}
        fieldValue={"2.7-IV2"}
        popoverBody={t("message_format_description")}
        popoverHeader={t("message_format")}
      />
    </FormSection>
  );
};

export { Message };
