import {
  Button,
  ButtonVariant,
  Popover,
  TextContent,
} from "@patternfly/react-core";
import type { VoidFunctionComponent } from "react";
import { ExclamationTriangleIcon } from "@patternfly/react-icons";
import { useTranslation } from "react-i18next";
import { ExternalLink } from "../../../shared";

export const SuspendPopover: VoidFunctionComponent = () => {
  const { t } = useTranslation("kafka");
  return (
    <Popover
      alertSeverityVariant={"warning"}
      headerIcon={<ExclamationTriangleIcon />}
      headerContent={t("suspend_popover_title")}
      bodyContent={
        <TextContent>
          <p>{t("suspend_popover_body_1")}</p>
          <p>
            <ExternalLink testId={"suspended-instance-button"} href={"#"}>
              {t("suspend_popover_body_2")}
            </ExternalLink>
          </p>
        </TextContent>
      }
    >
      <Button variant={ButtonVariant.link}>{"Suspended"}</Button>
    </Popover>
  );
};
