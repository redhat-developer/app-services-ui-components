import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Account, PrincipalType } from "../types";
import {
  Divider,
  Select,
  SelectGroup,
  SelectOption,
  SelectVariant,
  ValidatedOptions,
  SelectProps,
  SelectOptionObject,
} from "@patternfly/react-core";

export type Validated<T> = {
  value: T;
  validated?: ValidatedOptions;
  errorMessage?: string;
};

export type SelectAccountProps = {
  id: string | undefined | SelectOptionObject;
  onChangeAccount: React.Dispatch<
    React.SetStateAction<string | undefined | SelectOptionObject>
  >;
  accounts: Account[];
  onEscapeModal: (closes: boolean) => void;
  validated: ValidatedOptions;
  onChangeValidation: (value: ValidatedOptions) => void;
};

export const SelectAccount: React.VFC<SelectAccountProps> = ({
  onChangeAccount,
  id,
  accounts,
  onEscapeModal,
  validated,
  onChangeValidation,
}) => {
  const { t } = useTranslation(["manage-kafka-permissions"]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onToggle = (newState: boolean | ((prevState: boolean) => boolean)) => {
    if (newState) {
      onEscapeModal(false);
    } else onEscapeModal(true);

    setIsOpen(newState);
  };

  const clearSelection = () => {
    onChangeAccount(undefined);
    onChangeValidation(ValidatedOptions.error);
    setIsOpen(false);
  };
  const serviceAccountOptions = () => {
    const serviceAccountsLength = accounts.filter(
      (account) => account.principalType === PrincipalType.ServiceAccount
    ).length;
    return serviceAccountsLength
      ? accounts
          .filter(
            (principal) =>
              principal.principalType === PrincipalType.ServiceAccount
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
          ))
      : [
          <SelectOption isNoResultsOption={true} isDisabled={true} key={1}>
            {t("manage_permissions_dialog.no_results_found")}
          </SelectOption>,
        ];
  };

  const userAccountOperations = () => {
    const userAccountsLength = accounts.filter(
      (account) => account.principalType === PrincipalType.UserAccount
    ).length;
    return userAccountsLength
      ? accounts
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
          ))
      : [
          <SelectOption isNoResultsOption={true} isDisabled={true} key={1}>
            {t("manage_permissions_dialog.no_results_found")}
          </SelectOption>,
        ];
  };

  const onSelect: SelectProps["onSelect"] = (_, selection) => {
    onChangeAccount(selection);
    onChangeValidation(ValidatedOptions.default);
    setIsOpen(false);
  };
  const options = [
    <SelectGroup key="all_accounts_group">
      <SelectOption
        key="*"
        value="*"
        description={t("manage_permissions_dialog.all_accounts_description")}
      >
        {t("manage_permissions_dialog.all_accounts_title")}
      </SelectOption>
    </SelectGroup>,

    <Divider key="all_accounts_divider" />,
    <SelectGroup
      label={t("manage_permissions_dialog.all_accounts_service_account_group")}
      key="service_accounts_group"
    >
      {serviceAccountOptions()}
    </SelectGroup>,
    <Divider key="user_account_divider" />,
    <SelectGroup
      label={t("manage_permissions_dialog.all_accounts_user_account_group")}
      key="user_accounts_group"
    >
      {userAccountOperations()}
    </SelectGroup>,
  ];

  const customFilter = (
    _: React.ChangeEvent<HTMLInputElement> | null,
    value: string
  ) => {
    if (!value) {
      return options;
    }

    const input = new RegExp(value, "i");
    return options
      .filter((accounts) => Array.isArray(accounts.props.children))
      .map((account) =>
        account.props.children.filter(
          (allAccounts: {
            props: {
              value: string;
              description: string;
              isNoResultsOption: boolean;
            };
          }) =>
            !allAccounts.props.isNoResultsOption &&
            (input.test(allAccounts.props.value) ||
              input.test(allAccounts.props.description))
        )
      );
  };

  return (
    <Select
      data-testid="acls-select-account"
      variant={SelectVariant.typeahead}
      typeAheadAriaLabel={t("manage_permissions_dialog.account_id_title")}
      onToggle={onToggle}
      onSelect={onSelect}
      onClear={clearSelection}
      selections={id}
      onFilter={customFilter}
      isOpen={isOpen}
      placeholderText={t(
        "manage_permissions_dialog.account_id_typeahead_placeholder"
      )}
      isCreatable={false}
      menuAppendTo="parent"
      validated={validated}
      isGrouped={true}
      maxHeight={400}
    >
      {options}
    </Select>
  );
};
