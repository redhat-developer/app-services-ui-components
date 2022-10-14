import { composeStories } from "@storybook/testing-react";
import { render, waitForI18n } from "../../test-utils";
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
  it("RightNow", async () => {
    const comp = render(<RightNow />);
    await waitForI18n(comp);

    expect(comp.getByText("less than a minute")).toBeTruthy();
  });

  it("AFewMinutesNow", async () => {
    const comp = render(<AFewMinutesNow />);
    await waitForI18n(comp);

    expect(comp.getByText("5 minutes")).toBeTruthy();
  });

  it("OneHourAgo", async () => {
    const comp = render(<OneHourAgo />);
    await waitForI18n(comp);
    expect(comp.getByText("about 1 hour ago")).toBeTruthy();
  });

  it("OneDayAgo", async () => {
    const comp = render(<OneDayAgo />);
    await waitForI18n(comp);
    expect(comp.getByText("1 day ago")).toBeTruthy();
  });

  it("OneMonthAgo", async () => {
    const comp = render(<OneMonthAgo />);
    await waitForI18n(comp);
    expect(comp.getByText("about 1 month ago")).toBeTruthy();
  });

  it("OneYearAgo", async () => {
    const comp = render(<OneYearAgo />);
    await waitForI18n(comp);
    expect(comp.getByText("about 1 year ago")).toBeTruthy();
  });

  it("CustomFormat", async () => {
    const comp = render(<CustomFormat />);
    await waitForI18n(comp);

    expect(
      comp.getByText(`Hello custom ${CustomFormat.args!.date!.getTime()}`)
    ).toBeTruthy();
  });

  it("TimeToExpiry", async () => {
    const comp = render(<TimeToExpiry />);
    await waitForI18n(comp);

    expect(comp.getByText("1 day 23 hours")).toBeTruthy();
  });

  it("LongFormat", async () => {
    const comp = render(<LongFormat />);
    await waitForI18n(comp);

    expect(
      comp.getByText(FormatMapping["long"](LongFormat.args!.date!, () => ""))
    ).toBeTruthy();
  });

  it("LongFormatWithMilliseconds", async () => {
    const comp = render(<LongFormatWithMilliseconds />);
    await waitForI18n(comp);

    expect(
      comp.getByText(
        FormatMapping["longWithMilliseconds"](
          LongFormatWithMilliseconds.args!.date!,
          () => ""
        )
      )
    ).toBeTruthy();
  });

  it("Epoch", async () => {
    const comp = render(<Epoch />);
    await waitForI18n(comp);
    expect(
      comp.getByText(FormatMapping["epoch"](Epoch.args!.date!, () => ""))
    ).toBeTruthy();
  });
});
