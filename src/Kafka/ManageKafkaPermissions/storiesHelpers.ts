import { ResourceTypeValue } from "./components/ResourceType";

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
