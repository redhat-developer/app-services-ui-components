import { Select, SelectOption, SelectVariant } from "@patternfly/react-core";
import type { VoidFunctionComponent } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { CheckboxType } from "../types";

export const FilterCheckbox: VoidFunctionComponent<
  Pick<CheckboxType<any>, "chips" | "options" | "onToggle"> & {
    label: string;
  }
> = ({ label, chips, options, onToggle }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Select
      variant={SelectVariant.checkbox}
      aria-label={label}
      toggleAriaLabel={t("common:search_hint", { label })}
      onToggle={setIsOpen}
      onSelect={(_, value) => {
        onToggle(value);
      }}
      selections={chips}
      isOpen={isOpen}
      placeholderText={t("common:search_hint", { label })}
      isCheckboxSelectionBadgeHidden={true}
    >
      {Object.entries(options).map(([key, label]) => (
        <SelectOption key={key} value={key}>
          {label}
        </SelectOption>
      ))}
    </Select>
  );
};
