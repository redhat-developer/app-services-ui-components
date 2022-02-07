import { render } from "@testing-library/react";
import {
  RightNow,
  AFewMinutesNow,
  OneHourAgo,
  OneDayAgo,
  OneMonthAgo,
  OneYearAgo,
  CustomFormat,
  TimeToExpiry,
  default as d,
} from "./FormatDate.stories";

describe("FormatDate", () => {
  it("RightNow", () => {
    const comp = render(RightNow(d.args));
    expect(comp.getByText("less than a minute")).toBeTruthy();
  });

  it("AFewMinutesNow", () => {
    const comp = render(AFewMinutesNow({ ...d.args, ...AFewMinutesNow.args }));
    expect(comp.getByText("5 minutes")).toBeTruthy();
  });

  it("OneHourAgo", () => {
    const comp = render(OneHourAgo({ ...d.args, ...OneHourAgo.args }));
    expect(comp.getByText("about 1 hour")).toBeTruthy();
  });

  it("OneDayAgo", () => {
    const comp = render(OneDayAgo({ ...d.args, ...OneDayAgo.args }));
    expect(comp.getByText("1 day")).toBeTruthy();
  });

  it("OneMonthAgo", () => {
    const comp = render(OneMonthAgo({ ...d.args, ...OneMonthAgo.args }));
    expect(comp.getByText("about 1 month")).toBeTruthy();
  });

  it("OneYearAgo", () => {
    const comp = render(OneYearAgo({ ...d.args, ...OneYearAgo.args }));
    expect(comp.getByText("about 1 year")).toBeTruthy();
  });

  it("CustomFormat", () => {
    const comp = render(CustomFormat({ ...d.args, ...CustomFormat.args }));
    expect(
      comp.getByText(`Hello custom ${d.args.date.getTime()}`)
    ).toBeTruthy();
  });

  it("TimeToExpiry", () => {
    const comp = render(TimeToExpiry(TimeToExpiry.args));
    expect(comp.getByText("1 day 23 hours")).toBeTruthy();
  });
});
