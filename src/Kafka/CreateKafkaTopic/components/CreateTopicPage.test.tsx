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
    const onSave = jest.fn();
    const onCloseCreateTopic = jest.fn();
    const comp = render(
      <TopicCreation onSave={onSave} onCloseCreateTopic={onCloseCreateTopic} />
    );
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

    userEvent.click(await comp.findByText("Next"));
    expect(comp.getByText("Required")).toBeInTheDocument();
    const button = await comp.findByText("Next");
    expect(button).toBeDisabled();
    userEvent.type(
      await comp.findByPlaceholderText("Enter topic name"),
      "my-test"
    );
    userEvent.click(button);
    await comp.findByText("my-test already exists. Try a different name");
    await waitForPopper();
    const input = await comp.findByDisplayValue("my-test");
    userEvent.clear(input);
    userEvent.type(await comp.findByPlaceholderText("Enter topic name"), "$");
    expect(
      comp.getByText(
        "Must be letters (Aa-Zz), numbers, underscores ( _ ), periods ( . ), or hyphens ( - )"
      )
    ).toBeInTheDocument();
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
    expect(
      await comp.findByText(
        "One or more partitions make up a topic. Partitions are distributed across the brokers to increase the scalability of your topic. You can also use them to distribute messages across the members of the consumer group."
      )
    ).toBeInTheDocument();
    expect(
      await comp.findByText(
        "One partition is sufficient for getting started, but production systems often have more."
      )
    ).toBeInTheDocument();
    userEvent.click(button);
    const retention = await comp.findAllByText("Message retention");
    expect(retention[0]).toBeInTheDocument();
    expect(retention[1]).toBeInTheDocument();
    expect(
      await comp.findByText(
        "How long messages are retained and the maximum total size of all log segments in a partition before they are deleted to free up space"
      )
    ).toBeInTheDocument();
    expect(
      await comp.findByText(
        "Messages that aren't read by a consumer within this time will be missed. By default, a limit is only applied to retention time."
      )
    ).toBeInTheDocument();
    expect(await comp.findByText("Retention time")).toBeInTheDocument();
    expect(await comp.findByText("Retention size")).toBeInTheDocument();
    expect(await comp.findByText("A day")).toBeInTheDocument();
    expect(await comp.findByText("A week")).toBeInTheDocument();
    expect(await comp.findByText("Custom duration")).toBeInTheDocument();
    expect(await comp.findByText("Custom size")).toBeInTheDocument();
    const unlimited = await comp.findAllByText("Unlimited");
    expect(unlimited[0]).toBeInTheDocument();
    expect(unlimited[1]).toBeInTheDocument();
    userEvent.click(await comp.findByLabelText("Custom duration"));
    expect(await comp.findByDisplayValue("7")).toBeInTheDocument();
    expect(await comp.findByDisplayValue("days")).toBeInTheDocument();
    userEvent.click(await comp.findByLabelText("Custom size"));
    expect(await comp.findByDisplayValue("1")).toBeInTheDocument();
    userEvent.click(button);
    const replicas = await comp.findAllByText("Replicas");
    expect(replicas[0]).toBeInTheDocument();
    expect(replicas[1]).toBeInTheDocument();
    expect(replicas[2]).toBeInTheDocument();
    expect(
      await comp.findByText(
        "How many copies of a topic will be made for high availability."
      )
    ).toBeInTheDocument();
    expect(
      await comp.findByText(
        "The partitions of each topic can be replicated across a configurable number of brokers."
      )
    ).toBeInTheDocument();
    expect(
      await comp.findByText(
        "This instance is a single broker instance. Streams for Apache Kafka only supports 1 replica and a minimum in-sync replica factor of 1 for single broker instances."
      )
    ).toBeInTheDocument();
    expect(
      await comp.findByText("Minimum in-sync replicas")
    ).toBeInTheDocument();
    const finish = await comp.findByText("Finish");
    userEvent.click(finish);
    expect(onSave).toBeCalledTimes(1);
    const cancel = await comp.findByText("Cancel");
    userEvent.click(cancel);
    expect(onCloseCreateTopic).toBeCalledTimes(1);
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
    const button = await comp.findByText("Next");
    userEvent.type(
      await comp.findByPlaceholderText("Enter topic name"),
      "test-this-name"
    );
    userEvent.click(button);
    void waitFor(async () => {
      expect(
        comp.findByText(
          "This Kafka instance has reached its maximum partition limit and might experience degraded performance. To create more partitions, migrate to a larger Kafka instance or split your workloads across multiple instances."
        )
      ).toBeInTheDocument();
      userEvent.click(button);
      userEvent.click(button);
      const finish = await comp.findByText("Finish");
      userEvent.click(finish);
      expect(
        comp.findByText("Increase the number of partitions?")
      ).toBeInTheDocument();
      expect(
        comp.findByText(
          "Since this Kafka Instance has already reached its maximum partition limit, increasing the number of partitions might result in degraded performance."
        )
      ).toBeInTheDocument();
    });
  });
});
