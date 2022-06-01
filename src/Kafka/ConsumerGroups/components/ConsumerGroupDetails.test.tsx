import { composeStories } from "@storybook/testing-react";
import { render, waitForI18n } from "../../../test-utils";
import * as stories from "./ConsumerGroupDetails.stories";

const {
  ConsumerGroupWithNoActiveMembers,
  ConsumerGroupDetailsAtKafkaLevel,
  ConsumerGroupDetailsAtTopicLevel,
  ConsumerGroupWithActiveMembers,
} = composeStories(stories);

describe("Consumer group details", () => {
  it("Consumer group table should include a topic column at kafka level", async () => {
    const comp = render(<ConsumerGroupDetailsAtKafkaLevel />);
    await waitForI18n(comp);

    expect(await comp.findByText("Topic")).toBeInTheDocument();
    expect(await comp.findByText("Active members")).toBeInTheDocument();
    expect(await comp.findByText("Partitions with lag")).toBeInTheDocument();
  });

  it("Consumer group table should not include a topic column at topic level", async () => {
    const comp = render(<ConsumerGroupDetailsAtTopicLevel />);
    await waitForI18n(comp);
    expect(
      await comp.findByText("Active members for this topic")
    ).toBeInTheDocument();
    expect(
      await comp.findByText("Partitions with lag in this topic")
    ).toBeInTheDocument();
  });

  it("Consumer group with no active consumers", async () => {
    const comp = render(<ConsumerGroupWithNoActiveMembers />);
    await waitForI18n(comp);

    expect(comp.getAllByRole("row")[1]).not.toBeDefined();
  });

  it("Consumer group with 2 active consumers members", async () => {
    const comp = render(<ConsumerGroupWithActiveMembers />);
    await waitForI18n(comp);

    expect(comp.getAllByRole("row")[1]).toBeDefined();
    expect(comp.getAllByRole("row")[2]).toBeDefined();
  });
});
