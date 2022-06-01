import { userEvent } from "@storybook/testing-library";
import { composeStories } from "@storybook/testing-react";
import { render, waitForI18n, within } from "../../test-utils";
import * as stories from "./Metrics.stories";

const { AllReady, NoTopics, LimitsNearing } = composeStories(stories);

describe("Metrics", () => {
  it("Renders the data and allows for selecting different time ranges and refreshing", async () => {
    const getKafkaInstanceMetrics = jest.fn(
      AllReady.args!.getKafkaInstanceMetrics
    );
    const getMetricsKpi = jest.fn(AllReady.args!.getMetricsKpi);
    const getTopicsMetrics = jest.fn(AllReady.args!.getTopicsMetrics);
    const comp = render(
      <AllReady
        getKafkaInstanceMetrics={getKafkaInstanceMetrics}
        getMetricsKpi={getMetricsKpi}
        getTopicsMetrics={getTopicsMetrics}
      />
    );
    await waitForI18n(comp);

    expect(getKafkaInstanceMetrics).toBeCalledTimes(1);
    expect(getMetricsKpi).toBeCalledTimes(1);
    expect(getTopicsMetrics).toBeCalledTimes(1);

    const topicsKpi = within(await comp.findByTestId("Topics"));
    expect(await topicsKpi.findByText("3")).toBeInTheDocument();

    const partitionsKpi = within(await comp.findByTestId("Topic partitions"));
    expect(await partitionsKpi.findByText("6")).toBeInTheDocument();
    expect(await comp.findByText("Limit 1000 partitions")).toBeInTheDocument();

    const consumerGroups = within(await comp.findByTestId("Consumer groups"));
    expect(await consumerGroups.findByText("12")).toBeInTheDocument();

    userEvent.click(
      await comp.findByLabelText("Refresh Kafka instance metrics")
    );
    expect(getKafkaInstanceMetrics).toBeCalledTimes(2);
    expect(getMetricsKpi).toBeCalledTimes(1);
    expect(getTopicsMetrics).toBeCalledTimes(1);

    userEvent.click(await comp.findByLabelText("Refresh topic metrics"));
    expect(getKafkaInstanceMetrics).toBeCalledTimes(2);
    expect(getMetricsKpi).toBeCalledTimes(1);
    expect(getTopicsMetrics).toBeCalledTimes(2);
  });

  it("shows a call to action to create a topic", async () => {
    const onCreateTopic = jest.fn(AllReady.args!.onCreateTopic);
    const comp = render(<NoTopics onCreateTopic={onCreateTopic} />);
    await waitForI18n(comp);
    userEvent.click(await comp.findByText("Create topic"));
    expect(onCreateTopic).toBeCalled();
  });

  it("Topic partition count limits nearing", async () => {
    const getKafkaInstanceMetrics = jest.fn(
      LimitsNearing.args!.getKafkaInstanceMetrics
    );
    const getMetricsKpi = jest.fn(LimitsNearing.args!.getMetricsKpi);
    const getTopicsMetrics = jest.fn(LimitsNearing.args!.getTopicsMetrics);
    const comp = render(
      <LimitsNearing
        getKafkaInstanceMetrics={getKafkaInstanceMetrics}
        getMetricsKpi={getMetricsKpi}
        getTopicsMetrics={getTopicsMetrics}
      />
    );
    await waitForI18n(comp);
    const topicsKpi = within(await comp.findByTestId("Topics"));
    expect(await topicsKpi.findByText("1")).toBeInTheDocument();

    const partitionsKpi = within(await comp.findByTestId("Topic partitions"));
    expect(await partitionsKpi.findByText("960")).toBeInTheDocument();
    expect(await comp.findByText("Limit 1000 partitions")).toBeInTheDocument();

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

    const consumerGroups = within(await comp.findByTestId("Consumer groups"));
    expect(await consumerGroups.findByText("0")).toBeInTheDocument();
  });
});
