import { ResourceTypeValue } from "./components/ResourceType";

export const validationCheck = (
  resourceType: ResourceTypeValue | undefined,
  resourcePreixCondition: "starts-with" | "is",
  filter: string | undefined
) => {
  const regExp = new RegExp("^[0-9A-Za-z_.-]+$");
  if (filter === undefined) return { isValid: true, message: undefined };
  if (resourcePreixCondition == "is" && resourceType == "topic") {
    if (filter == "." || filter == "..")
      return {
        isValid: false,
        message:
          "A topic name must contain at least 3 periods (...) if periods are the only characters used",
      };
  }
  if (resourceType == "topic" && !regExp.test(filter))
    return {
      isValid: false,
      message:
        "Valid characters in a topic name include letters (Aa-Zz), numbers, underscores ( _ ), periods ( . ), and hyphens ( - ).",
    };

  if (resourceType == "consumer-group" && !regExp.test(filter))
    return {
      isValid: false,
      message:
        "Valid characters in a consumer group ID include letters (Aa–Zz), numbers, underscores ( _ ), and hyphens ( - ).",
    };
  if (filter.length > 32)
    return { isValid: false, message: "Cannot exceed 32 characters" };

  return undefined;
};
