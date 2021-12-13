import { Button } from "@patternfly/react-core";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import React,{useState} from "react";
import { CreateKafkaInstance } from "./CreateKafkaInstance";
import CreateInstanceI18n from "./CreateInstance-i18n.json";

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

export default {
  title: "Features/Create Kafka instance dialog",
  component: CreateKafkaInstance,
  args: {cloudProviders: cloudProviders,cloudRegions:cloudRegions,
    userHasTrialInstance:false,
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
  formSubmitted:false,
  hasKafkaCreationFailed:false,
  isCreationInProgress:false,
  quota: { data: undefined, loading: false, isServiceDown: false },
},
  parameters: {
    i18n: CreateInstanceI18n,
  },
} as ComponentMeta<typeof CreateKafkaInstance>;

const Template: ComponentStory<typeof CreateKafkaInstance> = (args, { id }) => {
  const[isModalOpen,setIsModalOpen]=useState<boolean>(true)
  const onCloseModal=()=>{
    setIsModalOpen(false)
  
  }
  const onOpenModal=()=>{
    setIsModalOpen(true)
  }
  return (
    <div id={id} style={{ transform: "scale(1)", minHeight: 850 }}>
      <CreateKafkaInstance
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







export const AllReady = Template.bind({});
AllReady.args = {
  kasTrial: { allowed: 0, consumed: 0, remaining: 0 },
};
AllReady.storyName = "Ready to create a trial instance";

export const QuotaLoading = Template.bind({});
QuotaLoading.args = {
  quota: { data: undefined, loading: true, isServiceDown: false },
  kasQuota: { allowed: 60, consumed: 20, remaining: 40 },
  kasTrial: { allowed: 60, consumed: 20, remaining: 40 },
};
QuotaLoading.storyName = "Checking quota for instance";

export const CreationInProgress = Template.bind({});
CreationInProgress.args = {
  kasQuota: { allowed: 60, consumed: 20, remaining: 40 },
  kasTrial: { allowed: 60, consumed: 20, remaining: 40 },
  isCreationInProgress: true,
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
      value: "suyash-test",
    },
  },
};
CreationInProgress.storyName = "Creation in progress";

export const InstanceCreationFailed = Template.bind({});
InstanceCreationFailed.args = {
  kasQuota: { allowed: 60, consumed: 20, remaining: 40 },
  kasTrial: { allowed: 60, consumed: 20, remaining: 40 },
  hasKafkaCreationFailed: true,
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
};
InstanceCreationFailed.storyName = "Instance creation failed";

export const ServiceDown = Template.bind({});
ServiceDown.args = {
  quota: { data: undefined, loading: false, isServiceDown: true },
  kasQuota: { allowed: 60, consumed: 20, remaining: 40 },
  kasTrial: { allowed: 60, consumed: 20, remaining: 40 },

};
ServiceDown.storyName = "Service Down";

export const TrialInstanceRunning = Template.bind({});
TrialInstanceRunning.args = {
  kasTrial: { allowed: 1, consumed: 1, remaining: 1 },
  userHasTrialInstance: true,
 
};
TrialInstanceRunning.storyName =
  "User has no standard quota and a trial instance is already running";
// No quota error displayed when kasQuota and kasTrial are undefined 
export const NoQuota = Template.bind({});
NoQuota.args = {};
NoQuota.storyName = "User has no standard quota and no trial quota";

export const NoStandardQuota = Template.bind({});
NoStandardQuota.args = {
  kasTrial: { allowed: 1, consumed: 1, remaining: 1 },
};
NoStandardQuota.storyName =
  "User has no standard quota but trial quota is available";

export const AlreadyProvisioned = Template.bind({});
AlreadyProvisioned.args = {
  kasQuota: { allowed: 0, consumed: 0, remaining: 0 },
};
AlreadyProvisioned.storyName =
  " User has standard quota but all allowed instances are already provisioned";

export const FormErrors = Template.bind({});
FormErrors.args = {
  kasQuota: { allowed: 1, consumed: 1, remaining: 1 },
  kasTrial: { allowed: 1, consumed: 1, remaining: 1 },
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
};
FormErrors.storyName = " Form has one or more errors";
