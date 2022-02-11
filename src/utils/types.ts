enum AclOperation {
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

enum AclResourceType {
  Group = "GROUP",
  Topic = "TOPIC",
  Cluster = "CLUSTER",
  TransactionalId = "TRANSACTIONAL_ID",
}

export { AclOperation, AclResourceType };
