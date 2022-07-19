import { ActionList, ActionListItem } from "@patternfly/react-core";
import { TableComposable } from "@patternfly/react-table";
import { PermissionsDropdown } from ".";
import { AssignPermissionsManual } from "./AssignPermissionsManual";
import { ConsumeTopicShortcut } from "./ConsumeTopicShortcut";
import { ManageAccessShortcut } from "./ManageAccessShortcut";
import { ProduceTopicShortcut } from "./ProduceTopicShortcut";
import { ResourceOperationValue } from "./ResourceOperation";
import { ResourcePermissionValue } from "./ResourcePermission";
import { ResourcePrefixRuleValue } from "./ResourcePrefixRule";
import { ResourceTypeValue } from "./ResourceType";
import { ShortcutsTableHead } from "./ShortcutsTableHead";

/*export type ViewAccountDetailsProps={
    addConsumeTopicTemplateAcl,
    addManageAccessTemplateAcl,
    addProduceTopicTemplateAcl,
    addRawAcl,
    kafkaName,
    acl
}*/


export const ViewAccountDetails: React.VFC=({
    addConsumeTopicTemplateAcl,
    addManageAccessTemplateAcl,
    addProduceTopicTemplateAcl,
    addRawAcl,
    kafkaName,
    acl
    
}) => {
    
return(
<>
<TableComposable variant="compact">
{acl.length > 0 && <ShortcutsTableHead />}
{ acl.map((value: PermissionTypeValue, key: number) =>
value === "manual-permission" ? (
<AssignPermissionsManual
key={key}
row={key}
resourceType={undefined}
onChangeResourceType={function (
  value: ResourceTypeValue | undefined
): void {
  throw new Error("Function not implemented.");
}}
submitted={false}
resourcePrefix={"Is"}
onChangeResourcePrefix={function (
  value: ResourcePrefixRuleValue
): void {
  throw new Error("Function not implemented.");
}}
resourceName={undefined}
onChangeResource={function (value: string | undefined): void {
  throw new Error("Function not implemented.");
}}
onFetchResourceNameOptions={function (
  filter: string
): Promise<string[]> {
  throw new Error("Function not implemented.");
}}
resourcePermission={"allow"}
onChangeResourcePermission={function (
  value: ResourcePermissionValue
): void {
  throw new Error("Function not implemented.");
}}
resourceOperation={undefined}
onChangeResourceOperation={function (
  value: ResourceOperationValue | undefined
): void {
  throw new Error("Function not implemented.");
}}
multipleShorctutPermissions={true}
/>
) : value === "produce-topic-shortcut" ? (
<ProduceTopicShortcut onChange={function (value: string): void {
    throw new Error("Function not implemented.");
  } } prefixRuleValue={"Is"} resourceNameValue={undefined} onChangeResourceName={function (value: string | undefined): void {
    throw new Error("Function not implemented.");
  } } onFetchResourceNameOptions={function (filter: string): Promise<string[]> {
    throw new Error("Function not implemented.");
  } } submitted={false} onDelete={function (): void {
    throw new Error("Function not implemented.");
  } } 
  multipleShorctutPermissions={true}/>
) : value === "consume-topic-shortcut" ? (
<ConsumeTopicShortcut onChangeConsumerResourcePrefixRule={function (value: string): void {
      throw new Error("Function not implemented.");
    } } onChangeTopicResourcePrefixRule={function (value: string): void {
      throw new Error("Function not implemented.");
    } } consumerPrefixRuleValue={"Starts with"} topicPrefixRuleValue={"Is"} consumerResourceNameValue={undefined} topicResourceNameValue={undefined} onChangeConsumerResourceName={function (value: string | undefined): void {
      throw new Error("Function not implemented.");
    } } onChangeTopicResourceName={function (value: string | undefined): void {
      throw new Error("Function not implemented.");
    } } onFetchConsumerResourceNameOptions={function (filter: string): Promise<string[]> {
      throw new Error("Function not implemented.");
    } } onFetchTopicResourceNameOptions={function (filter: string): Promise<string[]> {
      throw new Error("Function not implemented.");
    } } submitted={false} onDelete={function (): void {
      throw new Error("Function not implemented.");
    } } 
    multipleShorctutPermissions={true}/>
) : (
<ManageAccessShortcut onDelete={function (): void {
        throw new Error("Function not implemented.");
      } } instanceName={kafkaName} 
      multipleShorctutPermissions={true}/>
)
)}
</TableComposable>
<ActionList>
                <ActionListItem>
                  <PermissionsDropdown
                    onAddPermission={addRawAcl}
                    onShortcutConsumeTopic={addConsumeTopicTemplateAcl}
                    onShortcutProduceTopic={addProduceTopicTemplateAcl}
                    onShortcutManageAccess={addManageAccessTemplateAcl}
                  />
                </ActionListItem>
              </ActionList>
              </>
)
}
