import type React from "react";
import { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { Account } from "../types";
import { PrincipalType } from "../types";
import type { SelectProps } from "@patternfly/react-core";
import { FormGroup, Popover } from "@patternfly/react-core";
import {
  Divider,
  Select,
  SelectGroup,
  SelectOption,
  SelectVariant,
  ValidatedOptions,
} from "@patternfly/react-core";
import { HelpIcon } from "@patternfly/react-icons";

export type SelectAccountProps = {
  value: string | undefined;
  accounts: Account[];
  initialOpen?: boolean;
  onChangeAccount: (value: string | undefined) => void;
};

export const SelectAccount: React.VFC<SelectAccountProps> = ({
  value,
  accounts,
  initialOpen = false,
  onChangeAccount,
}) => {
  const { t } = useTranslation(["manage-kafka-permissions"]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  // for Storybook, allows opening the select programmatically respecting the initialization needed by the modal and Popper.js
  useLayoutEffect(() => setIsOpen(initialOpen), [initialOpen]);

  const onToggle = (newState: boolean) => {
    setIsOpen(newState);
  };

  const clearSelection = () => {
    onChangeAccount(undefined);
    setIsDirty(true);
    setIsOpen(false);
  };

  const noServiceAccounts = [
    <SelectOption
      isNoResultsOption={true}
      isDisabled={true}
      key={t("no_results_found")}
    >
      {t("no_results_found")}
    </SelectOption>,
  ];
  const noUserAccounts = [
    <SelectOption
      isNoResultsOption={true}
      isDisabled={true}
      key={"no_user_accounts"}
    >
      {t("no_results_found")}
    </SelectOption>,
  ];

  function makeOptions(filter = "") {
    const filteredAccounts =
      filter !== ""
        ? accounts.filter(
            (principal) =>
              principal.displayName.includes(filter) ||
              principal.id.includes(filter)
          )
        : accounts;

    const serviceAccountOptions = filteredAccounts
      .filter(
        (principal) => principal.principalType === PrincipalType.ServiceAccount
      )
      .sort((a, b) =>
        a.displayName && b.displayName
          ? a.displayName.localeCompare(b.displayName)
          : -1
      )
      .map((principal, index) => (
        <SelectOption
          key={index}
          value={principal.id}
          description={principal.displayName}
        >
          {principal.id}
        </SelectOption>
      ));

    const userAccountOperations = filteredAccounts
      .filter(
        (principal) => principal.principalType === PrincipalType.UserAccount
      )
      .map((principal, index) => (
        <SelectOption
          key={index}
          value={principal.id}
          description={principal.displayName}
        >
          {principal.id}
        </SelectOption>
      ));

    return [
      <SelectGroup key="all_accounts_group">
        <SelectOption
          key={t("all_accounts_title")}
          value={t("all_accounts_title")}
          description={t("all_accounts_description")}
        >
          {t("all_accounts_title")}
        </SelectOption>
      </SelectGroup>,

      <Divider key="all_accounts_divider" />,
      <SelectGroup
        label={t("all_accounts_service_account_group")}
        key="service_accounts_group"
      >
        {serviceAccountOptions.length
          ? serviceAccountOptions
          : noServiceAccounts}
      </SelectGroup>,
      <Divider key="user_account_divider2" />,
      <SelectGroup
        label={t("all_accounts_user_account_group")}
        key="user_accounts_group"
      >
        {userAccountOperations.length ? userAccountOperations : noUserAccounts}
      </SelectGroup>,
    ];
  }

  const onSelect: SelectProps["onSelect"] = (_, value) => {
    onChangeAccount(value as string);
    setIsDirty(false);
    setIsOpen(false);
  };

  const validated: ValidatedOptions = isDirty
    ? ValidatedOptions.error
    : ValidatedOptions.default;

  return (
    <FormGroup
      fieldId="account-name"
      validated={validated}
      helperTextInvalid={t("common:required")}
      isRequired
      label={t("account_id_title")}
      labelIcon={
        <Popover bodyContent={t("account_id_help")}>
          <button
            type="button"
            onClick={(e) => e.preventDefault()}
            className="pf-c-form__group-label-help"
            aria-label={t("account_help")}
          >
            <HelpIcon noVerticalAlign />
          </button>
        </Popover>
      }
    >
      <Select
        id={"account-id"}
        data-testid="acls-select-account"
        className="kafka-ui--select--limit-height"
        variant={SelectVariant.typeahead}
        typeAheadAriaLabel={t("account_id_title")}
        maxHeight={400}
        onToggle={onToggle}
        onSelect={onSelect}
        onClear={clearSelection}
        selections={value}
        onFilter={(_, value) => makeOptions(value)}
        isOpen={isOpen}
        placeholderText={t("account_id_typeahead_placeholder")}
        isCreatable
        menuAppendTo="parent"
        validated={validated}
        createText={t("resourcePrefix.create_text")}
        isGrouped
        onCreateOption={() => {
          setIsOpen(false);
          setIsDirty(false);
        }}
      >
        {makeOptions()}
      </Select>
    </FormGroup>
  );
};
