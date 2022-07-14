import { Alert, Text } from "@patternfly/react-core";
import type { FunctionComponent } from "react";
import { Trans, useTranslation } from "react-i18next";
import { DeleteModal } from "../../../shared";
import type { ConsumerGroupState } from "../types";

export type DeleteConsumerGroupProps = {
  isModalOpen: boolean;
  onClose: () => void;
  onDeleteConsumer: () => void;
  state: ConsumerGroupState;
  consumerName: string;
  appendTo: () => HTMLElement;
  disableFocusTrap?: boolean;
};

export const DeleteConsumerGroup: FunctionComponent<
  DeleteConsumerGroupProps
> = ({
  isModalOpen,
  onClose,
  onDeleteConsumer,
  state,
  consumerName,
  appendTo,
  disableFocusTrap,
}) => {
  const { t } = useTranslation("kafka");

  const isConsumerConnected = state === "Stable";

  return (
    <div>
      <DeleteModal
        isDeleting={false}
        isModalOpen={isModalOpen}
        title={t("consumerGroup.delete")}
        onCancel={onClose}
        onDelete={onDeleteConsumer}
        variant={"non-destructive"}
        appendTo={appendTo}
        disableFocusTrap={disableFocusTrap}
        isDisabled={isConsumerConnected}
      >
        {isConsumerConnected ? (
          <Alert
            className="modal-alert"
            variant="danger"
            isInline
            title={t("consumerGroup.delete_consumer_connected_alert_title", {
              name: consumerName,
            })}
          >
            {t("consumerGroup.delete_consumer_connected_alert_body")}
          </Alert>
        ) : (
          <Text id="modal-message">
            <Trans
              ns={"kafka"}
              i18nKey={"consumerGroup.consumer_group_delete_message"}
              values={{
                name: consumerName,
              }}
            />
          </Text>
        )}
      </DeleteModal>
    </div>
  );
};
