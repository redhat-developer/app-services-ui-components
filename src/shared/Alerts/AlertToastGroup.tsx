import type { FunctionComponent } from "react";
import type { AlertProps } from "@rhoas/app-services-ui-shared";
import {
  AlertGroup,
  Alert,
  AlertActionCloseButton,
  AlertVariant,
} from "@patternfly/react-core";

type AlertToastGroupProps = {
  alerts: AlertProps[];
  onCloseAlert: (key: string | undefined) => void;
};

export const AlertToastGroup: FunctionComponent<AlertToastGroupProps> = ({
  alerts,
  onCloseAlert,
}: AlertToastGroupProps) => {
  return (
    <AlertGroup isToast isLiveRegion>
      {alerts.map(
        ({ id, variant, title, description, dataTestId, ...rest }) => (
          <Alert
            key={id}
            isLiveRegion
            variant={AlertVariant[variant]}
            variantLabel="alert-toast-group"
            title={title}
            actionClose={
              <AlertActionCloseButton
                title={title}
                onClose={() => onCloseAlert(id)}
              />
            }
            timeout={8000}
            data-testid={dataTestId}
            {...rest}
          >
            {description}
          </Alert>
        )
      )}
    </AlertGroup>
  );
};
