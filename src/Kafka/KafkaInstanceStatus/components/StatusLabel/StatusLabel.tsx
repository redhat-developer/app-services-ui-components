import { Flex, FlexItem, Spinner } from "@patternfly/react-core";
import CheckCircleIcon from "@patternfly/react-icons/dist/js/icons/check-circle-icon";
import ExclamationCircleIcon from "@patternfly/react-icons/dist/js/icons/exclamation-circle-icon";
import PendingIcon from "@patternfly/react-icons/dist/js/icons/pending-icon";
import React, {
  FunctionComponent,
  ReactElement,
  VoidFunctionComponent,
} from "react";
import { useTranslation } from "react-i18next";
import { KafkaStatus } from "../../types";
import "./StatusLabel.css";

type StatusLabelProps = {
  value: KafkaStatus;
  withPopover?: boolean;
};

export const StatusLabel: VoidFunctionComponent<StatusLabelProps> = ({
  value,
  withPopover,
}) => {
  const { t } = useTranslation(["create-kafka-instance"]);
  const translations: { [status in KafkaStatus]: string } = {
    ready: t("statuses.ready"),
    failed: t("statuses.failed"),
    accepted: t("statuses.accepted"),
    provisioning: t("statuses.provisioning"),
    preparing: t("statuses.preparing"),
    deprovision: t("statuses.deprovision"),
    deleting: t("statuses.deleting"),
  };
  const statusCopy = translations[value];
  const statusElement = withPopover ? <a>{statusCopy}</a> : statusCopy;

  switch (value) {
    case "ready":
      return (
        <StatusWithIcon
          icon={
            <CheckCircleIcon className="appservices_kafka-instance-status_icon--completed" />
          }
        >
          {statusElement}
        </StatusWithIcon>
      );
    case "failed":
      return (
        <StatusWithIcon
          icon={
            <ExclamationCircleIcon className="appservices_kafka-instance-status_icon--failed" />
          }
        >
          {statusElement}
        </StatusWithIcon>
      );
    case "accepted":
      return (
        <StatusWithIcon icon={<PendingIcon />}>{statusElement}</StatusWithIcon>
      );
    case "provisioning":
    case "preparing":
      return (
        <StatusWithIcon
          icon={<Spinner size="md" aria-valuetext="Creation in progress" />}
        >
          {statusElement}
        </StatusWithIcon>
      );
    case "deprovision":
    case "deleting":
      return <StatusWithIcon>{statusElement}</StatusWithIcon>;
    default:
      return (
        <StatusWithIcon icon={<PendingIcon />}>{statusElement}</StatusWithIcon>
      );
  }
};

const StatusWithIcon: FunctionComponent<{ icon?: ReactElement }> = ({
  icon,
  children,
}) => (
  <Flex display={{ default: "inlineFlex" }}>
    {icon && <FlexItem spacer={{ default: "spacerSm" }}>{icon}</FlexItem>}
    <FlexItem>{children}</FlexItem>
  </Flex>
);
