import {
  Button,
  ButtonVariant,
  HelperText,
  HelperTextItem,
} from "@patternfly/react-core";
import type { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";

export const FieldSizeHelperTextOverQuota: VoidFunctionComponent<{
  remainingQuota: number;
  onClick: () => void;
}> = ({ remainingQuota, onClick }) => {
  const { t } = useTranslation("create-kafka-instance-with-sizes");
  return (
    <>
      <HelperText className={"pf-c-form__helper-text"}>
        <HelperTextItem variant="error" hasIcon>
          {t("standard_kafka_streaming_unit", {
            count: remainingQuota,
          })}
        </HelperTextItem>
      </HelperText>
      <HelperText>
        <HelperTextItem>
          <Button
            className="pf-c-form__helper-text"
            variant={ButtonVariant.link}
            isInline
            onClick={onClick}
          >
            {t("standard_kafka_size_description")}
          </Button>
        </HelperTextItem>
      </HelperText>
    </>
  );
};
