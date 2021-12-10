import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { CreateInstance } from "./CreateInstance";
import CreateInstanceI18n from "./CreateInstance-i18n.json";

export default {
  title: "Pages/Create Instance",
  component: CreateInstance,
  args: {},
  parameters: {
    i18n: CreateInstanceI18n,
  },
} as ComponentMeta<typeof CreateInstance>;

const Template: ComponentStory<typeof CreateInstance> = (args, { id }) => {
  return (
    <div id={id} style={{ transform: "scale(1)", minHeight: 850 }}>
      <CreateInstance
        {...args}
        getModalAppendTo={() => document.getElementById(id)}
      />
    </div>
  );
};

const cloudProviders = [
  {
    kind: "CloudProvider",
    id: "aws",
    display_name: "Amazon Web Services",
    name: "aws",
    enabled: true,
  },
];

const cloudRegions = [
  {
    kind: "CloudRegion",
    id: "eu-west-1",
    display_name: "EU, Ireland",
    enabled: true,
    supported_instance_types: ["standard", "eval"],
  },
  {
    kind: "CloudRegion",
    id: "us-east-1",
    display_name: "US East, N. Virginia",
    enabled: true,
    supported_instance_types: ["standard", "eval"],
  },
];

export const AllReady = Template.bind({});
AllReady.args = {
  isKasTrial: true,
  cloudProviders: cloudProviders,
  quota: { data: undefined, loading: false, isServiceDown: false },
  //kasQuota:{allowed:60,consumed:20,remaining:40},
  kasTrial: { allowed: 0, consumed: 0, remaining: 0 },
  hasKafkaCreationFailed: false,
  userHasTrialInstance: false,
  loadingQuota: false,
  title: "Create a kafka instance",
  isCreationInProgress: false,
  kafkaRequest: {
    cloud_provider: {
      value: "aws",
    },
    multi_az: {
      value: true,
    },
    region: {
      value: "",
    },
    name: {
      value: "",
    },
  },
  formSubmitted: false,
  FORM_ID: "create_instance_-form",
  cloudRegions: cloudRegions,
};
AllReady.storyName = "Ready to create a trial instance";

export const QuotaLoading = Template.bind({});
QuotaLoading.args = {
  isKasTrial: true,
  cloudProviders: cloudProviders,
  quota: { data: undefined, loading: true, isServiceDown: false },
  kasQuota: { allowed: 60, consumed: 20, remaining: 40 },
  kasTrial: { allowed: 60, consumed: 20, remaining: 40 },
  hasKafkaCreationFailed: false,
  userHasTrialInstance: false,
  loadingQuota: true,
  title: "Create a kafka instance",
  isCreationInProgress: false,
  kafkaRequest: {
    cloud_provider: {
      value: "aws",
    },
    multi_az: {
      value: true,
    },
    region: {
      value: "",
    },
    name: {
      value: "",
    },
  },
  formSubmitted: false,
  FORM_ID: "create_instance_-form",
  cloudRegions: cloudRegions,
};
QuotaLoading.storyName = "Checking quota for instance";

export const CreationInProgress = Template.bind({});
CreationInProgress.args = {
  isKasTrial: true,
  cloudProviders: cloudProviders,
  quota: { data: undefined, loading: false, isServiceDown: false },
  kasQuota: { allowed: 60, consumed: 20, remaining: 40 },
  kasTrial: { allowed: 60, consumed: 20, remaining: 40 },
  hasKafkaCreationFailed: false,
  userHasTrialInstance: false,
  loadingQuota: false,
  title: "Create a kafka instance",
  isCreationInProgress: true,
  kafkaRequest: {
    cloud_provider: {
      value: "aws",
    },
    multi_az: {
      value: true,
    },
    region: {
      value: "us-east-1",
    },
    name: {
      value: "suyash-test",
    },
  },
  formSubmitted: false,
  FORM_ID: "create_instance_-form",
  cloudRegions: cloudRegions,
};
CreationInProgress.storyName = "Creation in progress";

export const InstanceCreationFailed = Template.bind({});
InstanceCreationFailed.args = {
  isKasTrial: true,
  cloudProviders: cloudProviders,
  quota: { data: undefined, loading: false, isServiceDown: false },
  kasQuota: { allowed: 60, consumed: 20, remaining: 40 },
  kasTrial: { allowed: 60, consumed: 20, remaining: 40 },
  hasKafkaCreationFailed: true,
  userHasTrialInstance: false,
  loadingQuota: false,
  title: "Create a kafka instance",
  isCreationInProgress: false,
  kafkaRequest: {
    cloud_provider: {
      value: "aws",
    },
    multi_az: {
      value: true,
    },
    region: {
      value: "us-east-1",
    },
    name: {
      value: "suyash-test",
    },
  },
  formSubmitted: false,
  FORM_ID: "create_instance_-form",
  cloudRegions: cloudRegions,
};
InstanceCreationFailed.storyName = "Instance creation failed";

