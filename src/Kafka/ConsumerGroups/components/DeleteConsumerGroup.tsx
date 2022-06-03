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
        isDeleteDisable={isConsumerConnected}
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
            <p>{t("consumerGroup.delete_consumer_connected_alert_body")}</p>
          </Alert>
        ) : (
          <Text id="modal-message">
            <div>
              <Trans
                i18nKey={"common:confirm_delete_modal_text"}
                values={{
                  name: consumerName,
                }}
              />
            </div>
          </Text>
        )}
      </DeleteModal>
    </div>
  );
};
