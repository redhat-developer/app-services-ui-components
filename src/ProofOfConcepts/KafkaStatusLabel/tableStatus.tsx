import {
  Alert,
  Button,
  Spinner,
  HelperText,
  HelperTextItem,
  Flex,
  FlexItem,
  Split,
  SplitItem,
} from "@patternfly/react-core";
import React, { VoidFunctionComponent } from "react";
import CheckCircleIcon from "@patternfly/react-icons/dist/js/icons/check-circle-icon";
import ExclamationCircleIcon from "@patternfly/react-icons/dist/js/icons/exclamation-circle-icon";
import "./style.css";

type KafkaStatus =
  | "ready"
  | "creating"
  | "creatingWarning"
  | "creatingError"
  | "failed"
  | "deleting";

type TableStatusProps = {
  value: KafkaStatus;
};
/**
 *<strong> Introduction </strong>
 *These are the various statuses that can show in the Kafka instances table under the "Status" header.
 */

export const TableStatus: VoidFunctionComponent<TableStatusProps> = ({
  value,
}) => {
  switch (value) {
    case "ready":
      return (
        <div>
          <Split hasGutter className="mas-c-status">
            <SplitItem>
              <CheckCircleIcon className="mas-m-ready" />
            </SplitItem>
            <SplitItem>Ready</SplitItem>
          </Split>
        </div>
      );

    case "creating":
      return (
        <div>
          <Split hasGutter className="mas-c-status">
            <SplitItem>
              <Spinner size="md" />
            </SplitItem>
            <SplitItem>
              <Button variant="link" isInline>
                Creating
              </Button>
              <Flex>
                <FlexItem>
                  <HelperText>
                    <HelperTextItem variant="indeterminate">
                      This will be ready shortly.
                    </HelperTextItem>
                  </HelperText>
                </FlexItem>
              </Flex>
            </SplitItem>
          </Split>
        </div>
      );

    case "creatingWarning":
      return (
        <div>
          <Split hasGutter className="mas-c-status">
            <SplitItem>
              <Spinner size="md" />
            </SplitItem>
            <SplitItem>
              <Button variant="link" isInline>
                Creating
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

    case "creatingError":
      return (
        <div>
          <Split hasGutter className="mas-c-status">
            <SplitItem>
              <Spinner size="md" />
            </SplitItem>
            <SplitItem>
              <Button variant="link" isInline>
                Creating
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

    case "failed":
      return (
        <div>
          <Split hasGutter className="mas-c-status">
            <SplitItem>
              <ExclamationCircleIcon className="mas-m-failed" />
            </SplitItem>
            <SplitItem>Failed</SplitItem>
          </Split>
        </div>
      );

    case "deleting":
      return (
        <div>
          <p className="mas-m-deleting"> Deleting</p>
        </div>
      );

    default:
      return (
        <div>
          <Split hasGutter className="mas-c-status">
            <SplitItem>
              <CheckCircleIcon className="mas-m-ready" />
            </SplitItem>
            <SplitItem>Ready</SplitItem>
          </Split>
        </div>
      );
  }
};
