import { useState } from "react";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { ReviewPermissionsTable } from "./ReviewPermissionsTable";
import type { AclBinding } from "../types";

const permissionsForAllAccounts: AclBinding[] = [
  {
    resourceType: "CLUSTER",
    resourceName: "*",
    patternType: "LITERAL",
    principal: "User:*",
    operation: "DESCRIBE",
    permission: "ALLOW",
  },
  {
    resourceType: "GROUP",
    resourceName: "*",
    patternType: "LITERAL",
    principal: "User:*",
    operation: "DESCRIBE",
    permission: "ALLOW",
  },
  {
    resourceType: "TOPIC",
    resourceName: "*",
    patternType: "LITERAL",
    principal: "User:*",
    operation: "DESCRIBE",
    permission: "ALLOW",
  },
  {
    resourceType: "TOPIC",
    resourceName: "*",
    patternType: "LITERAL",
    principal: "User:*",
    operation: "DESCRIBE_CONFIGS",
    permission: "ALLOW",
  },
  {
    resourceType: "TOPIC",
    resourceName: "test",
    patternType: "PREFIXED",
    principal: "User:*",
    operation: "CREATE",
    permission: "DENY",
  },
  {
    resourceType: "TOPIC",
    resourceName: "test",
    patternType: "PREFIXED",
    principal: "User:*",
    operation: "WRITE",
    permission: "DENY",
  },
];

const permissionsForSelectedAccount: AclBinding[] = [
  {
    resourceType: "CLUSTER",
    resourceName: "*",
    patternType: "LITERAL",
    principal: "User:*",
    operation: "DESCRIBE",
    permission: "ALLOW",
  },
  {
    resourceType: "GROUP",
    resourceName: "*",
    patternType: "LITERAL",
    principal: "User:*",
    operation: "DESCRIBE",
    permission: "ALLOW",
  },
  {
    resourceType: "TOPIC",
    resourceName: "*",
    patternType: "LITERAL",
    principal: "User:*",
    operation: "DESCRIBE",
    permission: "ALLOW",
  },
  {
    resourceType: "TOPIC",
    resourceName: "*",
    patternType: "LITERAL",
    principal: "User:*",
    operation: "DESCRIBE_CONFIGS",
    permission: "ALLOW",
  },
  {
    operation: "ALL",
    patternType: "PREFIXED",
    permission: "ALLOW",
    principal: "User:test_kafka_devexp",
    resourceName: "test",
    resourceType: "TOPIC",
  },
  {
    operation: "ALL",
    patternType: "PREFIXED",
    permission: "ALLOW",
    principal: "User:test_kafka_devexp",
    resourceName: "test",
    resourceType: "GROUP",
  },
];

export default {
  component: ReviewPermissionsTable,
  args: {},
} as ComponentMeta<typeof ReviewPermissionsTable>;

const AclsReview: ComponentStory<typeof ReviewPermissionsTable> = ({
  acls: initialAcls,
  selectedAccountId,
}) => {
  const [acls, setAcls] = useState<AclBinding[]>(initialAcls);

  const onRemoveAcl = (index: number) => {
    const newAcls = acls.filter((_, i) => i !== index);
    setAcls(newAcls);
  };

  return (
    <ReviewPermissionsTable
      acls={acls}
      selectedAccountId={selectedAccountId}
      onRemoveAcl={onRemoveAcl}
    />
  );
};

export const _Example = AclsReview.bind({});
_Example.args = {
  acls: permissionsForAllAccounts,
  selectedAccountId: "*",
};

export const AllAccountsCanDeleteAllAccounts = AclsReview.bind({});
AllAccountsCanDeleteAllAccounts.args = {
  acls: permissionsForAllAccounts,
  selectedAccountId: "*",
};
AllAccountsCanDeleteAllAccounts.parameters = {
  docs: {
    description: {
      story:
        'If you select all accounts, you see all ACLs assigned to "All accounts" and can remove any of those ACLs.',
    },
  },
};

export const IndividualAccountCanDeleteOnlyOwnRules = AclsReview.bind({});
IndividualAccountCanDeleteOnlyOwnRules.args = {
  acls: permissionsForSelectedAccount,
  selectedAccountId: "test_kafka_devexp",
};
IndividualAccountCanDeleteOnlyOwnRules.parameters = {
  docs: {
    description: {
      story:
        'If you select an individual account, you still see all ACLs assigned to "All accounts" because they affect the selected account, but you cannot remove them because they are not explicitly assigned to the selected account.',
    },
  },
};
