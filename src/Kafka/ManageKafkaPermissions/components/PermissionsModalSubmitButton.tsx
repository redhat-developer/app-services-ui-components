import { Button, SelectOptionObject } from "@patternfly/react-core";
import { useTranslation } from "react-i18next";

type SubmitButtonProps = {
  selectedAccountId?: string | SelectOptionObject;
};
export const SubmitButton: React.FunctionComponent<SubmitButtonProps> = ({
  selectedAccountId,
}) => {
  const { t } = useTranslation(["manage-kafka-permissions"]);
  {
    return (
      <Button
        variant="primary"
        isDisabled={selectedAccountId === undefined || selectedAccountId === ""}
      >
        {t("manage_permissions_dialog.step_1_submit_button")}
      </Button>
    );
  }
};
