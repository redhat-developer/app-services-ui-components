import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Divider,
  PageSection,
  PageSectionTypes,
  PageSectionVariants,
  Wizard,
} from "@patternfly/react-core";
import type { WizardStep } from "@patternfly/react-core";
import {
  StepMessageRetention,
  StepPartitions,
  StepReplicas,
  StepTopicName,
  WizardCustomFooter,
} from "../components";
import type { IWizardFooter } from "../components";
import type { NewTopic } from "../types";
import { PartitionLimitWarning } from "./PartitionLimitWarning";

export type CreateTopicWizardProps = {
  isSwitchChecked: boolean;
  setIsCreateTopic?: (value: boolean) => void;
  onCloseCreateTopic: () => void;
  onSave: (topicData: NewTopic) => void;
  initialFieldsValue: NewTopic;
  checkTopicName: (value: string) => Promise<boolean>;
  availablePartitionLimit: number;
};

export const CreateTopicWizard: React.FC<CreateTopicWizardProps> = ({
  isSwitchChecked,
  onCloseCreateTopic,
  onSave,
  initialFieldsValue,
  checkTopicName,
  availablePartitionLimit,
}) => {
  const { t } = useTranslation(["create-topic", "common"]);

  const [topicNameValidated, setTopicNameValidated] = useState<
    "error" | "default"
  >("default");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [invalidText, setInvalidText] = useState<string>("");
  const [topicData, setTopicData] = useState<NewTopic>(initialFieldsValue);
  const [warningModalOpen, setWarningModalOpen] = useState<boolean>(false);

  const closeWizard = () => {
    onCloseCreateTopic && onCloseCreateTopic();
  };

  const steps: WizardStep[] = [
    {
      name: t("topic_name"),
      enableNext:
        topicData?.name.trim() !== "" && topicNameValidated === "default",
      component: (
        <StepTopicName
          newTopicData={topicData}
          onTopicNameChange={setTopicData}
          topicNameValidated={topicNameValidated}
          onValidationCheck={setTopicNameValidated}
          invalidText={invalidText}
          setInvalidText={setInvalidText}
        />
      ),
    },
    {
      name: t("partitions"),
      canJumpTo: topicData?.name.trim() !== "",
      component: (
        <StepPartitions
          newTopicData={topicData}
          onPartitionsChange={setTopicData}
          availablePartitionLimit={availablePartitionLimit}
        />
      ),
    },
    {
      name: t("message_retention"),
      canJumpTo: topicData?.name.trim() !== "",
      component: (
        <StepMessageRetention
          newTopicData={topicData}
          onChangeMessageRetention={setTopicData}
        />
      ),
    },
    {
      name: t("replicas"),
      canJumpTo: topicData?.name.trim() !== "",
      component: (
        <StepReplicas
          replicationFactor={topicData.replicationFactor}
          minInSyncReplica={topicData.minInSyncReplica}
          isMultiAZ={topicData.isMultiAZ}
        />
      ),
      nextButtonText: t("finish"),
    },
  ];

  const title = t("wizard_title");

  const onValidate: IWizardFooter["onValidate"] = (onNext) => {
    if (topicData?.name.length < 1) {
      setInvalidText(t("common:required"));
      setTopicNameValidated("error");
    } else {
      setIsLoading(true);

      checkTopicName(topicData?.name)
        .then((value) =>
          value == false
            ? (setInvalidText(t("already_exists", { name: topicData?.name })),
              setTopicNameValidated("error"))
            : onNext()
        )
        .finally(() => setIsLoading(false));
    }
  };
  const onSaveTopic = () => {
    if (topicData.numPartitions >= availablePartitionLimit)
      setWarningModalOpen(true);
    else onSave(topicData);
  };
  return (
    <>
      {isSwitchChecked ? (
        <>
          <Divider className="kafka-ui--divider--FlexShrink" />
          <PageSection
            variant={PageSectionVariants.light}
            hasOverflowScroll={true}
          >
            {/*  <TopicAdvanceConfig
              isCreate={true}
              saveTopic={onSave}
              handleCancel={onCloseCreateTopic}
              topicData={topicData}
              setTopicData={setTopicData}
          />*/}
          </PageSection>
        </>
      ) : (
        <PageSection
          variant={PageSectionVariants.light}
          type={PageSectionTypes.wizard}
          hasOverflowScroll={true}
        >
          <Wizard
            navAriaLabel={`${title} steps`}
            mainAriaLabel={`${title} content`}
            steps={steps}
            onClose={closeWizard}
            onSave={onSaveTopic}
            data-testid="topicBasicCreate-Wizard"
            footer={
              <WizardCustomFooter
                isLoading={isLoading}
                onValidate={onValidate}
                topicNameValidated={topicNameValidated}
                closeWizard={closeWizard}
                partitionValue={topicData.numPartitions}
              />
            }
          />
          {warningModalOpen && (
            <PartitionLimitWarning
              topicData={topicData}
              onSave={onSave}
              isModalOpen={warningModalOpen}
              setIsModalOpen={setWarningModalOpen}
            />
          )}
        </PageSection>
      )}
    </>
  );
};
