import { InputGroup } from "@patternfly/react-core";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";
import React from "react";

import { SearchInput } from "./SearchInput";

export default {
  title: "Components/ServiceAccount/ServiceAccountToolbar/SearchInput",
  component: SearchInput,
  args: {},
} as ComponentMeta<typeof SearchInput>;

const Template: ComponentStory<typeof SearchInput> = (args) => (
  <InputGroup>
    <SearchInput {...args} />
  </InputGroup>
);

export const EmptyState = Template.bind({});

export const SomeValidInput = Template.bind({});
SomeValidInput.args = {
  placeholder: "Filter by owner"
}

SomeValidInput.play = async ({ canvasElement }) => {
  const story = within(canvasElement);
  userEvent.type(await story.findByLabelText("Filter by owner"), "some-name");
  userEvent.click(await story.findByLabelText("Search"));
};
SomeValidInput.parameters = {
  docs: {
    description: {
      story: `A user can type some valid search text and click the search button`,
    },
  },
};

export const ErrorMessageForInvalidOwnerSearchInput = Template.bind({});
ErrorMessageForInvalidOwnerSearchInput.args = {
  placeholder: "Filter by owner",
  errorMessage: "Red Hat Login ID cannot contain spaces, national characters or the following special characters \" $ ^ < > | + % / ; : , * = ~ # ( )"
}
ErrorMessageForInvalidOwnerSearchInput.play = async ({ canvasElement }) => {
  const story = within(canvasElement);
  userEvent.type(
    await story.findByLabelText("Filter by owner"),
    "some-%%%-invalid"
  );
};
ErrorMessageForInvalidOwnerSearchInput.parameters = {
  docs: {
    description: {
      story: `When user enter some invalid search text for "Owner" search type, Tooltip text will be displayed describing why the text entered is invalid. Search is also disabled.`,
    },
  },
};

export const ErrorMessageForInvalidSearchInputForClientID = Template.bind({});
ErrorMessageForInvalidSearchInputForClientID.args = {
  placeholder: "Filter by Client ID",
  errorMessage: "Valid characters include lowercase letters from a to z, numbers from 0 to 9, and hyphens ( - )."
}
ErrorMessageForInvalidSearchInputForClientID.play = async ({ canvasElement }) => {
  const story = within(canvasElement);
  userEvent.type(
    await story.findByLabelText("Filter by Client ID"),
    "some invalid"
  );
};
ErrorMessageForInvalidSearchInputForClientID.parameters = {
  docs: {
    description: {
      story: `When user enter some invalid search text for "ClientID" search type, Tooltip text will be displayed describing why the text entered is invalid. Search is also disabled.`,
    },
  },
};

export const ErrorMessageForInvalidSearchInputForShortDescription = Template.bind({});
ErrorMessageForInvalidSearchInputForShortDescription.args = {
  placeholder: "Filter by short description",
  errorMessage: "Valid characters include lowercase letters from a to z, numbers from 0 to 9, and hyphens ( - )."
}
ErrorMessageForInvalidSearchInputForShortDescription.play = async ({ canvasElement }) => {
  const story = within(canvasElement);
  userEvent.type(
    await story.findByLabelText("Filter by short description"),
    "some invalid"
  );
};
ErrorMessageForInvalidSearchInputForShortDescription.parameters = {
  docs: {
    description: {
      story: `When user enter some invalid search text for "Short Description" search type, Tooltip text will be displayed describing why the text entered is invalid. Search is also disabled.`,
    },
  },
};




