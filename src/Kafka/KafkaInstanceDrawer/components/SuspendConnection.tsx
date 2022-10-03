import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateVariant,
  Title,
  TitleSizes,
} from "@patternfly/react-core";
import { ExclamationTriangleIcon } from "@patternfly/react-icons";
import type { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";

export const SuspendConnection: VoidFunctionComponent = () => {
  const { t } = useTranslation("kafka");
  return (
    <EmptyState variant={EmptyStateVariant.small}>
      <EmptyStateIcon icon={ExclamationTriangleIcon} color={"#f0ab00"} />
      <Title headingLevel={"h1"} size={TitleSizes.lg}>
        {t("suspend_empty_state_title")}
      </Title>
      <EmptyStateBody>{t("suspend_empty_state_body")}</EmptyStateBody>
    </EmptyState>
  );
};
