import { Alert } from "@patternfly/react-core";
import { VoidFunctionComponent } from "react";
import OutlinedClockIcon from "@patternfly/react-icons/dist/esm/icons/outlined-clock-icon";
import "./modal.css";
export type ModalAlertProps = {
  customIcon: React.ReactNode;
};

export const TimeAlert: VoidFunctionComponent = ({}) => {
  return (
    <div>
      <Alert
        className="mas-m-modalTop"
        customIcon={<OutlinedClockIcon />}
        variant="info"
        isInline
        isPlain
        title="Your Kafka instance will be ready for use shortly after creation."
      />
    </div>
  );
};
