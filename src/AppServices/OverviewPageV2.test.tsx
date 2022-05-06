import { composeStories } from "@storybook/testing-react";
import { render, waitForI18n } from "../test-utils";
import * as stories from "./OverviewPageV2.stories";

const { OverviewPageV2 } = composeStories(stories);

describe("OverviewPage", () => {
  it("renders", async () => {
    const comp = render(<OverviewPageV2 />);
    await waitForI18n(comp);
    expect(comp.baseElement).toMatchSnapshot();
    expect(
      comp.getByText("Try OpenShift Streams for Apache Kafka")
    ).toHaveAttribute("href", OverviewPageV2.args!.toKafkaHref);
    const [createKafka, createServiceRegistry] =
      comp.getAllByText("Create an instance");
    expect(createKafka).toHaveAttribute(
      "href",
      OverviewPageV2.args!.toKafkaHref
    );
    expect(createServiceRegistry).toHaveAttribute(
      "href",
      OverviewPageV2.args!.toServiceRegistryHref
    );
    const createConnectors = comp.getByTestId("cardRHOC-buttonCTA");
    expect(createConnectors).toHaveAttribute(
      "href",
      OverviewPageV2.args!.toConnectorsHref
    );

    expect(comp.getByTestId("cardRHODS-buttonTryIt")).toHaveAttribute(
      "data-ouia-component-id",
      "button-rhods-tryit"
    );

    expect(
      comp.getByText("Try OpenShift Streams for Apache Kafka")
    ).toHaveAttribute("data-ouia-component-id", "button-try-kafka");
  });
});