export const ServiceDown = Template.bind({});
ServiceDown.args = {
  isKasTrial: true,
  cloudProviders: cloudProviders,
  quota: { data: undefined, loading: false, isServiceDown: true },
  kasQuota: { allowed: 60, consumed: 20, remaining: 40 },
  kasTrial: { allowed: 60, consumed: 20, remaining: 40 },
  hasKafkaCreationFailed: false,
  userHasTrialInstance: false,
  loadingQuota: false,
  title: "Create a kafka instance",
  isCreationInProgress: false,
  kafkaRequest: {
    cloud_provider: {
      value: "aws",
    },
    multi_az: {
      value: true,
    },
    region: {
      value: "",
    },
    name: {
      value: "",
    },
  },
  formSubmitted: false,
  FORM_ID: "create_instance_-form",
  cloudRegions: cloudRegions,
};
ServiceDown.storyName = "Service Down";

export const TrialInstanceRunning = Template.bind({});
TrialInstanceRunning.args = {
  isKasTrial: true,
  cloudProviders: cloudProviders,
  quota: { data: undefined, loading: false, isServiceDown: false },
  //kasQuota:{allowed:60,consumed:20,remaining:40},
  kasTrial: { allowed: 1, consumed: 1, remaining: 1 },
  hasKafkaCreationFailed: false,
  userHasTrialInstance: true,
  loadingQuota: false,
  title: "Create a kafka instance",
  isCreationInProgress: false,
  kafkaRequest: {
    cloud_provider: {
      value: "aws",
    },
    multi_az: {
      value: true,
    },
    region: {
      value: "",
    },
    name: {
      value: "",
    },
  },
  formSubmitted: false,
  FORM_ID: "create_instance_-form",
  cloudRegions: cloudRegions,
};
TrialInstanceRunning.storyName =
  "User has no standard quota and a trial instance is already running";

export const NoQuota = Template.bind({});
NoQuota.args = {
  isKasTrial: false,
  cloudProviders: cloudProviders,
  quota: { data: undefined, loading: false, isServiceDown: false },
  //kasQuota:{allowed:60,consumed:20,remaining:40},
  //kasTrial:{allowed:1,consumed:1,remaining:1},
  hasKafkaCreationFailed: false,
  userHasTrialInstance: false,
  loadingQuota: false,
  title: "Create a kafka instance",
  isCreationInProgress: false,
  kafkaRequest: {
    cloud_provider: {
      value: "aws",
    },
    multi_az: {
      value: true,
    },
    region: {
      value: "",
    },
    name: {
      value: "",
    },
  },
  formSubmitted: false,
  FORM_ID: "create_instance_-form",
  cloudRegions: cloudRegions,
};
NoQuota.storyName = "User has no standard quota and no trial quota";

export const NoStandardQuota = Template.bind({});
NoStandardQuota.args = {
  isKasTrial: false,
  cloudProviders: cloudProviders,
  quota: { data: undefined, loading: false, isServiceDown: false },
  //kasQuota:{allowed:60,consumed:20,remaining:40},
  kasTrial: { allowed: 1, consumed: 1, remaining: 1 },
  hasKafkaCreationFailed: false,
  userHasTrialInstance: false,
  loadingQuota: false,
  title: "Create a kafka instance",
  isCreationInProgress: false,
  kafkaRequest: {
    cloud_provider: {
      value: "aws",
    },
    multi_az: {
      value: true,
    },
    region: {
      value: "",
    },
    name: {
      value: "",
    },
  },
  formSubmitted: false,
  FORM_ID: "create_instance_-form",
  cloudRegions: cloudRegions,
};
NoStandardQuota.storyName =
  "User has no standard quota but trial quota is available";

export const AlreadyProvisioned = Template.bind({});
AlreadyProvisioned.args = {
  isKasTrial: false,
  cloudProviders: cloudProviders,
  quota: { data: undefined, loading: false, isServiceDown: false },
  kasQuota: { allowed: 0, consumed: 0, remaining: 0 },
  //kasTrial:{allowed:1,consumed:1,remaining:1},
  hasKafkaCreationFailed: false,
  userHasTrialInstance: false,
  loadingQuota: false,
  title: "Create a kafka instance",
  isCreationInProgress: false,
  kafkaRequest: {
    cloud_provider: {
      value: "aws",
    },
    multi_az: {
      value: true,
    },
    region: {
      value: "",
    },
    name: {
      value: "",
    },
  },
  formSubmitted: false,
  FORM_ID: "create_instance_-form",
  cloudRegions: cloudRegions,
};
AlreadyProvisioned.storyName =
  " User has standard quota but all allowed instances are already provisioned";

export const FormErrors = Template.bind({});
FormErrors.args = {
  isKasTrial: false,
  cloudProviders: cloudProviders,
  quota: { data: undefined, loading: false, isServiceDown: false },
  kasQuota: { allowed: 1, consumed: 1, remaining: 1 },
  kasTrial: { allowed: 1, consumed: 1, remaining: 1 },
  hasKafkaCreationFailed: false,
  userHasTrialInstance: false,
  loadingQuota: false,
  title: "Create a kafka instance",
  isCreationInProgress: false,
  kafkaRequest: {
    cloud_provider: {
      value: "aws",
    },
    multi_az: {
      value: true,
    },
    region: {
      value: "",
      validated: "error",
      errorMessage: "Required",
    },
    name: {
      value: "",
      validated: "error",
      errorMessage: "Required",
    },
  },
  formSubmitted: true,
  FORM_ID: "create_instance_-form",
  cloudRegions: cloudRegions,
};
FormErrors.storyName = " Form has one or more errors";
