import { ResourceTypeValue } from "../Kafka/ManageKafkaPermissions/components/ResourceType";

export const makeSelectOptions = (resourceType: ResourceTypeValue) => {
  switch (resourceType) {
    case "consumer-group": {
      return ["consumerGroup1,console-consumer-2,test-consumer,my-consumer"];
    }
    case "kafka-instance": {
      return ["instance-test", "console-instance", "test", "my-instance"];
    }
    case "topic": {
      return ["topic", "my-topic", "topic-test"];
    }
    case "transactional-id": {
      return ["id-test", "console-id", "transactional-test-id", "my-id"];
    }
  }
};

export function fakeApi<T>(response: T, waitLengthMs = 500): Promise<T> {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => resolve(response), waitLengthMs);
    return () => clearTimeout(timeout);
  });
}

export const getSelectOptions = (
  resourceType: ResourceTypeValue,
  waitLengthMs?: number
) => {
  return fakeApi<string[]>(makeSelectOptions(resourceType), waitLengthMs);
};

export const validationText = (
  resourceType: ResourceTypeValue | undefined,
  resourcePreixCondition: "starts-with" | "is",
  filter: string | undefined
) => {
  const regExp = new RegExp("^[0-9A-Za-z_.-]+$");
  if (filter === undefined) return undefined;
  if (resourcePreixCondition == "is" && resourceType == "topic") {
    if (filter == "." || filter == "..")
      return "A topic name must contain at least 3 periods (...) if periods are the only characters used";
  }
  if (resourceType == "topic" && !regExp.test(filter))
    return "Valid characters in a topic name include letters (Aa-Zz), numbers, underscores ( _ ), periods ( . ), and hyphens ( - ).";

  if (resourceType == "consumer-group" && !regExp.test(filter))
    return "Valid characters in a consumer group ID include letters (Aa–Zz), numbers, underscores ( _ ), and hyphens ( - ).";
  if (filter.length > 32) return "Cannot exceed 32 characters";

  return undefined;
};

export const invalidTopic = (filter: string | undefined) => {
  return validationText("topic", "is", filter);
};

export const invalidConsumerGroup = (filter: string | undefined) => {
  return validationText("consumer-group", "is", filter);
};
