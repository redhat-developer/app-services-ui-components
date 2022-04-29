import { expect } from "@storybook/jest";
import { ComponentMeta } from "@storybook/react";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { CreateKafkaInstanceWithSizes } from "../../CreateKafkaInstanceWithSizes";
import {
  argTypes,
  parameters,
  PROVIDERS,
  sampleSubmit,
  Template,
} from "../storiesHelpers";

export default {
  component: CreateKafkaInstanceWithSizes,
  args: {
    apiPlan: "standard",
    apiScenario: "standard-available",
    apiProviders: PROVIDERS.map((p) => p.id),
    apiDefaultProvider: "aws",
    apiRegionsAvailability: "full",
    apiMaxStreamingUnits: 5,
    apiRemainingStreamingUnits: 3,
    apiLatency: 500,
    onCreate: (_data, onSuccess) => setTimeout(onSuccess, 500),
  },
  argTypes,
  parameters,
} as ComponentMeta<typeof CreateKafkaInstanceWithSizes>;

export const OverQuotaOnFormSubmit = Template.bind({});
OverQuotaOnFormSubmit.storyName = "Over Quota - Standard";
OverQuotaOnFormSubmit.args = {
  onCreate: (_data, _onSuccess, onError) => onError("over-quota"),
};
OverQuotaOnFormSubmit.play = sampleSubmit;

export const TrialUnavailableOnFormSubmit = Template.bind({});
TrialUnavailableOnFormSubmit.storyName = "Trial Unavailable - Trial";
TrialUnavailableOnFormSubmit.args = {
  apiPlan: "trial",
  apiScenario: "trial-available",
  onCreate: (_data, _onSuccess, onError) => onError("trial-unavailable"),
};
TrialUnavailableOnFormSubmit.play = sampleSubmit;

export const SelectedRegionUnavailableOnFormSubmit = Template.bind({});
SelectedRegionUnavailableOnFormSubmit.storyName =
  "Selected region unavailable - Standard";
SelectedRegionUnavailableOnFormSubmit.args = {
  onCreate: (_data, _onSuccess, onError) => onError("region-unavailable"),
};
SelectedRegionUnavailableOnFormSubmit.play = sampleSubmit;

export const TrialSelectedRegionUnavailableOnFormSubmit = Template.bind({});
TrialSelectedRegionUnavailableOnFormSubmit.storyName =
  "Selected region unavailable - Trial";
TrialSelectedRegionUnavailableOnFormSubmit.args = {
  apiPlan: "trial",
  apiScenario: "trial-available",
  onCreate: (_data, _onSuccess, onError) => onError("region-unavailable"),
};
TrialSelectedRegionUnavailableOnFormSubmit.play = sampleSubmit;

export const NameTakenOnFormSubmit = Template.bind({});
NameTakenOnFormSubmit.storyName = "Name Taken";
NameTakenOnFormSubmit.args = {
  onCreate: (_data, _onSuccess, onError) => onError("name-taken"),
};
NameTakenOnFormSubmit.play = sampleSubmit;

export const GenericErrorOnFormSubmit = Template.bind({});
GenericErrorOnFormSubmit.storyName = "Generic Error - Standard";
GenericErrorOnFormSubmit.args = {
  onCreate: (_data, _onSuccess, onError) => onError("unknown"),
};
GenericErrorOnFormSubmit.play = sampleSubmit;

export const FormErrorsCantSubmit = Template.bind({});
FormErrorsCantSubmit.storyName = "Errors In Form - Standard";
FormErrorsCantSubmit.args = {};
FormErrorsCantSubmit.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await waitFor(() => expect(canvas.getByLabelText("Name *")).toBeEnabled());

  await userEvent.type(await canvas.findByLabelText("Name *"), "%3-foo-;");

  await userEvent.click(
    await canvas.findByTestId("modalCreateKafka-buttonSubmit")
  );
};
