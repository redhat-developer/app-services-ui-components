import { Tr, Td } from "@patternfly/react-table";
import { ResourceTypeLabel } from "./ResourceTypeLabel";
import { DisplayResourceName, PermissionOperationCell } from "./Cells";
import { ResourceName } from "./ResourceName";
import { ResourcePrefixRule } from "./ResourcePrefixRule";
import type { ResourcePrefixRuleValue } from "./ResourcePrefixRule";

export type ProduceTopicRowProps = {
  onChange: (value: ResourcePrefixRuleValue) => void;
  prefixRuleValue: ResourcePrefixRuleValue;
  resourceNameValue: string | undefined;
  onChangeResourceName: (value: string | undefined) => void;
  onFetchResourceNameOptions: (filter: string) => Promise<string[]>;
  submitted: boolean;
  isConsumeTopicShortcut?: boolean;
  setIsNameValid: (value: boolean) => void;
};
export const ProduceTopicRow: React.FC<ProduceTopicRowProps> = ({
  onChange,
  prefixRuleValue,
  resourceNameValue,
  onChangeResourceName,
  onFetchResourceNameOptions,
  submitted,
  isConsumeTopicShortcut,
  setIsNameValid,
}) => {
  return (
    <Tr style={{ borderBottom: isConsumeTopicShortcut ? "none" : "" }}>
      <Td>
        {" "}
        <ResourceTypeLabel variant={"TOPIC"} />{" "}
        <DisplayResourceName resourceType={"TOPIC"} />{" "}
      </Td>
      <Td>
        {
          <ResourcePrefixRule
            value={prefixRuleValue}
            onChangeValue={onChange}
          />
        }
      </Td>
      <Td>
        <ResourceName
          value={resourceNameValue}
          onChangeValue={onChangeResourceName}
          onFetchOptions={onFetchResourceNameOptions}
          submitted={submitted}
          resourceType={"topic"}
          resourcePrefixRule={prefixRuleValue}
          setIsNameValid={setIsNameValid}
        />
      </Td>
      <Td colSpan={2}>
        <PermissionOperationCell
          permission={"ALLOW"}
          operation={
            isConsumeTopicShortcut
              ? ["READ", "DESCRIBE"]
              : ["WRITE", "CREATE", "DESCRIBE"]
          }
        />
      </Td>
    </Tr>
  );
};
