import { Button } from "@patternfly/react-core";
import { useTranslation } from "react-i18next";

type SubmitButtonProps = {
  isButtonDisabled: boolean;
  step: number;
  onChangeStep: (value: number) => void;
};
export const SubmitButton: React.FunctionComponent<SubmitButtonProps> = ({
  isButtonDisabled,
  step,
  onChangeStep,
}) => {
  const { t } = useTranslation(["manage-kafka-permissions"]);
  {
    return step == 1 ? (
      <Button
        variant="primary"
        isDisabled={isButtonDisabled}
        onClick={() => onChangeStep(2)}
      >
        {t("manage_permissions_dialog.step_1_submit_button")}
      </Button>
    ) : (
      <Button variant="primary">
        {t("manage_permissions_dialog.step_2_submit_button")}
      </Button>
    );
  }
};
