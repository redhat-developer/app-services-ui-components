import {
  Alert,
  Button,
  ButtonVariant,
  Stack,
  StackItem,
  Text,
  TextContent,
  TextVariants,
} from "@patternfly/react-core";
import type { VoidFunctionComponent } from "react";
import { Trans, useTranslation } from "react-i18next";
import type { PopoverStatus } from "../types";
import { PopoverStatusOrder } from "../types";
import { StatusProgressStepper } from "./StatusProgressStepper";

export type StatusPopoverContentProps = {
  currentStatus: PopoverStatus;
  showWarning?: boolean;
  showError?: boolean;
  onClickConnectionTabLink: () => void;
  onClickSupportLink: () => void;
};

export const StatusPopoverContent: VoidFunctionComponent<
  StatusPopoverContentProps
> = ({
  currentStatus,
  showWarning = false,
  showError = false,
  onClickConnectionTabLink,
  onClickSupportLink,
}) => {
  const { t } = useTranslation("create-kafka-instance");

  const currentStep = PopoverStatusOrder.findIndex((s) => s === currentStatus);

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
            total: PopoverStatusOrder.length,
          })}
        </StackItem>
        <StackItem>
          <StatusProgressStepper currentStatus={currentStatus} />
        </StackItem>
      </Stack>
    </div>
  );
};
