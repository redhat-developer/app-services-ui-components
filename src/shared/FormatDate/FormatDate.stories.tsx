import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { add, sub } from "date-fns";

import { FormatDate } from "./FormatDate";

export default {
  component: FormatDate,
  args: {
    date: new Date(),
    format: "distanceToNow",
  },
} as ComponentMeta<typeof FormatDate>;

const Template: ComponentStory<typeof FormatDate> = (args) => (
  <FormatDate {...args} />
);

export const RightNow = Template.bind({});
RightNow.args = {};

export const AFewMinutesNow = Template.bind({});
AFewMinutesNow.args = {
  date: sub(new Date(), { minutes: 5 }),
};

export const OneHourAgo = Template.bind({});
OneHourAgo.args = {
  format: "distanceToNowWithAgo",
  date: sub(new Date(), { hours: 1 }),
};

export const OneDayAgo = Template.bind({});
OneDayAgo.args = {
  format: "distanceToNowWithAgo",
  date: sub(new Date(), { days: 1 }),
};

export const OneMonthAgo = Template.bind({});
OneMonthAgo.args = {
  format: "distanceToNowWithAgo",
  date: sub(new Date(), { days: 31 }),
};

export const OneYearAgo = Template.bind({});
OneYearAgo.args = {
  format: "distanceToNowWithAgo",
  date: sub(new Date(), { years: 1 }),
};

export const CustomFormat = Template.bind({});
CustomFormat.args = {
  format: (date: Date) => `Hello custom ${date.getTime()}`,
};

export const TimeToExpiry = Template.bind({});
TimeToExpiry.args = {
  date: add(Date.now(), { hours: 48 }),
  format: "expiration",
};

export const LongFormat = Template.bind({});
LongFormat.args = {
  format: "long",
};

export const LongFormatWithMilliseconds = Template.bind({});
LongFormatWithMilliseconds.args = {
  format: "longWithMilliseconds",
};

export const Epoch = Template.bind({});
Epoch.args = {
  format: "epoch",
};
