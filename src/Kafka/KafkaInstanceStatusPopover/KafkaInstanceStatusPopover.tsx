import {
  FunctionComponent,
  useState,
  VoidFunctionComponent,
  useCallback,
} from "react";
import { useTranslation, Trans } from "react-i18next";

import {
  Popover,
  Stack,
  StackItem,
  PopoverProps,
  Alert,
  TextContent,
  Text,
  TextVariants,
  Button,
  ButtonVariant,
} from "@patternfly/react-core";
import {
  KafkaInstanceStatusProgressStepper,
  InstanceStatus,
  Step,
} from "./KafkaInstanceStatusProgressStepper";

type KafkaInstanceStatusPopoverContentProps = {
  currentStatus: InstanceStatus;
  isVertical?: boolean;
  showWarning?: boolean;
  showError?: boolean;
  setIsVisible?: (isOpen: boolean) => void;
  redirectToConnectionTab?: () => void;
  redirectToSupportCase?: () => void;
};

export type KafkaInstanceStatusPopoverProps = {
  isOpen?: boolean;
} & KafkaInstanceStatusPopoverContentProps &
  Omit<PopoverProps, "bodyContent">;

export const KafkaInstanceStatusPopover: FunctionComponent<
  KafkaInstanceStatusPopoverProps
> = ({
  isOpen = false,
  currentStatus,
  children,
  enableFlip = false,
  position = "right",
  isVertical,
  showWarning,
  showError,
  redirectToConnectionTab,
  redirectToSupportCase,
}) => {
  const { t } = useTranslation("create-kafka-instance");

  const [isVisible, setIsVisible] = useState(isOpen);

  return (
    <Popover
      headerContent={t("kafka_status_popover.title")}
      bodyContent={
        <KafkaInstanceStatusPopoverContent
          currentStatus={currentStatus}
          isVertical={isVertical}
          showWarning={showWarning}
          showError={showError}
          setIsVisible={setIsVisible}
          redirectToConnectionTab={redirectToConnectionTab}
          redirectToSupportCase={redirectToSupportCase}
        />
      }
      isVisible={isVisible}
      shouldOpen={() => setIsVisible(true)}
      shouldClose={() => setIsVisible(false)}
      position={position}
      enableFlip={enableFlip}
    >
      {children}
    </Popover>
  );
};

const KafkaInstanceStatusPopoverContent: VoidFunctionComponent<
  KafkaInstanceStatusPopoverContentProps
> = ({
  currentStatus,
  isVertical = false,
  showWarning = false,
  showError = false,
  setIsVisible,
  redirectToConnectionTab,
  redirectToSupportCase,
}) => {
  const { t } = useTranslation("create-kafka-instance");

  const steps: Step[] = [
    {
      id: "pending",
      title: t("kafka_status_popover.pending.title"),
      titleId: "pending",
      status: InstanceStatus.pending,
      description: t("kafka_status_popover.pending.description"),
      "aria-label": t("kafka_status_popover.pending.description"),
    },
    {
      id: "provisioning",
      title: t("kafka_status_popover.provisioning.title"),
      titleId: "provisioning",
      status: InstanceStatus.provisioning,
      description: t("kafka_status_popover.provisioning.description"),
      "aria-label": t("kafka_status_popover.provisioning.description"),
    },
    {
      id: "preparing",
      title: t("kafka_status_popover.preparing.title"),
      titleId: "preparing",
      status: InstanceStatus.preparing,
      description: t("kafka_status_popover.preparing.description"),
      "aria-label": t("kafka_status_popover.preparing.description"),
    },
  ];

  const statusOrders = [
    InstanceStatus.pending,
    InstanceStatus.provisioning,
    InstanceStatus.preparing,
    InstanceStatus.ready,
  ];

  const currentStep = statusOrders.findIndex((s) => s === currentStatus);

  const onClickConnectionTabLink = useCallback(() => {
    setIsVisible && setIsVisible(false);
    redirectToConnectionTab && redirectToConnectionTab();
  }, [redirectToConnectionTab, setIsVisible]);

  const onClickSupportLink = useCallback(() => {
    setIsVisible && setIsVisible(false);
    redirectToSupportCase && redirectToSupportCase();
  }, [redirectToSupportCase, setIsVisible]);

  return (
    <div>
      <Stack hasGutter>
        <StackItem>
          {showWarning && (
            <Alert
              variant="warning"
              isInline
              isPlain
              title={t("kafka_status_popover.warning_or_error_title")}
            >
              <TextContent>
                <Text component={TextVariants.small}>
                  <Trans
                    ns={["create-kafka-instance"]}
                    i18nKey="kafka_status_popover.header_content_with_warning"
                    components={[
                      <Button
                        key="btn-connetcion-tab"
                        variant={ButtonVariant.link}
                        onClick={onClickConnectionTabLink}
                        isInline
                      />,
                    ]}
                  />
                </Text>
              </TextContent>
            </Alert>
          )}
          {showError && (
            <Alert
              variant="danger"
              isInline
              isPlain
              title={t("kafka_status_popover.warning_or_error_title")}
            >
              <TextContent>
                <Text component={TextVariants.small}>
                  <Trans
                    ns={["create-kafka-instance"]}
                    i18nKey="kafka_status_popover.header_content_with_error"
                    components={[
                      <Button
                        key="btn-connetcion-tab"
                        variant={ButtonVariant.link}
                        onClick={onClickConnectionTabLink}
                        isInline
                      />,
                      <Button
                        key="btn-support-case"
                        variant={ButtonVariant.link}
                        onClick={onClickSupportLink}
                        isInline
                      />,
                    ]}
                  />
                </Text>
              </TextContent>
            </Alert>
          )}
          {!showError && !showWarning && (
            <TextContent>
              <Text component={TextVariants.small}>
                <Trans
                  ns={["create-kafka-instance"]}
                  i18nKey="kafka_status_popover.header_content"
                  components={[
                    <Button
                      key="btn-connetcion-tab"
                      variant={ButtonVariant.link}
                      onClick={onClickConnectionTabLink}
                      isInline
                    />,
                  ]}
                />
              </Text>
            </TextContent>
          )}
        </StackItem>
        <StackItem>
          {t("common:progress_stepper_current_step", {
            currentStep,
            total: statusOrders.length - 1,
          })}
        </StackItem>
        <StackItem>
          <KafkaInstanceStatusProgressStepper
            currentStatus={currentStatus}
            steps={steps}
            isVertical={isVertical}
          />
        </StackItem>
      </Stack>
    </div>
  );
};
