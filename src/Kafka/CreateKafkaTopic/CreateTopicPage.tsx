import type React from "react";
import { CreateTopicHead, CreateTopicWizard } from "./components";
import type { ConstantValues, NewTopic } from "./types";

export type CreateTopicPageProps = {
  kafkaName: string;
  kafkaPageLink: string;
  kafkaInstanceLink: string;
  onSave: (topicData: NewTopic) => void;
  initialTopicValues: NewTopic;
  onCloseCreateTopic: () => void;
  checkTopicName: (value: string) => Promise<boolean>;
  availablePartitionLimit: number;
  constantValues: ConstantValues;
  isSwitchChecked: boolean;
  setIsSwitchChecked: (value: boolean) => void;
};

export const CreateTopicPage: React.FC<CreateTopicPageProps> = ({
  kafkaName,
  kafkaPageLink,
  kafkaInstanceLink,
  onSave,
  initialTopicValues,
  onCloseCreateTopic,
  checkTopicName,
  availablePartitionLimit,
  constantValues,
  isSwitchChecked,
  setIsSwitchChecked,
}) => {
  return (
    <>
      <CreateTopicHead
        showAllOptions={isSwitchChecked}
        kafkaName={kafkaName}
        kafkaPageLink={kafkaPageLink}
        kafkaInstanceLink={kafkaInstanceLink}
        onShowAllOptions={setIsSwitchChecked}
      />
      <CreateTopicWizard
        constantValues={constantValues}
        isSwitchChecked={isSwitchChecked}
        onCloseCreateTopic={onCloseCreateTopic}
        onSave={onSave}
        initialFieldsValue={initialTopicValues}
        checkTopicName={checkTopicName}
        availablePartitionLimit={availablePartitionLimit}
      />
    </>
  );
};
