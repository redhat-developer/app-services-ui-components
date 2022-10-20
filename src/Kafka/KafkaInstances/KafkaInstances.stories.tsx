import { action } from "@storybook/addon-actions";
import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { fakeApi } from "../../shared/storiesHelpers";
import { SimplifiedStatuses } from "../types";
import { KafkaInstances as KafkaInstancesComp } from "./KafkaInstances";
import { instances } from "./storiesHelper";

const getInstancesAction = action("getInstances");

export default {
  component: KafkaInstancesComp,
  args: {
    getUrlForInstance: (row) => `/${row.id}`,
    isRowSelected: () => false,
    canChangeOwner: (row) => row.owner === "baz-owner",
    canDelete: (row) => row.owner === "baz-owner",
  },
} as ComponentMeta<typeof KafkaInstancesComp>;

const randomData = new Array(300).fill(0).map((_, index) => {
  const i = instances[index % instances.length];
  return {
    ...i,
    id: `${index}`,
    name: `${i.name}-${index}`,
  };
});

const Template: ComponentStory<typeof KafkaInstancesComp> = (args) => {
  return (
    <KafkaInstancesComp
      {...args}
      getInstances={(page, perPage, query, sort, sortDirection) => {
        const allData = randomData.filter((i) => {
          return (
            (query.name.length > 0
              ? query.name.find((n) => i.name.includes(n))
              : true) &&
            (query.owner.length > 0
              ? query.owner.find((o) => i.owner.includes(o))
              : true) &&
            (query.status.length > 0
              ? query.status
                  .flatMap((s) => SimplifiedStatuses[s])
                  .includes(i.status)
              : true)
          );
        });
        const data = allData.slice(page, perPage);
        const count = allData.length;
        getInstancesAction(
          ...Object.entries({
            page,
            perPage,
            sort,
            sortDirection,
          }).flat(),
          ...Object.entries(query)
            .map(([k, v]) => [k, v.length > 0 ? v.join(",") : null])
            .flat()
        );
        return fakeApi({ instances: data, count });
      }}
    />
  );
};

export const UserBazCanOnlyDeleteHisInstances = Template.bind({});
UserBazCanOnlyDeleteHisInstances.args = {};

export const OrgAdminCanDeleteAnyInstance = Template.bind({});
OrgAdminCanDeleteAnyInstance.args = {
  canChangeOwner: () => true,
  canDelete: () => true,
};

export const InstancesCanBeSelected = Template.bind({});
InstancesCanBeSelected.args = {
  isRowSelected: ({ row }) => row.id === "2",
};
