import {
  Button,
  ButtonVariant,
  Modal,
  ModalBoxBody,
  ModalVariant,
} from "@patternfly/react-core";
import type { FunctionComponent } from "react";
import { Children, createContext, useContext, useState } from "react";
import { useTranslation } from "react-i18next";

const ModalContext = createContext<{
  isDeleteEnabled: boolean;
  isDeleting: boolean;
  setDeleteEnabled: (value: boolean) => void;
}>(null!);

export type DeleteModalProps = {
  isModalOpen: boolean;

  title: string;

  isDeleting: boolean;

  ouiaId?: string;

  confirmationValue?: string;

  disableFocusTrap?: boolean;

  appendTo: () => HTMLElement;

  onDelete: () => void;

  onCancel: () => void;

  variant?: "destructive" | "non-destructive";

  isDisabled?: boolean;
};

export const DeleteModal: FunctionComponent<DeleteModalProps> = (props) => {
  const [isDeleteEnabled, setDeleteEnabled] = useState(
    props.confirmationValue === undefined
  );
  return (
    <ModalContext.Provider
      value={{
        isDeleting: props.isDeleting,
        isDeleteEnabled,
        setDeleteEnabled,
      }}
    >
      <DeleteModalConnected {...props} />
    </ModalContext.Provider>
  );
};

export const DeleteModalConnected: FunctionComponent<DeleteModalProps> = ({
  isModalOpen,
  title,
  isDeleting,
  ouiaId = "delete-dialog",
  disableFocusTrap,
  appendTo,
  onDelete,
  onCancel,
  children,
  variant,
  isDisabled,
}) => {
  const { t } = useTranslation();

  const { isDeleteEnabled } = useContext(ModalContext);
  return (
    <Modal
      ouiaId={ouiaId}
      variant={ModalVariant.small}
      isOpen={isModalOpen}
      title={title}
      titleIconVariant={variant === "non-destructive"}
      showClose={!isDeleting}
      onClose={onCancel}
      appendTo={appendTo}
      disableFocusTrap={disableFocusTrap}
      hasNoBodyWrapper={false}
      actions={[
        <Button
          key={"confirm__button"}
          variant={
            variant === "non-destructive"
              ? ButtonVariant.primary
              : ButtonVariant.primary
          }
          onClick={onDelete}
          isDisabled={
            variant === "non-destructive"
              ? isDisabled
              : isDeleting || !isDeleteEnabled
          }
          isLoading={isDeleting}
          ouiaId={"delete"}
        >
          {t("common:delete")}
        </Button>,
        <Button
          key={"cancel__button"}
          variant={ButtonVariant.link}
          onClick={onCancel}
          isDisabled={isDeleting}
          ouiaId={"cancel"}
        >
          {t("common:cancel")}
        </Button>,
      ]}
    >
      {Children.toArray(children)
        .filter((f) => f)
        .map((c, idx) => (
          <ModalBoxBody key={idx}>{c}</ModalBoxBody>
        ))}
    </Modal>
  );
};
