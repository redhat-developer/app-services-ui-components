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

export const InvalidSearch = Template.bind({});
InvalidSearch.play = async ({ canvasElement }) => {
  const story = within(canvasElement);
  userEvent.type(
    await story.findByLabelText("Filter by owner"),
    "some-%%%-invalid"
  );
};
InvalidSearch.parameters = {
  docs: {
    description: {
      story: `A user can type some invalid search text and be displayed a tooltip describing why the text is invalid. Search is also disabled.`,
    },
  },
};
