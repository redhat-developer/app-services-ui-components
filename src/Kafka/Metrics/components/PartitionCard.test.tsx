import { userEvent } from "@storybook/testing-library";
import { composeStories } from "@storybook/testing-react";
import { render, waitForI18n } from "../../../test-utils";
import * as stories from "./PartitionCard.stories";

const {
  TopicPartitionsLimitApproaching,
  TopicPartitionsLimitReached,
  TopicPartitionUndefined,
} = composeStories(stories);

describe("Topic partition", () => {
  it("Topic partition when limit is approaching", async () => {
    const comp = render(<TopicPartitionsLimitApproaching />);
    await waitForI18n(comp);

    expect(
      await comp.findByText(
        "This Kafka instance is close to reaching the partition limit"
      )
    ).toBeInTheDocument();
    userEvent.click(
      comp.getByRole("button", { name: "Warning alert details" })
    );

    expect(
      await comp.findByText(
        "This Kafka instance is approaching the partition limit. If the Kafka instance exceeds 1000 partitions, it might experience degraded performance."
      )
    ).toBeInTheDocument();
    expect(
      await comp.findByText(
        "To create more partitions, consider migrating to a larger Kafka instance or splitting your workloads across multiple instances."
      )
    ).toBeInTheDocument();
  });

  it("Topic partition when limit is approaching", async () => {
    const comp = render(<TopicPartitionsLimitReached />);
    await waitForI18n(comp);

    expect(
      await comp.findByText("This Kafka instance reached the partition limit")
    ).toBeInTheDocument();
    userEvent.click(comp.getByRole("button", { name: "Danger alert details" }));

    expect(
      await comp.findByText(
        "This Kafka instance has reached its maximum partition limit and might experience degraded performance."
      )
    ).toBeInTheDocument();
    expect(
      await comp.findByText(
        "To create more partitions, consider migrating to a larger Kafka instance or splitting your workloads across multiple instances."
      )
    ).toBeInTheDocument();
  });

  it("Topic partition is undefined", async () => {
    const comp = render(<TopicPartitionUndefined />);
    await waitForI18n(comp);

    expect(await comp.findByText("Data unavailable")).toBeInTheDocument();
  });
});
