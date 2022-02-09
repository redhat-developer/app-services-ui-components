import React from "react";
import { render } from "../../test-utils";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./FormatDate.stories";

const {
  RightNow,
  AFewMinutesNow,
  OneHourAgo,
  OneDayAgo,
  OneMonthAgo,
  OneYearAgo,
  CustomFormat,
  TimeToExpiry,
} = composeStories(stories);

describe("FormatDate", () => {
  it("RightNow", () => {
    const comp = render(<RightNow />);
    expect(comp.getByText("less than a minute")).toBeTruthy();
  });

  it("AFewMinutesNow", () => {
    const comp = render(<AFewMinutesNow />);
    expect(comp.getByText("5 minutes")).toBeTruthy();
  });

  it("OneHourAgo", () => {
    const comp = render(<OneHourAgo />);
    expect(comp.getByText("about 1 hour")).toBeTruthy();
  });

  it("OneDayAgo", () => {
    const comp = render(<OneDayAgo />);
    expect(comp.getByText("1 day")).toBeTruthy();
  });

  it("OneMonthAgo", () => {
    const comp = render(<OneMonthAgo />);
    expect(comp.getByText("about 1 month")).toBeTruthy();
  });

  it("OneYearAgo", () => {
    const comp = render(<OneYearAgo />);
    expect(comp.getByText("about 1 year")).toBeTruthy();
  });

  it("CustomFormat", () => {
    const comp = render(<CustomFormat />);
    expect(
      comp.getByText(`Hello custom ${CustomFormat.args!.date!.getTime()}`)
    ).toBeTruthy();
  });

  it("TimeToExpiry", () => {
    const comp = render(<TimeToExpiry />);
    expect(comp.getByText("1 day 23 hours")).toBeTruthy();
  });
});
