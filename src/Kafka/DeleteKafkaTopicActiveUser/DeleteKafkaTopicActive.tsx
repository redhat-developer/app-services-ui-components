import type { VoidFunctionComponent } from "react";
import { Trans, useTranslation } from "react-i18next";
import type { DeleteModalProps } from "../../shared";
import { DeleteModal } from "../../shared";

export type DeleteKafkaTopicProps = {
  instanceName: string;
} & Omit<
  DeleteModalProps,
  "title" | "variant" | "confirmationValue" | "children"
>;

export const DeleteKafkaTopicActive: VoidFunctionComponent<
  DeleteKafkaTopicProps
> = ({ instanceName, ...props }) => {
  const { t } = useTranslation("kafka");

  return (
    <DeleteModal
      {...props}
      variant={"destructive"}
      title={t("delete_topic_title")}
      confirmationValue={instanceName}
    >
      <Trans
        ns={"kafka"}
        i18nKey={"delete_topicmessage"}
        components={[<strong />]}
        values={{
          instanceName,
        }}
      />
      <Trans ns={"kafka"} i18nKey={"delete_topic_active_message"} />
    </DeleteModal>
  );
};
