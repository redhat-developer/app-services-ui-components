import { useState } from "react";
import { ComponentMeta } from "@storybook/react";
import objectHash from "object-hash";

import {
  ReviewPermissionsTable,
  RemovableEnhancedAclBinding,
} from "./ReviewPermissionsTable";

const permissions = {
  items: [
    {
      resourceType: "CLUSTER",
      resourceName: "*",
      patternType: "LITERAL",
      principal: "User:*",
      operation: "DESCRIBE",
      permission: "ALLOW",
    },
  ],
};

const permissionsForAllAccounts = {
  items: [
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
  ],
};

const permissionsForSelectedAccount = {
  items: [
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
  ],
};

export default {
  component: ReviewPermissionsTable,
  args: {},
} as ComponentMeta<typeof ReviewPermissionsTable>;

const AclsReview = ({ permissions, selectedAccountId }) => {
  const newAcls = permissions.map((v, k) => {
    const answer = v as RemovableEnhancedAclBinding;
    answer.index = k;
    return {
      ...answer,
      principal: v.principal.substring(5),
      hash: () => {
        return objectHash(v);
      },
    };
  });

  const [acls, setAcls] = useState<RemovableEnhancedAclBinding[]>(newAcls);

  const onRemoveAcl = (acl: RemovableEnhancedAclBinding) => {
    setAcls((prevState) => {
      return prevState.map((v) => {
        if (v.hash() === acl.hash()) {
          v.removed = true;
        }
        return v;
      });
    });
  };

  return (
    <ReviewPermissionsTable
      acls={acls}
      selectedAccountId={selectedAccountId}
      onChangeAcls={setAcls}
      onRemoveAcl={onRemoveAcl}
    />
  );
};

export const AclsReviewForAllAccounts = () => (
  <AclsReview
    permissions={permissionsForAllAccounts.items}
    selectedAccountId="*"
  />
);

export const AclsReviewForSelectedAccount = () => (
  <AclsReview
    permissions={permissionsForSelectedAccount.items}
    selectedAccountId="test_kafka_devexp"
  />
);

export const AclsReviewEmpty = () => (
  <AclsReview
    permissions={permissions.items.map((v) => {
      const answer = v as RemovableEnhancedAclBinding;
      answer.removed = true;
      return answer;
    })}
    selectedAccountId="*"
  />
);
