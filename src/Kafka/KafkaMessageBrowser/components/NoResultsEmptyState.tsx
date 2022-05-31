import {
  Button,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateVariant,
  Title,
} from "@patternfly/react-core";
import SearchIcon from "@patternfly/react-icons/dist/esm/icons/search-icon";
import { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";

export const NoResultsEmptyState: VoidFunctionComponent<{
  onReset: () => void;
}> = ({ onReset }) => {
  const { t } = useTranslation("message-browser");
  return (
    <EmptyState variant={EmptyStateVariant.large}>
      <EmptyStateIcon icon={SearchIcon} />
      <Title headingLevel="h4" size="lg">
        {t("no_results_title")}
      </Title>
      <EmptyStateBody>{t("no_results_body")}</EmptyStateBody>
      <Button variant={"link"} onClick={onReset}>
        {t("no_results_reset")}
      </Button>
    </EmptyState>
  );
};
