import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { ValidClientId, ValidDescription, ValidOwner } from "./Search.stories";
import { ServiceAccountToolbar } from "./ServiceAccountToolbar";

export default {
  component: ServiceAccountToolbar,
  args: {
    filteredValue: [],
  },
} as ComponentMeta<typeof ServiceAccountToolbar>;

const Template: ComponentStory<typeof ServiceAccountToolbar> = (args) => (
  <ServiceAccountToolbar {...args} />
);

export const Default = Template.bind({});
Default.parameters = {
  docs: {
    description: {
      story: `
ToolbarFilter for ServiceAccount Search/filter functionality
        `,
    },
  },
};

export const ClientIdChips = Template.bind({});
// @ts-ignore
ClientIdChips.play = ValidClientId.play;

export const CanDeleteClientIdChips = Template.bind({});
CanDeleteClientIdChips.play = async (context) => {
  const story = within(context.canvasElement);

  // @ts-ignore
  await ValidClientId.play(context);

  // delete the "foo" chip
  const clearChipButtons = await story.findAllByLabelText("close");
  await userEvent.click(clearChipButtons[0]);

  // delete the whole group
  await userEvent.click(await story.findByLabelText("Close chip group"));
};

export const DescriptionChips = Template.bind({});
// @ts-ignore
DescriptionChips.play = ValidDescription.play;

export const CanDeleteDescriptionChips = Template.bind({});
CanDeleteDescriptionChips.play = async (context) => {
  const story = within(context.canvasElement);

  // @ts-ignore
  await ValidClientId.play(context);

  // delete the "foo" chip
  const clearChipButtons = await story.findAllByLabelText("close");
  await userEvent.click(clearChipButtons[0]);

  // delete the whole group
  await userEvent.click(await story.findByLabelText("Close chip group"));
};

export const OwnerChips = Template.bind({});
// @ts-ignore
OwnerChips.play = ValidOwner.play;

export const CanDeleteOwnerChips = Template.bind({});
CanDeleteOwnerChips.play = async (context) => {
  const story = within(context.canvasElement);

  // @ts-ignore
  await ValidClientId.play(context);

  // delete the "foo" chip
  const clearChipButtons = await story.findAllByLabelText("close");
  await userEvent.click(clearChipButtons[0]);

  // delete the whole group
  await userEvent.click(await story.findByLabelText("Close chip group"));
};

export const AllChips = Template.bind({});
AllChips.play = async (context) => {
  // @ts-ignore
  await ValidDescription.play(context);
  // @ts-ignore
  await ValidClientId.play(context);
  // @ts-ignore
  await ValidOwner.play(context);
};

export const CanClearAllFilters = Template.bind({});
CanClearAllFilters.play = async (context) => {
  const story = within(context.canvasElement);
  // @ts-ignore
  await AllChips.play(context);
  const clearButtons = await story.findAllByText("Clear all filters");
  await userEvent.click(clearButtons[0]);
};

export const CanClickCreateServiceAccount = Template.bind({});
CanClickCreateServiceAccount.play = async (context) => {
  const story = within(context.canvasElement);
  await userEvent.click(await story.findByText("Create service account"));
};
