import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateVariant,
  Title,
} from "@patternfly/react-core";
import { SearchIcon } from "@patternfly/react-icons";
import type { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

export const EmptyStateNoMetricsDataForSelection: FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <EmptyState variant={EmptyStateVariant.xs}>
      <EmptyStateIcon icon={SearchIcon} />
      <Title headingLevel="h3" size="lg">
        {t("metrics:empty_state_no_metrics_data_title")}
      </Title>
      <EmptyStateBody>
        {t("metrics:empty_state_no_metrics_data_body")}
      </EmptyStateBody>
    </EmptyState>
  );
};
