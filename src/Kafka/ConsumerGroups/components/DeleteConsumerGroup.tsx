import { Alert, Text } from "@patternfly/react-core";
import type { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { DeleteModal } from "../../../shared";
import type { ConsumerGroupState } from "../types";

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
    <div>
      <DeleteModal
        isModalOpen={isModalOpen}
        title={t("consumerGroup.delete")}
        isDeleting={isConsumerConnected}
        onCancel={onClose}
        onDelete={onDeleteConsumer}
        variant={"non-destructive"}
        appendTo={() => {
          return document.getElementById("root") || document.body;
        }}
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
      </DeleteModal>
    </div>
  );
};
