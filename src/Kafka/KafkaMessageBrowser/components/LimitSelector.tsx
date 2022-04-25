import {
  InputGroup,
  InputGroupText,
  Select,
  SelectOption,
} from "@patternfly/react-core";
import { useState, VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";

export type LimitSelectorProps = {
  value: number;
  isDisabled: boolean;
  onChange: (value: number) => void;
};
export const LimitSelector: VoidFunctionComponent<LimitSelectorProps> = ({
  value,
  isDisabled,
  onChange,
}) => {
  const { t } = useTranslation("message-browser");
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = (isOpen: boolean) => setIsOpen(isOpen);
  const titleId = "limit-selector";

  return (
    <InputGroup>
      <InputGroupText className="pf-c-content">
        {t("limit_label")}
      </InputGroupText>
      <div>
        <span id={titleId} hidden>
          Select a state
        </span>

        <Select
          aria-label={t("per_page_aria_label")}
          onToggle={toggleOpen}
          selections={value !== undefined ? [t("limit", { value })] : undefined}
          isOpen={isOpen}
          isDisabled={isDisabled}
          onSelect={() => setIsOpen(false)}
        >
          {[10, 20, 50].map((value, idx) => (
            <SelectOption
              key={idx}
              value={t("limit", { value })}
              onClick={() => onChange(value)}
            />
          ))}
        </Select>
      </div>
    </InputGroup>
  );
};
