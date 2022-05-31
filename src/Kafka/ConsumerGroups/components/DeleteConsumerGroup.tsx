import {
  Alert,
  Button,
  ButtonVariant,
  Modal,
  ModalVariant,
  Text,
} from "@patternfly/react-core";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { ConsumerGroupState } from "../types";

export type DeleteConsumerGroupProps = {
  isModalOpen: boolean;
  onClose: () => void;
  onDeleteConsumer: () => void;
  state: ConsumerGroupState;
  consumerName: string;
};

export const DeleteConsumerGroup: FunctionComponent<
  DeleteConsumerGroupProps
> = ({ isModalOpen, onClose, onDeleteConsumer, state, consumerName }) => {
  const { t } = useTranslation("kafka");

  const isConsumerConnected = state === "Stable";

  return (
    <Modal
      variant={ModalVariant.small}
      isOpen={isModalOpen}
      aria-label={t("consumerGroup.delete")}
      title={t("consumerGroup.delete")}
      showClose={true}
      aria-describedby="modal-message"
      onClose={onClose}
      actions={[
        <Button
          variant={ButtonVariant.primary}
          onClick={onDeleteConsumer}
          key={1}
          isDisabled={isConsumerConnected}
        >
          {t("common:delete")}
        </Button>,
        <Button variant="link" onClick={onClose} key={2}>
          {t("common:cancel")}
        </Button>,
      ]}
    >
      {!isConsumerConnected && (
        <Text id="modal-message">
          <label
            htmlFor="instance-name-input"
            dangerouslySetInnerHTML={{
              __html: t("common:confirm_delete_modal_text", {
                name: consumerName,
              }),
            }}
          />
        </Text>
      )}
      {isConsumerConnected && (
        <Alert
          className="modal-alert"
          variant="danger"
          isInline
          title={t("consumerGroup.delete_consumer_connected_alert_title", {
            name: consumerName,
          })}
        >
          <p>{t("consumerGroup.delete_consumer_connected_alert_body")}</p>
        </Alert>
      )}
    </Modal>
  );
};
