import type React from "react";
import { useTranslation } from "react-i18next";
import {
  FormSection,
  TextContent,
  Text,
  TextVariants,
} from "@patternfly/react-core";
import { TextWithLabelPopover } from "../../../shared";
import convert from "convert";
type TopicAdavanceIndexProps = {
  defaultIndexIntervalSize: number;
  defaultSegmentIndexSize: number;
};

const TopicAdvanceIndex: React.FC<TopicAdavanceIndexProps> = ({
  defaultIndexIntervalSize,
  defaultSegmentIndexSize,
}) => {
  const { t } = useTranslation(["create-topic"]);

  return (
    <FormSection title={t("index")} id="index" titleElement={"h2"}>
      <TextContent>
        <Text component={TextVariants.p} className="section-info">
          {t("index_section_info")}
        </Text>
      </TextContent>

      <TextWithLabelPopover
        fieldId="index-interval-size"
        btnAriaLabel={t("index_interval_size")}
        fieldLabel={t("index_interval_size")}
        fieldValue={t("bytes_to_kibibytes", {
          bytes: defaultIndexIntervalSize,
          kibibytes: convert(defaultIndexIntervalSize, "bytes").to("kibibytes"),
        })}
        popoverBody={t("index_interval_size_description")}
        popoverHeader={t("index_interval_size")}
      />

      <TextWithLabelPopover
        fieldId="segment-index-size"
        btnAriaLabel={t("segment_index_size")}
        fieldLabel={t("segment_index_size")}
        fieldValue={t("bytes_to_mebibytes", {
          bytes: defaultSegmentIndexSize,
          mebibytes: convert(defaultSegmentIndexSize, "bytes").to("mebibytes"),
        })}
        popoverBody={t("segment_index_size_description")}
        popoverHeader={t("segment_index_size")}
      />
    </FormSection>
  );
};

export { TopicAdvanceIndex };
