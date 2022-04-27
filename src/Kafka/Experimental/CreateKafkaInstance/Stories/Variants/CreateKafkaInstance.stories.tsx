import { ComponentMeta } from "@storybook/react";
import {
  CreateKafkaInstance,
  CreateKafkaInstanceProps,
} from "../../CreateKafkaInstance";
import {
  makeAvailableProvidersAndDefaults,
  PROVIDERS,
  Template,
} from "../storiesHelpers";

export default {
  component: CreateKafkaInstance,
  args: {
    getAvailableProvidersAndDefaults: makeAvailableProvidersAndDefaults({
      instanceAvailability: "quota",
      defaultAZ: "multi",
      defaultProvider: "aws",
      providers: ["aws", "azure"],
    }),
    onCreate: (_data, onSuccess) => setTimeout(onSuccess, 500),
  },
} as ComponentMeta<typeof CreateKafkaInstance>;

export const VariantCanCustomizeDefaultProvider = Template.bind({});
VariantCanCustomizeDefaultProvider.storyName = "Custom Default Provider";
VariantCanCustomizeDefaultProvider.args = {
  getAvailableProvidersAndDefaults: makeAvailableProvidersAndDefaults({
    defaultProvider: "azure",
    instanceAvailability: "quota",
    defaultAZ: "multi",
    providers: ["aws", "azure"],
  }),
} as CreateKafkaInstanceProps;

export const VariantSingleProvider = Template.bind({});
VariantSingleProvider.storyName = "Single provider";
VariantSingleProvider.args = {
  getAvailableProvidersAndDefaults: makeAvailableProvidersAndDefaults({
    defaultProvider: "aws",
    providers: ["aws"],
    instanceAvailability: "quota",
    defaultAZ: "multi",
  }),
} as CreateKafkaInstanceProps;

export const VariantBothAvailabilityZonesEnabledWithNoTooltip = Template.bind(
  {}
);
VariantBothAvailabilityZonesEnabledWithNoTooltip.storyName =
  "Both Availability Zones enabled";
VariantBothAvailabilityZonesEnabledWithNoTooltip.args = {
  getAvailableProvidersAndDefaults: makeAvailableProvidersAndDefaults(
    {
      defaultProvider: "aws",
      providers: ["aws"],
      instanceAvailability: "quota",
      defaultAZ: "multi",
    },
    PROVIDERS.map((p) => ({ ...p, AZ: { multi: true, single: true } }))
  ),
} as CreateKafkaInstanceProps;

export const VariantOnlySingleAZEnabledWithRightTooltip = Template.bind({});
VariantOnlySingleAZEnabledWithRightTooltip.storyName =
  "Single AZ enabled with right tooltip";
VariantOnlySingleAZEnabledWithRightTooltip.args = {
  getAvailableProvidersAndDefaults: makeAvailableProvidersAndDefaults(
    {
      defaultProvider: "aws",
      providers: ["aws"],
      instanceAvailability: "quota",
      defaultAZ: "single",
    },
    PROVIDERS.map((p) => ({ ...p, AZ: { multi: false, single: true } }))
  ),
} as CreateKafkaInstanceProps;

export const VariantNoDefaultsRequired = Template.bind({});
VariantNoDefaultsRequired.storyName = "No Defaults";
VariantNoDefaultsRequired.args = {
  getAvailableProvidersAndDefaults: makeAvailableProvidersAndDefaults(
    {
      defaultProvider: undefined,
      defaultAZ: undefined,
      instanceAvailability: "quota",
      providers: ["aws", "azure"],
    },
    PROVIDERS.map((p, idx) => ({
      ...p,
      AZ: { multi: idx % 2 === 0, single: idx % 2 !== 0 },
    }))
  ),
} as CreateKafkaInstanceProps;
