import { Popover, TextContent } from "@patternfly/react-core";
import type { RefObject, VoidFunctionComponent } from "react";
import { ExclamationTriangleIcon } from "@patternfly/react-icons";
import { useTranslation } from "react-i18next";
import { ExternalLink } from "../../../shared";
import type { PopoverProps } from "@patternfly/react-core";

export type SuspendedPopoverProps = {
  children?: PopoverProps["children"];
  reference?: RefObject<HTMLButtonElement>;
};

export const SuspendedPopover: VoidFunctionComponent<SuspendedPopoverProps> = ({
  children,
  reference,
}) => {
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
      position={"right"}
      reference={reference}
    >
      {children}
    </Popover>
  );
};
