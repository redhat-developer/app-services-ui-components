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
import { Trans, useTranslation } from "react-i18next";

export type EmptyStateNoInstancesProps = {
  onCreate: () => void;
  onQuickstartGuide: () => void;
};

export const EmptyStateNoInstances: VoidFunctionComponent<
  EmptyStateNoInstancesProps
> = ({ onCreate, onQuickstartGuide }) => {
  const { t } = useTranslation("kafka");
  return (
    <EmptyState variant={EmptyStateVariant.xs}>
      <EmptyStateIcon icon={PlusCircleIcon} />
      <Title headingLevel="h3" size="lg">
        {t("empty_state_no_instances_title")}
      </Title>
      <EmptyStateBody>
        <Trans
          ns={"kafka"}
          i18nKey={"empty_state_no_instances_body"}
          components={[<a onClick={onQuickstartGuide} />]}
        />
      </EmptyStateBody>
      <Button ouiaId="button-create" variant="primary" onClick={onCreate}>
        {t("empty_state_no_instances_create_instance")}
      </Button>
    </EmptyState>
  );
};
