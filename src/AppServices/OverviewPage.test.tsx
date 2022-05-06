import { composeStories } from "@storybook/testing-react";
import { render, waitForI18n } from "../test-utils";
import * as stories from "./OverviewPage.stories";

const { OverviewPage } = composeStories(stories);

describe("OverviewPage", () => {
  it("renders", async () => {
    const comp = render(<OverviewPage />);
    await waitForI18n(comp);
    expect(comp.baseElement).toMatchSnapshot();
    expect(
      comp.getByText("Try OpenShift Streams for Apache Kafka")
    ).toHaveAttribute("href", OverviewPage.args!.toKafkaHref);
    const [createServiceRegistry, createKafka] =
      comp.getAllByText("Create an instance");
    expect(createKafka).toHaveAttribute("href", OverviewPage.args!.toKafkaHref);
    expect(createServiceRegistry).toHaveAttribute(
      "href",
      OverviewPage.args!.toServiceRegistryHref
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
