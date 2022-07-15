import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { ExternalLink as ExternalLinkComp } from "./ExternalLink";

export default {
  component: ExternalLinkComp,
  args: {},
} as ComponentMeta<typeof ExternalLinkComp>;

const Template: ComponentStory<typeof ExternalLinkComp> = (args) => (
  <ExternalLinkComp {...args} />
);

export const ExternalLink = Template.bind({});
ExternalLink.args = {
  href: "https://www.redhat.com",
  testId: "test-id",
  children: "Sample text",
  className: "pf-u-ml-xs",
};
