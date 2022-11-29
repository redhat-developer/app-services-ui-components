import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateVariant,
  Title,
} from "@patternfly/react-core";
import { SearchIcon } from "@patternfly/react-icons";
import type { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";

export const EmptyStateNoResults: VoidFunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <EmptyState variant={EmptyStateVariant.large}>
      <EmptyStateIcon icon={SearchIcon} />
      <Title headingLevel="h2" size="lg">
        {t("common:empty_state_no_results_title")}
      </Title>
      <EmptyStateBody>{t("common:empty_state_no_results_body")}</EmptyStateBody>
    </EmptyState>
  );
};
