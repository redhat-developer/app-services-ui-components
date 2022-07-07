import {
  Button,
  ButtonVariant,
  HelperText,
  HelperTextItem,
} from "@patternfly/react-core";
import type { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";

export const FieldSizeHelperTextTrial: VoidFunctionComponent<{
  onClick: () => void;
}> = ({ onClick }) => {
  const { t } = useTranslation("create-kafka-instance-with-sizes");
  return (
    <>
      <HelperText className={"pf-c-form__helper-text"}>
        <HelperTextItem>{t("trial_kafka_size_description")}</HelperTextItem>
      </HelperText>
      <HelperText>
        <HelperTextItem>
          <Button
            className="pf-c-form__helper-text"
            variant={ButtonVariant.link}
            isInline
            onClick={onClick}
          >
            {t("learn_about_sizes")}
          </Button>
        </HelperTextItem>
      </HelperText>
    </>
  );
};
