import type { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { SearchInput } from "../../SearchInput";
import type { SearchType } from "../types";

export const FilterSearch: VoidFunctionComponent<
  Pick<SearchType, "onSearch" | "validate" | "errorMessage"> & { label: string }
> = ({ label, onSearch, validate, errorMessage }) => {
  const { t } = useTranslation();

  return (
    <SearchInput
      placeholder={t("common:search_hint", { label })}
      onSearch={onSearch}
      validate={validate}
      errorMessage={errorMessage}
    />
  );
};
