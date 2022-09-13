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
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@patternfly/react-icons";
import { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import type { Status } from "../../types";
import {
  CreatingStatuses,
  DegradedStatuses,
  DeletingStatuses,
  ReadyStatuses,
} from "../../types";
import "./StatusLabel.css";

type StatusLabelProps = {
  value: Status;
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
    const { t } = useTranslation("kafka");

    const buttonVariant = withPopover ? "link" : "plain";

    switch (true) {
      case ReadyStatuses.includes(value):
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

      case CreatingStatuses.includes(value):
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
                  title={t("status_warning_or_error_title")}
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
                            {t("status_created_shortly_help")}
                          </HelperTextItem>
                        </HelperText>
                      </FlexItem>
                    </Flex>
                  </SplitItem>
                </Split>
              </div>
            );
        }

      case DegradedStatuses.includes(value):
        return (
          <div>
            <Split hasGutter className="mas-c-status">
              <SplitItem>
                <ExclamationTriangleIcon className="mas-m-degraded" />
              </SplitItem>
              <SplitItem>{t("statuses.degraded")}</SplitItem>
            </Split>
          </div>
        );

      case DeletingStatuses.includes(value):
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
