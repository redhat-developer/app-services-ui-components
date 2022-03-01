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
  principalType?: PrincipalType;
  displayName?: string;
};

export const account: Account[] = [
  {
    id: "id",
    displayName: "displayName",
    principalType: PrincipalType.ServiceAccount,
  },
  {
    id: "id5",
    displayName: "displayName5",
    principalType: PrincipalType.ServiceAccount,
  },
  {
    id: "id2",
    displayName: "displayName2",
    principalType: PrincipalType.ServiceAccount,
  },
  {
    id: "id3",
    displayName: "displayName3",
    principalType: PrincipalType.UserAccount,
  },
  {
    id: "id4",
    displayName: "displayName4",
    principalType: PrincipalType.UserAccount,
  },
  {
    id: "id6",
    displayName: "displayName6",
    principalType: PrincipalType.UserAccount,
  },
  {
    id: "id7",
    displayName: "displayName7",
    principalType: PrincipalType.ServiceAccount,
  },
];
