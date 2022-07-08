import type { VoidFunctionComponent } from "react";
import { Trans, useTranslation } from "react-i18next";
import type { DeleteModalProps } from "../../shared";
import { DeleteModal } from "../../shared";

export type DeleteKafkaInstanceProps = {
  instanceName: string;
} & Omit<
  DeleteModalProps,
  "title" | "variant" | "confirmationValue" | "children"
>;

export const DeleteKafkaInstance: VoidFunctionComponent<
  DeleteKafkaInstanceProps
> = ({ instanceName, ...props }) => {
  const { t } = useTranslation("kafka");

  return (
    <DeleteModal
      {...props}
      variant={"destructive"}
      title={t("delete_instance_title")}
      confirmationValue={instanceName}
    >
      <Trans
        ns={"kafka"}
        i18nKey={"delete_instance_message"}
        components={[<strong />]}
        values={{
          instanceName,
        }}
      />
    </DeleteModal>
  );
};
