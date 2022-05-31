import {
  Button,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateVariant,
  Title,
} from "@patternfly/react-core";
import CubesIcon from "@patternfly/react-icons/dist/esm/icons/cubes-icon";
import { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";

export const NoDataEmptyState: VoidFunctionComponent<{
  onRefresh: () => void;
}> = ({ onRefresh }) => {
  const { t } = useTranslation("message-browser");
  return (
    <EmptyState variant={EmptyStateVariant.large}>
      <EmptyStateIcon icon={CubesIcon} />
      <Title headingLevel="h4" size="lg">
        {t("no_data_title")}
      </Title>
      <EmptyStateBody>{t("no_data_body")}</EmptyStateBody>
      <Button onClick={onRefresh}>{t("no_data_refresh")}</Button>
    </EmptyState>
  );
};
