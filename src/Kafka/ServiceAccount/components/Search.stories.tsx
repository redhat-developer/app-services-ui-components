import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";

import { Search } from "./Search";

export default {
  component: Search,
  args: {},
} as ComponentMeta<typeof Search>;

const Template: ComponentStory<typeof Search> = (args) => <Search {...args} />;

export const EmptyState = Template.bind({});
EmptyState.args = {};

export const ValidDescription = Template.bind({});
ValidDescription.play = async ({ canvasElement }) => {
  const story = within(canvasElement);
  await userEvent.type(
    await story.findByLabelText("Filter by short description"),
    "foo"
  );
  await userEvent.click(await story.findByLabelText("Search"));
  await userEvent.type(
    await story.findByLabelText("Filter by short description"),
    "bar"
  );
  await userEvent.click(await story.findByLabelText("Search"));
};
ValidDescription.parameters = {
  docs: {
    description: {
      story: `A user can type some valid search text and click the search button`,
    },
  },
};

export const ValidClientId = Template.bind({});
ValidClientId.play = async ({ canvasElement }) => {
  const story = within(canvasElement);
  await userEvent.click(await story.findByLabelText("Select filter category"));
  await userEvent.click(await story.findByText("Client ID"));
  await userEvent.type(
    await story.findByLabelText("Filter by Client ID"),
    "foo"
  );
  await userEvent.click(await story.findByLabelText("Search"));
  await userEvent.type(
    await story.findByLabelText("Filter by Client ID"),
    "bar"
  );
  await userEvent.click(await story.findByLabelText("Search"));
};
ValidClientId.parameters = {
  docs: {
    description: {
      story: `A user can type some valid search text and click the search button`,
    },
  },
};

export const ValidOwner = Template.bind({});
ValidOwner.play = async ({ canvasElement }) => {
  const story = within(canvasElement);
  await userEvent.click(await story.findByLabelText("Select filter category"));
  await userEvent.click(await story.findByText("Owner"));
  await userEvent.type(await story.findByLabelText("Filter by owner"), "foo");
  await userEvent.click(await story.findByLabelText("Search"));
  await userEvent.type(await story.findByLabelText("Filter by owner"), "bar");
  await userEvent.click(await story.findByLabelText("Search"));
};
ValidOwner.parameters = {
  docs: {
    description: {
      story: `A user can type some valid search text and click the search button`,
    },
  },
};
