import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FormGroupWithPopover } from "../../../shared/FormGroupWithPopover";
import { Principal, PrincipalType } from "./ManagePermissionsModal";
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
  id: Validated<string | undefined | SelectOptionObject>;
  onChangeAccount: React.Dispatch<
    React.SetStateAction<Validated<string | undefined | SelectOptionObject>>
  >;
  initialOptions: Principal[];
  onEscapeModal: (closes: boolean) => void;
};

export const SelectAccount: React.VFC<SelectAccountProps> = ({
  onChangeAccount,
  id,
  initialOptions,
  onEscapeModal,
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
    onChangeAccount({
      value: undefined,
      validated: ValidatedOptions.error,
      errorMessage: t("common:required"),
    });
    setIsOpen(false);
  };

  const onSelect: SelectProps["onSelect"] = (_, selection) => {
    onChangeAccount({
      value: selection,
      validated: ValidatedOptions.default,
    });
    setIsOpen(false);
  };
  const options = initialOptions.length
    ? [
        <SelectGroup key="all_accounts_group">
          <SelectOption
            key="*"
            value="*"
            description={t(
              "manage_permissions_dialog.all_accounts_description"
            )}
          >
            {t("manage_permissions_dialog.all_accounts_title")}
          </SelectOption>
        </SelectGroup>,
        <Divider key="all_accounts_divider" />,
        <SelectGroup
          label={t(
            "manage_permissions_dialog.all_accounts_service_account_group"
          )}
          key="service_accounts_group"
        >
          {initialOptions
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
            ))}
        </SelectGroup>,
        <Divider key="user_account_divider" />,
        <SelectGroup
          label={t("manage_permissions_dialog.all_accounts_user_account_group")}
          key="user_accounts_group"
        >
          {initialOptions
            .filter(
              (principal) =>
                principal.principalType === PrincipalType.UserAccount
            )
            .map((principal, index) => (
              <SelectOption
                key={index}
                value={principal}
                description={principal.displayName}
              >
                {principal.id}
              </SelectOption>
            ))}
        </SelectGroup>,
      ]
    : [];

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
          (allAccounts: { props: { value: string; description: string } }) =>
            input.test(allAccounts.props.value) ||
            input.test(allAccounts.props.description)
        )
      );
  };

  return (
    <FormGroupWithPopover
      labelHead={t("manage_permissions_dialog.account_id_title")}
      fieldId="kafka-instance-name"
      fieldLabel={t("manage_permissions_dialog.account_id_title")}
      labelBody={t("manage_permissions_dialog.account_id_help")}
      buttonAriaLabel={t("manage_permissions_dialog.account_id_aria")}
      isRequired={true}
      helperTextInvalid={id.errorMessage}
      validated={id.validated || ValidatedOptions.default}
    >
      <Select
        data-testid="acls-select-account"
        variant={SelectVariant.typeahead}
        className="kafka-ui--select--limit-height"
        typeAheadAriaLabel={t(
          "manage_permissions_dialog.account_id_typeahead_placeholder"
        )}
        onToggle={onToggle}
        onSelect={onSelect}
        onClear={clearSelection}
        selections={id.value}
        onFilter={customFilter}
        isOpen={isOpen}
        placeholderText={t(
          "manage_permissions_dialog.account_id_typeahead_placeholder"
        )}
        placeholder={t(
          "manage_permissions_dialog.account_id_typeahead_placeholder"
        )}
        isCreatable={false}
        menuAppendTo="parent"
        validated={id.validated || ValidatedOptions.default}
        isGrouped={true}
        maxHeight={400}
      >
        {options}
      </Select>
    </FormGroupWithPopover>
  );
};
