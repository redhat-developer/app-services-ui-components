import { Form } from "@patternfly/react-core";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { PROVIDERS } from "../Stories/storiesHelpers";

import { FieldCloudRegion as FieldCloudRegionComp } from "./FieldCloudRegion";

export default {
  component: FieldCloudRegionComp,
  args: {
    validity: "valid",
    regions: PROVIDERS[0].regions,
  },
} as ComponentMeta<typeof FieldCloudRegionComp>;

const Template: ComponentStory<typeof FieldCloudRegionComp> = (args) => (
  <Form>
    <FieldCloudRegionComp {...args} />
  </Form>
);

export const Default = Template.bind({});

export const Selected = Template.bind({});
Selected.args = {
  value: PROVIDERS[0].regions[0].id,
};

export const Required = Template.bind({});
Required.args = {
  value: "",
  validity: "required",
};

export const NoRegionsAvailable = Template.bind({});
NoRegionsAvailable.args = {
  regions: PROVIDERS[0].regions.map((r) => ({ ...r, isDisabled: true })),
};

export const SomeRegionsUnavailable = Template.bind({});
SomeRegionsUnavailable.args = {
  regions: PROVIDERS[0].regions.map((r, idx) => ({
    ...r,
    isDisabled: idx === 0,
  })),
};

export const Disabled = Template.bind({});
Disabled.args = {
  value: PROVIDERS[0].regions[0].id,
  isDisabled: true,
};
