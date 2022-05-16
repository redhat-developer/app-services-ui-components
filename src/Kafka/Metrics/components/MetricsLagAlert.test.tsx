import { render, waitForI18n } from "../../../test-utils";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./MetricsLagAlert.stories";
import { userEvent } from "@storybook/testing-library";

const { LagMessage } = composeStories(stories);

describe("Metric lag", () => {
  it("Metric lag alert message", async () => {
    const comp = render(<LagMessage />);
    await waitForI18n(comp);

    expect(await comp.findByText("Metrics experience lag")).toBeInTheDocument();
    expect(
      await comp.findByText(
        "Metrics regularly experience lag, and do not automatically refresh.This might result in metrics appearing out-of-sync and with details displayed on other pages."
      )
    ).toBeInTheDocument();

    userEvent.click(await comp.getByRole("button"));

    expect(
      await comp.queryByText("Metrics experience lag")
    ).not.toBeInTheDocument();
    expect(
      await comp.queryByText(
        "Metrics regularly experience lag, and do not automatically refresh.This might result in metrics appearing out-of-sync and with details displayed on other pages."
      )
    ).not.toBeInTheDocument();
  });
});
