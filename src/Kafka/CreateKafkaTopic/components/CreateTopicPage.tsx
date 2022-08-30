import type React from "react";
import { useState } from "react";
import { CreateTopicHead, CreateTopicWizard } from "../components";
import type { NewTopic } from "../types";

export type CreateTopicPageProps = {
  kafkaName: string;
  kafkaPageLink: string;
  kafkaInstanceLink: string;
  onSave: (topicData: NewTopic) => void;
  initialTopicValues: NewTopic;
  onCloseCreateTopic: () => void;
  checkTopicName: (value: string) => Promise<boolean>;
  availablePartitionLimit: number;
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
