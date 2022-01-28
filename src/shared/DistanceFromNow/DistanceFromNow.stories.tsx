import { ComponentStory, ComponentMeta } from "@storybook/react";
import { sub } from "date-fns";
import React from "react";

import { DistanceFromNow } from "./DistanceFromNow";

export default {
  title: "Components/Shared/DistanceFromNow",
  component: DistanceFromNow,
  args: {
    date: new Date(),
  },
} as ComponentMeta<typeof DistanceFromNow>;

const Template: ComponentStory<typeof DistanceFromNow> = (args) => (
  <DistanceFromNow {...args} />
);

export const RightNow = Template.bind({});
RightNow.args = {};

export const AFewMinutesNow = Template.bind({});
AFewMinutesNow.args = {
  date: sub(new Date(), { minutes: 5 }),
};

export const OneHourAgo = Template.bind({});
OneHourAgo.args = {
  date: sub(new Date(), { hours: 1 }),
};

export const OneDayAgo = Template.bind({});
OneDayAgo.args = {
  date: sub(new Date(), { days: 1 }),
};

export const OneMonthAgo = Template.bind({});
OneMonthAgo.args = {
  date: sub(new Date(), { months: 1 }),
};

export const OneYearAgo = Template.bind({});
OneYearAgo.args = {
  date: sub(new Date(), { years: 1 }),
};

export const CustomFormat = Template.bind({});
CustomFormat.args = {
  format: (date: Date) => `Hello custom ${date.getTime()}`,
};
