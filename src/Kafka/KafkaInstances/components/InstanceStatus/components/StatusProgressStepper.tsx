import { ProgressStep, ProgressStepper } from "@patternfly/react-core";
import type { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import type { PopoverStatus } from "../types";
import { PopoverStatusOrder } from "../types";

type StatusProgressStepperProps = {
  currentStatus: PopoverStatus;
};

export const StatusProgressStepper: VoidFunctionComponent<
  StatusProgressStepperProps
> = ({ currentStatus }) => {
  const { t } = useTranslation("create-kafka-instance");

  const currentStep = PopoverStatusOrder.findIndex((s) => s === currentStatus);

  const getVariant = (index: number) =>
    (currentStep === index && "info") ||
    (currentStep > index && "success") ||
    "default";

  return (
    <ProgressStepper isVertical={true}>
      <ProgressStep
        id={"pending"}
        titleId={"pending"}
        isCurrent={currentStatus === "pending"}
        description={t("kafka_status_popover.pending.description")}
        aria-label={t("kafka_status_popover.pending.description")}
        variant={getVariant(0)}
      >
        {t("kafka_status_popover.pending.title")}
      </ProgressStep>

      <ProgressStep
        id={"provisioning"}
        titleId={"provisioning"}
        isCurrent={currentStatus === "provisioning"}
        description={t("kafka_status_popover.provisioning.description")}
        aria-label={t("kafka_status_popover.provisioning.description")}
        variant={getVariant(1)}
      >
        {t("kafka_status_popover.provisioning.title")}
      </ProgressStep>
      <ProgressStep
        id={"preparing"}
        titleId={"preparing"}
        isCurrent={currentStatus === "preparing"}
        description={t("kafka_status_popover.preparing.description")}
        aria-label={t("kafka_status_popover.preparing.description")}
        variant={getVariant(2)}
      >
        {t("kafka_status_popover.preparing.title")}
      </ProgressStep>
    </ProgressStepper>
  );
};
