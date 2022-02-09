import { Alert } from "@patternfly/react-core";
import { addHours, differenceInHours } from "date-fns";
import React from "react";
import { Trans } from "react-i18next";
import { FormatDate } from "../../../shared";

type DetailsTabAlertProps = {
  creationDate: Date;
};

export const DetailsTabAlert: React.FunctionComponent<DetailsTabAlertProps> = ({
  creationDate,
}) => {
  const expiryDate = addHours(creationDate, 48);
  const hoursLeft = differenceInHours(expiryDate, Date.now());
  return (
    <Alert
      variant={
        hoursLeft > 24
          ? "info"
          : hoursLeft < 24 && hoursLeft > 5
          ? "warning"
          : "danger"
      }
      title={
        <Trans
          i18nKey="kafka:will_expire"
          components={{
            time: <FormatDate date={expiryDate} format="expiration" />,
          }}
        />
      }
      aria-live="polite"
      isInline
      className="pf-u-mb-lg"
    />
  );
};
