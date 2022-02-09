import React from "react";
import { render, waitForI18n } from "../../test-utils";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./OverviewPage.stories";

const { Example } = composeStories(stories);

describe("OverviewPage", () => {
  it("renders", async () => {
    const comp = render(<Example />);
    await waitForI18n(comp);
    expect(comp.baseElement).toMatchSnapshot();
    expect(
      comp.getByText("Try OpenShift Streams for Apache Kafka")
    ).toHaveAttribute("href", Example.args!.toKafkaHref);
    const [createServiceRegistry, createKafka] =
      comp.getAllByText("Create an instance");
    expect(createKafka).toHaveAttribute("href", Example.args!.toKafkaHref);
    expect(createServiceRegistry).toHaveAttribute(
      "href",
      Example.args!.toServiceRegistryHref
    );
  });
});
