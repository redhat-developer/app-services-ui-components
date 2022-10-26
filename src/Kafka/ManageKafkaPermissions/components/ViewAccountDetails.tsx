import {
  FormGroup,
  Popover,
  Text,
  TextContent,
  TextVariants,
} from "@patternfly/react-core";
import { OutlinedQuestionCircleIcon } from "@patternfly/react-icons";
import { Trans, useTranslation } from "react-i18next";
import type { AclBinding } from "../types";
import { ReviewPermissionsTable } from "./ReviewPermissionsTable";

export type ViewAccountDetailsProps = {
  accountId: string | undefined;
  existingAcls: AclBinding[];
  onRemoveAcl: (index: number) => void;
  /*
    accounts: Account[];
    isLoading: boolean;
    initialOpen?: boolean;
    onSelectServiceAccount: (value: string) => void;
    onSelectWildcard: () => void;
    onSelectUser: (value: string) => void;
    onTypeUsername: (value: string) => void;
    onClearSelection: () => void;
    */
};

export const ViewAccountDetails: React.VFC<ViewAccountDetailsProps> = ({
  accountId,
  existingAcls,
  onRemoveAcl,
}) => {
  console.log(existingAcls);
  const { t } = useTranslation(["manage-kafka-permissions"]);
  const HelperText: React.FunctionComponent = () => {
    if (accountId === "*") {
      return t("all_accounts_help");
    }
    return (
      <Trans ns={["manage-kafka-permissions"]} i18nKey="selected_account_help">
        Review the list of existing permissions for the selected account. The
        list includes account-specific permissions and permissions applied to
        all accounts within this Kafka instance. Permissions labeled
        <strong>All accounts</strong> cannot be removed when an individual
        account ID is selected.
      </Trans>
    );
  };
  return (
    <>
      <FormGroup
        fieldId="account-name"
        label={t("account_id_title")}
        labelIcon={
          <Popover bodyContent={t("account_id_help")}>
            <OutlinedQuestionCircleIcon />
          </Popover>
        }
        isRequired
      >
        {accountId === "*" ? t("all_accounts_title") : accountId}
      </FormGroup>
      <FormGroup>
        <TextContent>
          <Text component={TextVariants.h2}>{t("review_existing_title")}</Text>
          <Text component={TextVariants.small}>
            <HelperText />
          </Text>
        </TextContent>
        <ReviewPermissionsTable
          acls={existingAcls}
          selectedAccountId={accountId ? accountId : ""}
          onRemoveAcl={onRemoveAcl}
        />
      </FormGroup>
    </>
  );
};
