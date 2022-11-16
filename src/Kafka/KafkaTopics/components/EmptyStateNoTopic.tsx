import {
  Button,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateVariant,
  Title,
} from "@patternfly/react-core";
import { PlusCircleIcon } from "@patternfly/react-icons";
import type { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";

export type EmptyStateNoTopicProps = {
  onCreateTopic: () => void;
};

export const EmptyStateNoTopic: VoidFunctionComponent<
  EmptyStateNoTopicProps
> = ({ onCreateTopic }) => {
  const { t } = useTranslation("topic");

  return (
    <EmptyState
      data-ouia-page-id="emptyStateTopics"
      variant={EmptyStateVariant.large}
    >
      <EmptyStateIcon icon={PlusCircleIcon} />
      <Title headingLevel="h2" size="lg">
        {t("empty_topics_title")}
      </Title>
      <EmptyStateBody>{t("empty_topics_body")}</EmptyStateBody>
      <Button
        data-testid="actionCreateTopic"
        ouiaId="button-create"
        variant="primary"
        onClick={onCreateTopic}
      >
        {t("create_topic")}
      </Button>
    </EmptyState>
  );
};
