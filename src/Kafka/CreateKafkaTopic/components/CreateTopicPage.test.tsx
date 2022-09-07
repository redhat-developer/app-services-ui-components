import { userEvent, waitFor } from "@storybook/testing-library";
import { composeStories } from "@storybook/testing-react";
import { render, waitForI18n, waitForPopper } from "../../../test-utils";
import * as stories from "./CreateTopicPage.stories";

const {
  TopicCreation,
  InvalidTopicName,
  InvalidLength,
  PartitionLimitReached,
} = composeStories(stories);

describe("Create topic", () => {
  it("should render topic creation page", async () => {
    //jest.useFakeTimers();
    const comp = render(<TopicCreation />);
    await waitForI18n(comp);
    const createTopicLabel = comp.getAllByText("Create topic");
    expect(createTopicLabel[0]).toBeInTheDocument();
    expect(createTopicLabel[1]).toBeInTheDocument();
    expect(
      comp.getByLabelText("Show all available options")
    ).toBeInTheDocument();
    expect(comp.getByText("Kafka Instances")).toBeInTheDocument();
    expect(comp.getByText("kafka-name")).toBeInTheDocument();
    expect(
      comp.getByText("Unique name used to recognize your topic")
    ).toBeInTheDocument();
    expect(
      comp.getByText(
        "The topic name is also used by your producers and consumers as part of the connection information, so make it something easy to recognize."
      )
    ).toBeInTheDocument();
    expect(comp.getByPlaceholderText("Enter topic name")).toBeInTheDocument();

    //
    userEvent.click(await comp.findByText("Next"));
    //jest.advanceTimersByTime(1000);
    expect(comp.getByText("Required")).toBeInTheDocument();
    const button = await comp.findByText("Next");
    expect(button).toBeDisabled();
    //expect(comp.findByRole("button", { name: "Next" })).toBeDisabled();
    userEvent.type(
      await comp.findByPlaceholderText("Enter topic name"),
      "my-test"
    );
    userEvent.click(button);
    await comp.findByText("my-test already exists. Try a different name");
    await waitForPopper();
    const input = await comp.findByDisplayValue("my-test");
    userEvent.clear(input);
    userEvent.type(
      await comp.findByPlaceholderText("Enter topic name"),
      "test-this-name"
    );
    userEvent.click(button);
    userEvent.type(await comp.findByLabelText("Partitions"), "15");
    const partitions = await comp.findAllByText("Partitions");
    expect(partitions[0]).toBeInTheDocument();
    expect(partitions[1]).toBeInTheDocument();
    expect(partitions[2]).toBeInTheDocument();
    expect(
      await comp.findByText("An ordered list of messages")
    ).toBeInTheDocument();
    //One or more partitions make up a topic. Partitions are distributed across the brokers to increase the scalability of your topic. You can also use them to distribute messages across the members of the consumer group.
    expect(
      await comp.findByText(
        "One or more partitions make up a topic. Partitions are distributed across the brokers to increase the scalability of your topic. You can also use them to distribute messages across the members of the consumer group."
      )
    ).toBeInTheDocument();
    //One partition is sufficient for getting started, but production systems often have more.
    expect(
      await comp.findByText(
        "One partition is sufficient for getting started, but production systems often have more."
      )
    ).toBeInTheDocument();
    //const focus=userEvent.click(await comp.findByLabelText("Partitions"))
    //userEvent.type(comp.getByLabelText("Partitions"), "15");
    //userEvent.type(focus, "15");
    //userEvent.click(await findByLabelText("Plus"))
    //jest.advanceTimersByTime(1000);
    //expect(button).toBeEnabled();
  });

  it("should render invalid topic name", async () => {
    const comp = render(<InvalidTopicName />);
    await waitForI18n(comp);
    expect(
      comp.getByText(
        "Must be letters (Aa-Zz), numbers, underscores ( _ ), periods ( . ), or hyphens ( - )"
      )
    ).toBeInTheDocument();
    const button = await comp.findByText("Next");
    expect(button).toBeDisabled();
    const backButton = await comp.findByText("Back");
    expect(backButton).toBeDisabled();
  });
  it("should render invalid topic length", async () => {
    const comp = render(<InvalidLength />);
    await waitForI18n(comp);
    expect(
      comp.getByText(
        "Must contain at least 3 periods ( ... ) if periods are the only characters used"
      )
    ).toBeInTheDocument();
    const button = await comp.findByText("Next");
    expect(button).toBeDisabled();
    const backButton = await comp.findByText("Back");
    expect(backButton).toBeDisabled();
  });
  it("should render partitions warning", async () => {
    const comp = render(<PartitionLimitReached />);
    await waitForI18n(comp);
    void waitFor(() => {
      expect(
        comp.findByText(
          "This Kafka instance has reached its maximum partition limit and might experience degraded performance. To create more partitions, migrate to a larger Kafka instance or split your workloads across multiple instances."
        )
      ).toBeInTheDocument();
    });
  });
});
