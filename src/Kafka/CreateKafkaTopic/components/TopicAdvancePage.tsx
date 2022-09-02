import type React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActionGroup,
  Button,
  Sidebar,
  ValidatedOptions,
  SidebarContent,
  Form,
  PageSection,
  PageGroup,
  Divider,
} from "@patternfly/react-core";
import type { ConstantValues, NewTopic } from "../types";
import { TopicAdvanceJumpLinks } from "./TopicAdvanceJumpLinks";
import { Message } from "./Message";
import { Log } from "./Log";
import { Replication } from "./Replication";
import { Cleanup } from "./Cleanup";
import { TopicAdvanceIndex } from "./TopicAdvanceIndex";
import { Flush } from "./Flush";
import { CoreConfiguration } from "./CoreConfiguration";

export type TopicAdvancePageProps = {
  isCreate: boolean;
  onConfirm: () => void;
  handleCancel?: () => void;
  topicData: NewTopic;
  setTopicData: (val: NewTopic) => void;
  checkTopicName: (value: string) => Promise<boolean>;
  availablePartitionLimit: number;
  constantValues: ConstantValues;
};

export const TopicAdvancePage: React.FunctionComponent<
  TopicAdvancePageProps
> = ({
  isCreate,
  onConfirm,
  handleCancel,
  topicData,
  setTopicData,
  checkTopicName,
  availablePartitionLimit,
  constantValues,
}) => {
  const { t } = useTranslation(["create-topic", "common"]);
  const actionText = isCreate ? t("create_topic") : t("common:save");

  //states

  const [topicValidated, setTopicValidated] = useState<ValidatedOptions>(
    ValidatedOptions.default
  );
  const [invalidText, setInvalidText] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [warning, setWarning] = useState<boolean>(false);
  const onValidateTopic = () => {
    if (topicData?.name.length < 1) {
      setInvalidText(t("common:required"));
      setTopicValidated(ValidatedOptions.error);
    } else {
      setIsLoading(true);

      checkTopicName(topicData?.name)
        .then((value) =>
          value == false
            ? (setInvalidText(t("already_exists", { name: topicData?.name })),
              setTopicValidated(ValidatedOptions.error))
            : onConfirm()
        )
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <PageSection padding={{ default: "noPadding" }}>
      <Sidebar hasGutter>
        <TopicAdvanceJumpLinks />
        <SidebarContent>
          <PageGroup hasOverflowScroll id="topic-detail-view">
            <PageSection padding={{ default: "noPadding" }}>
              <Form>
                <CoreConfiguration
                  isCreate={isCreate}
                  topicData={topicData}
                  setTopicData={setTopicData}
                  checkTopicName={checkTopicName}
                  availablePartitionLimit={availablePartitionLimit}
                  invalidText={invalidText}
                  setInvalidText={setInvalidText}
                  setTopicValidated={setTopicValidated}
                  topicValidated={topicValidated}
                  setWarning={setWarning}
                  warning={warning}
                />
                <Message
                  defaultMaximumMessageBytes={
                    constantValues.DEFAULT_MAXIMUM_MESSAGE_BYTES
                  }
                  defaultMessageTimestampType={
                    constantValues.DEFAULT_MESSAGE_TIMESTAMP_TYPE
                  }
                  defaultMaxMessageTimestampDiff={
                    constantValues.DEFAULT_MAX_MESSAGE_TIMESTAMP_DIFF_MILLISECONDS
                  }
                />
                <Log
                  topicData={topicData}
                  setTopicData={setTopicData}
                  defaultDeleteRetentionTime={
                    constantValues.DEFAULT_DELETE_RETENTION_TIME_MILLISECONDS
                  }
                  defaultMinCleanbleRatio={
                    constantValues.DEFAULT_MIN_CLEANBLE_RATIO
                  }
                  defaultMinimumCompactionLagTime={
                    constantValues.DEFAULT_MINIMUM_COMPACTION_LAG_TIME_MILLISECONDS
                  }
                />
                <Replication />
                <Cleanup
                  defaultLogSegmentSize={
                    constantValues.DEFAULT_LOG_SEGMENT_SIZE_BYTES
                  }
                  defaultSegmentTime={
                    constantValues.DEFAULT_SEGMENT_TIME_MILLISECONDS
                  }
                  defaultSegmentJitterTime={
                    constantValues.DEFAULT_SEGMENT_JITTER_TIME_MILLISECONDS
                  }
                  defaultFileDeleteDelay={
                    constantValues.DEFAULT_FILE_DELETE_DELAY_MILLISECONDS
                  }
                />
                <TopicAdvanceIndex
                  defaultIndexIntervalSize={
                    constantValues.DEFAULT_INDEX_INTERVAL_SIZE_BYTES
                  }
                  defaultSegmentIndexSize={
                    constantValues.DEFAULT_SEGMENT_INDEX_SIZE_BYTES
                  }
                />
                <Flush
                  defaultFlushIntervalMessages={
                    constantValues.DEFAULT_FLUSH_INTERVAL_MESSAGES
                  }
                  defaultFlushIntervalTime={
                    constantValues.DEFAULT_FLUSH_INTERVAL_TIME_MILLISECONDS
                  }
                />
              </Form>

              <ActionGroup className="kafka-ui--sticky-footer">
                <Divider className="kafka-ui--divider--FlexShrink" />
                <Button
                  isLoading={isLoading}
                  onClick={onValidateTopic}
                  variant="primary"
                  data-testid={
                    isCreate
                      ? "topicAdvanceCreate-actionCreate"
                      : "tabProperties-actionSave"
                  }
                  isDisabled={topicValidated !== "default"}
                >
                  {actionText}
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="link"
                  data-testid={
                    isCreate
                      ? "topicAdvanceCreate-actionCancel"
                      : "tabProperties-actionCancel"
                  }
                >
                  {t("common:cancel")}
                </Button>
              </ActionGroup>
            </PageSection>
          </PageGroup>
        </SidebarContent>
      </Sidebar>
    </PageSection>
  );
};
