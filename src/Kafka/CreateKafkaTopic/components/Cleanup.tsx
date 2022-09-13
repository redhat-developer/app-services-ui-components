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
type CleanupProps = {
  defaultLogSegmentSize: number;
  defaultSegmentTime: number;
  defaultSegmentJitterTime: number;
  defaultFileDeleteDelay: number;
};

const Cleanup: React.FC<CleanupProps> = ({
  defaultFileDeleteDelay,
  defaultLogSegmentSize,
  defaultSegmentJitterTime,
  defaultSegmentTime,
}) => {
  const { t } = useTranslation(["create-topic", "common"]);

  return (
    <FormSection title={t("cleanup")} id="cleanup" titleElement={"h2"}>
      <TextContent>
        <Text component={TextVariants.p} className="section-info">
          {t("cleanup_section_info")}
        </Text>
      </TextContent>

      <TextWithLabelPopover
        fieldId="log-segment-size"
        btnAriaLabel={t("log_segment_size")}
        fieldLabel={t("log_segment_size")}
        fieldValue={t("bytes_to_gibibyte", {
          bytes: defaultLogSegmentSize,
          gibibyte: convert(defaultLogSegmentSize, "bytes").to("gibibytes"),
        })}
        popoverBody={t("log_segment_size")}
        popoverHeader={t("log_segment_size_description")}
      />

      <TextWithLabelPopover
        fieldId="segement-time"
        btnAriaLabel={t("segement_time")}
        fieldLabel={t("segement_time")}
        fieldValue={t("milliseconds_to_days", {
          milliseconds: defaultSegmentTime,
          days: convert(defaultSegmentTime, "milliseconds").to("days"),
        })}
        popoverBody={t("segement_time_description")}
        popoverHeader={t("segement_time")}
      />

      <TextWithLabelPopover
        fieldId="segment-jitter-time"
        btnAriaLabel={t("segment_jitter_time")}
        fieldLabel={t("segment_jitter_time")}
        fieldValue={t("milliseconds_time", { value: defaultSegmentJitterTime })}
        popoverBody={t("segment_jitter_time_description")}
        popoverHeader={t("segment_jitter_time")}
      />

      <TextWithLabelPopover
        fieldId="file-delete-delay"
        btnAriaLabel={t("file_delete_delay")}
        fieldLabel={t("file_delete_delay")}
        fieldValue={t("milliseconds_to_minute", {
          milliseconds: defaultFileDeleteDelay,
          minute: convert(defaultFileDeleteDelay, "milliseconds").to("minutes"),
        })}
        popoverBody={t("file_delete_delay_description")}
        popoverHeader={t("file_delete_delay")}
      />

      <TextWithLabelPopover
        fieldId="preallocate-log-segment-files"
        btnAriaLabel={t("preallocate_log_segment_files")}
        fieldLabel={t("preallocate_log_segment_files")}
        fieldValue={t("common:disabled")}
        popoverBody={t("preallocate_log_segment_files_description")}
        popoverHeader={t("preallocate_log_segment_files")}
      />
    </FormSection>
  );
};

export { Cleanup };
