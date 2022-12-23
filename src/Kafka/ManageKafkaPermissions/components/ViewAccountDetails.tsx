import { Text, TextContent, TextVariants } from "@patternfly/react-core";
import { Trans, useTranslation } from "react-i18next";
import type { AclBinding } from "../types";
import { ReviewPermissionsTable } from "./ReviewPermissionsTable";

export type ViewAccountDetailsProps = {
  accountId: string | undefined;
  existingAcls: AclBinding[];
  onRemoveAcl: (index: number) => void;
};

export const ViewAccountDetails: React.VFC<ViewAccountDetailsProps> = ({
  accountId,
  existingAcls,
  onRemoveAcl,
}) => {
  const { t } = useTranslation(["manage-kafka-permissions"]);
  const HelperText: React.FunctionComponent = () => {
    if (accountId === "All accounts") {
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
      <TextContent>
        <Text component={TextVariants.small}>
          <HelperText />
        </Text>
      </TextContent>
      <ReviewPermissionsTable
        acls={existingAcls}
        selectedAccountId={accountId ? accountId : ""}
        onRemoveAcl={onRemoveAcl}
      />
    </>
  );
};
