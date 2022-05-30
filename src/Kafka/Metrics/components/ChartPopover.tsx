import { Popover } from "@patternfly/react-core";
import { OutlinedQuestionCircleIcon } from "@patternfly/react-icons";
import { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";

type ChartPopoverProps = {
  title: string;
  description: string;
};

export const ChartPopover: VoidFunctionComponent<ChartPopoverProps> = ({
  title,
  description,
}) => {
  const { t } = useTranslation();
  return (
    <Popover
      aria-label={title}
      headerContent={<div>{title}</div>}
      bodyContent={<div>{description}</div>}
    >
      <OutlinedQuestionCircleIcon
        aria-label={t("metrics:chart-popover-icon-screenreader-text", {
          title,
        })}
      />
    </Popover>
  );
};
