import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateVariant,
  Title,
} from "@patternfly/react-core";
import { SearchIcon } from "@patternfly/react-icons";
import type { VoidFunctionComponent } from "react";
import { Trans, useTranslation } from "react-i18next";

export type EmptyStateNoResultsProps = {
  onClearAllFilters: () => void;
};

export const EmptyStateNoResults: VoidFunctionComponent<
  EmptyStateNoResultsProps
> = ({ onClearAllFilters }) => {
  const { t } = useTranslation("kafka");
  return (
    <EmptyState variant={EmptyStateVariant.xs}>
      <EmptyStateIcon icon={SearchIcon} />
      <Title headingLevel="h3" size="lg">
        {t("empty_state_no_results_found_title")}
      </Title>
      <EmptyStateBody>
        <Trans
          ns={"kafka"}
          i18nKey={"empty_state_no_results_found_body"}
          components={[<a onClick={onClearAllFilters} />]}
        />
      </EmptyStateBody>
    </EmptyState>
  );
};
