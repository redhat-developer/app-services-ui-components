import { Form } from "@patternfly/react-core";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Size } from "../types";

import { FieldSize as FieldSizeComp } from "./FieldSize";

const sizes = [
  { id: "x1", displayName: "1", status: "stable", quota: 1 },
  { id: "x2", displayName: "2", status: "preview", quota: 3 },
  { id: "x3", displayName: "3", status: "preview", quota: 5 },
  { id: "x4", displayName: "4", status: "preview", quota: 10 },
  { id: "x5", displayName: "5", status: "preview", quota: 15 },
] as Size[];

const summitSizes = [
  { id: "x1", displayName: "1", status: "stable", quota: 1 },
  { id: "x2", displayName: "2", status: "preview", quota: 2 },
] as Size[];

export default {
  component: FieldSizeComp,
  args: {
    value: 1,
    sizes,
    remainingQuota: 4,
    validity: "valid",
    isDisabled: false,
    isLoading: false,
  },
  parameters: {
    backgrounds: {
      default: "Background color 100",
    },
  },
} as ComponentMeta<typeof FieldSizeComp>;

const Template: ComponentStory<typeof FieldSizeComp> = (args) => (
  <Form>
    <FieldSizeComp {...args} />
  </Form>
);

export const Default = Template.bind({});

export const NoSizes = Template.bind({});
NoSizes.args = {
  sizes: undefined,
};

export const LoadingSizes = Template.bind({});
LoadingSizes.args = {
  sizes: undefined,
  isLoading: true,
};

export const OverQuota = Template.bind({});
OverQuota.args = {
  value: 1,
  remainingQuota: 0,
  validity: "over-quota",
};

export const Mvp = Template.bind({});
Mvp.args = {
  sizes: summitSizes,
};

export const MvpOverQuota = Template.bind({});
MvpOverQuota.args = {
  value: 2,
  sizes: summitSizes,
  remainingQuota: 1,
  validity: "over-quota",
};

export const Trial = Template.bind({});
Trial.args = {
  value: 1,
  sizes: summitSizes,
  remainingQuota: 1,
  validity: "trial",
};
