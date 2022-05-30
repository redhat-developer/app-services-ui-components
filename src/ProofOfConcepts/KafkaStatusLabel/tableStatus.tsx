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
import { VoidFunctionComponent } from "react";
import "./style.css";

type KafkaStatus =
  | "ready"
  | "creating"
  | "creatingWarning"
  | "creatingError"
  | "degraded"
  | "deleting";

type TableStatusProps = {
  value: KafkaStatus;
};
/**
 * <strong style="font-size:200%">Heads up! This component is promoted to production</strong>
 * Find the latest implementation under `Kafka/Kafka Instance Status/Kafka Instance Status/components/Status Label`
 *
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

    case "degraded":
      return (
        <div>
          <Split hasGutter className="mas-c-status">
            <SplitItem>
              <ExclamationTriangleIcon className="mas-m-degraded" />
            </SplitItem>
            <SplitItem>Degraded</SplitItem>
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
