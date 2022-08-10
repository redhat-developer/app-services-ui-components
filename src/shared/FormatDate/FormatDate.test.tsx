import { composeStories } from "@storybook/testing-react";
import { render } from "../../test-utils";
import { FormatMapping } from "./FormatDate";
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
  LongFormat,
  LongFormatWithMilliseconds,
  Epoch,
} = composeStories(stories);

describe("FormatDate", () => {
  it("RightNow", () => {
    const comp = render(<RightNow />);
    expect(comp.getByText("less than a minute ago")).toBeTruthy();
  });

  it("AFewMinutesNow", () => {
    const comp = render(<AFewMinutesNow />);
    expect(comp.getByText("5 minutes ago")).toBeTruthy();
  });

  it("OneHourAgo", () => {
    const comp = render(<OneHourAgo />);
    expect(comp.getByText("about 1 hour ago")).toBeTruthy();
  });

  it("OneDayAgo", () => {
    const comp = render(<OneDayAgo />);
    expect(comp.getByText("1 day ago")).toBeTruthy();
  });

  it("OneMonthAgo", () => {
    const comp = render(<OneMonthAgo />);
    expect(comp.getByText("about 1 month ago")).toBeTruthy();
  });

  it("OneYearAgo", () => {
    const comp = render(<OneYearAgo />);
    expect(comp.getByText("about 1 year ago")).toBeTruthy();
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

  it("LongFormat", () => {
    const comp = render(<LongFormat />);
    expect(
      comp.getByText(FormatMapping["long"](LongFormat.args!.date!))
    ).toBeTruthy();
  });

  it("LongFormatWithMilliseconds", () => {
    const comp = render(<LongFormatWithMilliseconds />);
    expect(
      comp.getByText(
        FormatMapping["longWithMilliseconds"](
          LongFormatWithMilliseconds.args!.date!
        )
      )
    ).toBeTruthy();
  });

  it("Epoch", () => {
    const comp = render(<Epoch />);
    expect(
      comp.getByText(FormatMapping["epoch"](Epoch.args!.date!))
    ).toBeTruthy();
  });
});
