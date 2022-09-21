import type React from "react";
import { useState } from "react";
import { CreateTopicHead, CreateTopicWizard } from "../components";
import type { ConstantValues, NewTopic } from "../types";

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
}) => {
  const [isSwitchChecked, setIsSwitchChecked] = useState<boolean>(false);

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
