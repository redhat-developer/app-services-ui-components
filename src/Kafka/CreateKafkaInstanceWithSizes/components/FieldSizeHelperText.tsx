import {
  Alert,
  AlertVariant,
  HelperText,
  HelperTextItem,
} from "@patternfly/react-core";
import { VoidFunctionComponent } from "react";
import { Trans, useTranslation } from "react-i18next";
import { ExternalLink } from "../../../shared";

export const FieldSizeHelperText: VoidFunctionComponent<{
  remainingQuota: number;
  isPreview: boolean;
  isUnavailable: boolean;
  isError: boolean;
}> = ({ remainingQuota, isPreview, isUnavailable, isError }) => {
  const { t } = useTranslation("create-kafka-instance-with-sizes");
  return (
    <HelperText className={"pf-c-form__helper-text"}>
      <HelperTextItem>
        {t("standard_kafka_streaming_unit", {
          count: remainingQuota,
        })}
      </HelperTextItem>

      {isUnavailable && (
        <Alert
          id="instance-size-unavailable"
          aria-live="polite"
          role={"alert"}
          className="pf-u-mb-md pf-u-mt-lg"
          variant={isError ? "danger" : "warning"}
          title={t("size_unavailable_title")}
          isInline
        >
          {t("size_unavailable_message")}
        </Alert>
      )}
      {isPreview && (
        <Alert
          aria-live="polite"
          role={"alert"}
          className={`pf-u-mb-md ${isUnavailable ? "" : "pf-u-mt-lg"}`}
          variant={AlertVariant.info}
          title={t("size_preview_title")}
          isInline
        >
          <Trans
            ns={"create-kafka-instance-with-sizes"}
            i18nKey={"size_preview_message"}
            components={[
              <ExternalLink
                href={"https://access.redhat.com/articles/6473891"}
                testId={"size-preview-support-link"}
              />,
            ]}
          />
        </Alert>
      )}
    </HelperText>
  );
};
