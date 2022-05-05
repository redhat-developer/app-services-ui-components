import { Form } from "@patternfly/react-core";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Size } from "../types";

import { FieldSize as FieldSizeComp } from "./FieldSize";

const sizes = [
  { id: "x1", streamingUnits: 1 },
  { id: "x2", streamingUnits: 3 },
  { id: "x3", streamingUnits: 5 },
  { id: "x4", streamingUnits: 10 },
  { id: "x5", streamingUnits: 15 },
] as Size[];

const summitSizes = [
  { id: "x1", streamingUnits: 1 },
  { id: "x2", streamingUnits: 2 },
] as Size[];

export default {
  component: FieldSizeComp,
  args: {
    value: 1,
    sizes,
    remainingStreamingUnits: 4,
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
  remainingStreamingUnits: 0,
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
  remainingStreamingUnits: 1,
  validity: "over-quota",
};

export const Trial = Template.bind({});
Trial.args = {
  value: 1,
  sizes: summitSizes,
  remainingStreamingUnits: 1,
  validity: "trial",
};
