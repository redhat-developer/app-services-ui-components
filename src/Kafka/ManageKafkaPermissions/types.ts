import type { ResourceOperationValue } from "./components/ResourceOperation";
import type { ResourcePermissionValue } from "./components/ResourcePermission";
import type { ResourcePrefixRuleValue } from "./components/ResourcePrefixRule";
import type { ResourceTypeValue } from "./components/ResourceType";

export type AclOperation =
  | "ALL"
  | "READ"
  | "WRITE"
  | "CREATE"
  | "DELETE"
  | "ALTER"
  | "DESCRIBE"
  | "DESCRIBE_CONFIGS"
  | "ALTER_CONFIGS";

export type AclResourceType =
  | "GROUP"
  | "TOPIC"
  | "CLUSTER"
  | "TRANSACTIONAL_ID";

export type AclPatternType = "LITERAL" | "PREFIXED";

export type AclPermissionType = "ALLOW" | "DENY";

export interface AclBinding {
  /**
   *
   * @type {AclResourceType}
   * @memberof AclBinding
   */
  resourceType: AclResourceType;
  /**
   *
   * @type {string}
   * @memberof AclBinding
   */
  resourceName: string;
  /**
   *
   * @type {AclPatternType}
   * @memberof AclBinding
   */
  patternType: AclPatternType;
  /**
   * Identifies the user or service account to which an ACL entry is bound. The literal prefix value of `User:` is required. May be used to specify all users with value `User:*`.
   * @type {string}
   * @memberof AclBinding
   */
  principal: string;
  /**
   *
   * @type {AclOperation}
   * @memberof AclBinding
   */
  operation: AclOperation;
  /**
   *
   * @type {AclPermissionType}
   * @memberof AclBinding
   */
  permission: AclPermissionType;
}
export enum PrincipalType {
  UserAccount = "USER_ACCOUNT",
  ServiceAccount = "SERVICE_ACCOUNT",
}

export type Account = {
  id: string;
  principalType: PrincipalType;
  displayName: string;
};

type ManualAcl = {
  resourceType: ResourceTypeValue | undefined;
  resourcePrefix: ResourcePrefixRuleValue;
  resourceName: string | undefined;
  resourcePermission: ResourcePermissionValue;
  resourceOperation: ResourceOperationValue | undefined;
};

type ProduceTopicTemplate = {
  prefixRuleValue: ResourcePrefixRuleValue;
  resourceNameValue: string | undefined;
};

type ConsumeTopicTemplate = {
  consumerResourceName: string | undefined;
  consumerResourcePrefixRule: ResourcePrefixRuleValue;
  topicResourceName: string | undefined;
  topicResourcePrefixRule: ResourcePrefixRuleValue;
};

type ManageAccessTemplate = {
  instanceName: string;
};
export type AddAclType =
  | ({ type: "manual" } & ManualAcl)
  | ({ type: "consume-topic" } & ConsumeTopicTemplate)
  | ({ type: "produce-topic" } & ProduceTopicTemplate)
  | ({ type: "manage-access" } & ManageAccessTemplate);

export const createEmptyManualAcl = (): AddAclType => {
  return {
    type: "manual",
    resourceName: undefined,
    resourceType: undefined,
    resourceOperation: undefined,
    resourcePrefix: "Is",
    resourcePermission: "allow",
  };
};
export const createEmptyProduceTopicAcl = (): AddAclType => {
  return {
    type: "produce-topic",
    prefixRuleValue: "Is",
    resourceNameValue: undefined,
  };
};
export const createEmptyConsumeTopicAcl = (): AddAclType => {
  return {
    type: "consume-topic",
    consumerResourceName: undefined,
    consumerResourcePrefixRule: "Is",
    topicResourceName: undefined,
    topicResourcePrefixRule: "Is",
  };
};
export const createEmptyManageAccessAcl = (kafkaName: string): AddAclType => {
  return {
    type: "manage-access",
    instanceName: kafkaName,
  };
};
