import React, { FunctionComponent } from "react";
import { PlusCircleIcon } from "@patternfly/react-icons"
import { useTranslation } from "react-i18next";
import { Button, EmptyState, EmptyStateBody, EmptyStateIcon, EmptyStateVariant, Title } from "@patternfly/react-core";

type TopicEmptyStateProps = {
    onCreateTopic?: () => void;
};

export const TopicEmptyState: FunctionComponent<TopicEmptyStateProps> = ({
    onCreateTopic,
}) => {
    const { t } = useTranslation();

    return (
        <EmptyState variant={EmptyStateVariant.xs}>
            <EmptyStateIcon icon={PlusCircleIcon} />
            <Title headingLevel="h2" size="lg">
                {t("topic.empty_topics_title")}
            </Title>
            <EmptyStateBody>{t("topic.empty_topics_body")}</EmptyStateBody>
            {onCreateTopic && (
                <Button variant="primary" onClick={onCreateTopic}>
                    {t("topic.create_topic")}
                </Button>
            )}
        </EmptyState>
    )
}
