export enum AclOperation {
  All = "ALL",
  Read = "READ",
  Write = "WRITE",
  Create = "CREATE",
  Delete = "DELETE",
  Alter = "ALTER",
  Describe = "DESCRIBE",
  DescribeConfigs = "DESCRIBE_CONFIGS",
  AlterConfigs = "ALTER_CONFIGS",
}

export enum AclResourceType {
  Group = "GROUP",
  Topic = "TOPIC",
  Cluster = "CLUSTER",
  TransactionalId = "TRANSACTIONAL_ID",
}

export enum AclPatternType {
  Literal = "LITERAL",
  Prefixed = "PREFIXED",
}

export enum AclPermissionType {
  Allow = "ALLOW",
  Deny = "DENY",
}

export interface IAclBinding {
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

export type EnhancedAclBinding = IAclBinding & {
  hash: () => string;
};

export type RemovableEnhancedAclBinding = EnhancedAclBinding & {
  removed: boolean;
  index: number;
};
