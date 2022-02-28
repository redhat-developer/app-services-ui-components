import {
  Alert,
  Button,
  Flex,
  FlexItem,
  HelperText,
  HelperTextItem,
  Spinner,
  Split,
  SplitItem,
} from "@patternfly/react-core";
import CheckCircleIcon from "@patternfly/react-icons/dist/js/icons/check-circle-icon";
import ExclamationCircleIcon from "@patternfly/react-icons/dist/js/icons/exclamation-circle-icon";
import { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { KafkaStatus } from "../../types";
import "./StatusLabel.css";

type StatusLabelProps = {
  value: KafkaStatus;
  showWarning?: boolean;
  showError?: boolean;
  withPopover?: boolean;
};

/**
 *<strong> Introduction </strong>
 *These are the various statuses that can show in the Kafka instances table under the "Status" header.
 */
export const StatusLabel = forwardRef<HTMLButtonElement, StatusLabelProps>(
  (
    { value, showWarning = false, showError = false, withPopover = false },
    ref
  ) => {
    const { t } = useTranslation(["create-kafka-instance"]);

    const buttonVariant = withPopover ? "link" : "plain";

    switch (value) {
      case "ready":
        return (
          <div>
            <Split hasGutter className="mas-c-status">
              <SplitItem>
                <CheckCircleIcon className="mas-m-ready" />
              </SplitItem>
              <SplitItem>{t("statuses.ready")}</SplitItem>
            </Split>
          </div>
        );

      case "accepted":
      case "provisioning":
      case "preparing":
        switch (true) {
          case showWarning:
            return (
              <div>
                <Split hasGutter className="mas-c-status">
                  <SplitItem>
                    <Spinner size="md" />
                  </SplitItem>
                  <SplitItem>
                    <Button ref={ref} variant={buttonVariant} isInline>
                      {t("statuses.creating")}
                    </Button>
                  </SplitItem>
                </Split>
                <Alert
                  variant="warning"
                  isInline
                  isPlain
                  title="This is taking longer than expected."
                />
              </div>
            );
          case showError:
            return (
              <div>
                <Split hasGutter className="mas-c-status">
                  <SplitItem>
                    <Spinner size="md" />
                  </SplitItem>
                  <SplitItem>
                    <Button ref={ref} variant={buttonVariant} isInline>
                      {t("statuses.creating")}
                    </Button>
                  </SplitItem>
                </Split>
                <Alert
                  variant="danger"
                  isInline
                  isPlain
                  title="This is taking longer than expected."
                />
              </div>
            );
          default:
            return (
              <div>
                <Split hasGutter className="mas-c-status">
                  <SplitItem>
                    <Spinner size="md" />
                  </SplitItem>
                  <SplitItem>
                    <Button ref={ref} variant={buttonVariant} isInline>
                      {t("statuses.creating")}
                    </Button>
                    <Flex>
                      <FlexItem>
                        <HelperText>
                          <HelperTextItem variant="indeterminate">
                            {t("kafka_status_created_shortly_help")}
                          </HelperTextItem>
                        </HelperText>
                      </FlexItem>
                    </Flex>
                  </SplitItem>
                </Split>
              </div>
            );
        }

      case "degraded":
        return (
          <div>
            <Split hasGutter className="mas-c-status">
              <SplitItem>
                <ExclamationCircleIcon className="mas-m-degraded" />
              </SplitItem>
              <SplitItem>{t("statuses.degraded")}</SplitItem>
            </Split>
          </div>
        );

      case "deleting":
      case "deprovision":
        return (
          <div>
            <p className="mas-m-deleting"> {t("statuses.deleting")}</p>
          </div>
        );
      default:
        return null;
    }
  }
);
