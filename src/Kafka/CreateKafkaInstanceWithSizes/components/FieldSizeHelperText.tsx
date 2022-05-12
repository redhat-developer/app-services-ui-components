import { Alert, AlertVariant, HelperText } from "@patternfly/react-core";
import { VoidFunctionComponent } from "react";
import { Trans, useTranslation } from "react-i18next";
import { ExternalLink } from "../../../shared";

export const FieldSizeHelperText: VoidFunctionComponent<{
  remainingQuota: number;
  isPreview: boolean;
}> = ({ remainingQuota, isPreview }) => {
  const { t } = useTranslation("create-kafka-instance-with-sizes");
  return (
    <HelperText className={"pf-c-form__helper-text"}>
      {t("standard_kafka_streaming_unit", {
        count: remainingQuota,
      })}

      {isPreview && (
        <Alert
          aria-live="polite"
          role={"alert"}
          className="pf-u-mb-md pf-u-mt-lg"
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
