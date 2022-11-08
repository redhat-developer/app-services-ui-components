import { composeStories } from "@storybook/testing-react";
import { render, waitForI18n } from "../../../test-utils";
import * as stories from "./CardKafkaInstanceMetrics.stories";
import { userEvent } from "@storybook/testing-library";

const { JustCreated, LoadingData, InitialLoading } = composeStories(stories);

describe("CardKafkaInstanceMetrics", () => {
  it("should show a disabled toolbar and an help message for missing metrics", async () => {
    const spy = jest.fn();
    const comp = render(<JustCreated onRefresh={spy} />);
    await waitForI18n(comp);

    expect(
      comp.getByLabelText("Filter Kafka instance metrics by time range")
    ).toBeDisabled();

    userEvent.click(
      comp.getByRole("button", { name: "Refresh Kafka instance metrics" })
    );
    expect(spy).toBeCalledTimes(1);
  });

  it("should show loading skeletons for the charts when updating data after initial load", async () => {
    const comp = render(<LoadingData />);
    await waitForI18n(comp);

    expect(
      comp.getByLabelText("Filter Kafka instance metrics by time range")
    ).toBeDisabled();

    expect(comp.getAllByText("Loading content")).toHaveLength(4);
  });

  it("should properly a single spinner at initial load", async () => {
    const comp = render(<InitialLoading />);
    await waitForI18n(comp);
    expect(comp.getByRole("progressbar")).toBeInTheDocument();
  });
});
