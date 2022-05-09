import { render, waitForI18n, within } from "../../../test-utils";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./PartitionCard.stories";
import { fireEvent, userEvent } from "@storybook/testing-library";

const { TopicPartitionsLimitApproaching, TopicPartitionsLimitReached } =
  composeStories(stories);

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
      await comp.getByRole("button", { name: "Warning alert details" })
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
    userEvent.click(
      await comp.getByRole("button", { name: "Danger alert details" })
    );

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
});
