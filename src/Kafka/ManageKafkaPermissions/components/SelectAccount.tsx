import React, { useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { Account } from "../types";
import { PrincipalType } from "../types";
import type { SelectProps } from "@patternfly/react-core";
import {
  Divider,
  Select,
  SelectGroup,
  SelectOption,
  SelectVariant,
  ValidatedOptions,
} from "@patternfly/react-core";
import { FormGroupWithPopover } from "../../../shared";

export type SelectAccountProps = {
  value: string | undefined;
  accounts: Account[];
  isLoading: boolean;
  initialOpen?: boolean;
  onSelectServiceAccount: (value: string) => void;
  onSelectWildcard: () => void;
  onSelectUser: (value: string) => void;
  onTypeUsername: (value: string) => void;
  onClearSelection: () => void;
};

export const SelectAccount: React.VFC<SelectAccountProps> = ({
  value,
  accounts,
  initialOpen = false,
  isLoading,
  onSelectServiceAccount,
  onSelectUser,
  onSelectWildcard,
  onTypeUsername,
  onClearSelection,
}) => {
  const { t } = useTranslation(["manage-kafka-permissions"]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [validationMessage, setValidationMessage] = useState<string>();
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [selectKey, setSelectKey] = useState(Math.random());
  useEffect(() => setSelectKey(Math.random()), [accounts]);

  // for Storybook, allows opening the select programmatically respecting the initialization needed by the modal and Popper.js
  useLayoutEffect(() => setIsOpen(initialOpen), [initialOpen]);

  const onToggle = (newState: boolean) => {
    setIsOpen(newState);
  };

  const clearSelection = () => {
    onClearSelection();
    setIsDirty(true);
    setIsOpen(false);
    setValidationMessage(t("common:required"));
  };

  const noServiceAccounts = [
    <SelectOption isNoResultsOption={true} isDisabled={true} key={1}>
      {t("no_results_found")}
    </SelectOption>,
  ];
  const noUserAccounts = [
    <SelectOption isNoResultsOption={true} isDisabled={true} key={1}>
      {t("no_results_found")}
    </SelectOption>,
  ];

  function makeOptions(filter = "") {
    const filterRegExp = new RegExp(filter, "i");
    const filteredAccounts =
      filter !== ""
        ? accounts.filter(
            (principal) =>
              filterRegExp.test(principal.displayName) ||
              filterRegExp.test(principal.id)
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
          onClick={() => onSelectServiceAccount(principal.id)}
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
          onClick={() => onSelectUser(principal.id)}
        >
          {principal.id}
        </SelectOption>
      ));

    return [
      <SelectGroup key="all_accounts_group">
        <SelectOption
          key="*"
          value="*"
          description={t("all_accounts_description")}
          onClick={() => onSelectWildcard()}
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
      <Divider key="user_account_divider" />,
      <SelectGroup
        label={t("all_accounts_user_account_group")}
        key="user_accounts_group"
      >
        {userAccountOperations.length ? userAccountOperations : noUserAccounts}
      </SelectGroup>,
      <Divider key="user_accounts_divider" />,
    ];
  }

  const onSelect: SelectProps["onSelect"] = (_, value) => {
    const regExp = new RegExp("^[0-9A-Za-z_.-]+$");
    if (regExp.test(value as string)|| value==='*') setIsDirty(false);
    else setIsDirty(true);
    setIsOpen(false);
  };

  const validationCheck = (value: string) => {
    onTypeUsername(value);
    setValidationMessage(t("invalid_user_account"));
  };

  const validated: ValidatedOptions = isDirty
    ? ValidatedOptions.error
    : ValidatedOptions.default;

  return (
    <FormGroupWithPopover
      labelHead={t("account_id_title")}
      fieldId="account-id"
      fieldLabel={t("account_id_title")}
      labelBody={t("account_id_help")}
      buttonAriaLabel={t("account_id_aria")}
      isRequired={true}
      validated={validated}
      helperTextInvalid={validationMessage}
    >
      <Select
        id={"account-id"}
        key={selectKey}
        data-testid="acls-select-account"
        variant={SelectVariant.typeahead}
        typeAheadAriaLabel={t("account_id_title")}
        onToggle={onToggle}
        onSelect={onSelect}
        onClear={clearSelection}
        selections={value}
        onFilter={(_, value) => makeOptions(value)}
        isOpen={isOpen}
        placeholderText={t("account_id_typeahead_placeholder")}
        isCreatable={true}
        menuAppendTo="parent"
        validated={validated}
        createText={t("resourcePrefix.create_text")}
        isGrouped={true}
        maxHeight={400}
        loadingVariant={isLoading ? "spinner" : undefined}
        onCreateOption={(value) => validationCheck(value)}
      >
        {makeOptions()}
      </Select>
    </FormGroupWithPopover>
  );
};
