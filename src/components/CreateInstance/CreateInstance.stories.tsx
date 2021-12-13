import { Button } from "@patternfly/react-core";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import React,{useState} from "react";
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
  const[isModalOpen,setIsModalOpen]=useState<boolean>(true)
  const onCloseModal=()=>{
    setIsModalOpen(false)
  
  }
  const onOpenModal=()=>{
    setIsModalOpen(true)
  }
  return (
    <div id={id} style={{ transform: "scale(1)", minHeight: 850 }}>
      <CreateInstance
        {...args}
        getModalAppendTo={() => document.getElementById(id)}
        isModalOpen={isModalOpen}
        hideModal={onCloseModal}
        disableFocusTrap={true}

      />
      <div>
        <Button onClick={() => onOpenModal()}>
          Open modal
          </Button>
      </div>
    </div>
  );
};

const cloudProviders = [
  {
    display_name: "Amazon Web Services",
    name: "aws",
  },
];

const cloudRegions = [
  {
    id: "eu-west-1",
    display_name: "EU, Ireland",
  },
  {
    id: "us-east-1",
    display_name: "US East, N. Virginia",
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
  cloudRegions: cloudRegions,
 // hideModal:onCloseModal(),
  //isModalOpen:isModalOpen
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
  cloudRegions: cloudRegions,
  //hideModal:onCloseModal(),
  //isModalOpen:isModalOpen
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
  cloudRegions: cloudRegions,
  //:onCloseModal(),
  //isModalOpen:isModalOpen
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
  cloudRegions: cloudRegions,
  //hideModal:onCloseModal(),
  //isModalOpen:isModalOpen
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
  cloudRegions: cloudRegions,
  //hideModal:onCloseModal(),
  //isModalOpen:isModalOpen
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
  cloudRegions: cloudRegions,
  //:onCloseModal(),
  //isModalOpen:isModalOpen
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
  cloudRegions: cloudRegions,
  //hideModal:onCloseModal(),
  //isModalOpen:isModalOpen
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
  cloudRegions: cloudRegions,
  //hideModal:onCloseModal(),
  //isModalOpen:isModalOpen
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
  cloudRegions: cloudRegions,
};
FormErrors.storyName = " Form has one or more errors";
