import { render, waitForI18n } from "../../../test-utils";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./MetricsLagAlert.stories";
import { userEvent } from "@storybook/testing-library";

const { LagMessage } = composeStories(stories);

describe("Metric lag", () => {
  it("Metric lag alert message", async () => {
    const onClickClose = jest.fn();
    const comp = render(<LagMessage onClickClose={onClickClose} />);
    await waitForI18n(comp);

    expect(await comp.findByText("Metrics experience lag")).toBeInTheDocument();
    expect(
      await comp.findByText(
        "Metrics regularly experience lag, and do not automatically refresh.This might result in metrics appearing out-of-sync and with details displayed on other pages."
      )
    ).toBeInTheDocument();

    userEvent.click(await comp.getByRole("button"));
    expect(onClickClose).toHaveBeenCalledTimes(1);
  });
});
