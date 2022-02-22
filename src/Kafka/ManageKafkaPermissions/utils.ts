import { sentenceCase } from "sentence-case";
import { AclResourceType } from "./types";

export const displayName = (resourceType: AclResourceType): string => {
  switch (resourceType) {
    case AclResourceType.Group:
      return "Consumer group";
      break;
    case AclResourceType.Topic:
      return "Topic";
      break;
    case AclResourceType.Cluster:
      return "Kafka instance";
      break;
    case AclResourceType.TransactionalId:
      return "Transactional ID";
      break;
    default:
      return sentenceCase(resourceType);
      break;
  }
};
