import { composeStories } from "@storybook/testing-react";
import { render, waitForI18n } from "../test-utils";
import * as stories from "./OverviewPageV4.stories";

const { OverviewPageV4 } = composeStories(stories);

describe("OverviewPage", () => {
  it("renders", async () => {
    const comp = render(<OverviewPageV4 />);
    await waitForI18n(comp);
    expect(comp.baseElement).toMatchSnapshot();
    expect(
      comp.getByText("Try OpenShift Streams for Apache Kafka")
    ).toHaveAttribute("href", OverviewPageV4.args!.toKafkaHref);
    const [createKafka, createServiceRegistry] =
      comp.getAllByText("Create an instance");
    expect(createKafka).toHaveAttribute(
      "href",
      OverviewPageV4.args!.toKafkaHref
    );
    expect(createServiceRegistry).toHaveAttribute(
      "href",
      OverviewPageV4.args!.toServiceRegistryHref
    );
    const createConnectors = comp.getByTestId("cardRHOC-buttonCTA");
    expect(createConnectors).toHaveAttribute(
      "href",
      OverviewPageV4.args!.toConnectorsHref
    );

    const createDesign = comp.getByTestId("hero-buttonCreateDesign");
    expect(createDesign).toHaveAttribute(
      "href",
      OverviewPageV4.args!.toAPIDesignHref
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
