import { composeStories } from "@storybook/testing-react";
import { waitFor } from "@testing-library/react";
import { renderDialog, waitForI18n, within } from "../../../test-utils";

import * as stories from "./Variants.stories";

const {
  VariantCanCustomizeDefaultProvider,
  VariantSingleProvider,
  VariantNoDefaultsRequired,
} = composeStories(stories);

describe("CreateKafkaInstanceWithSizes", () => {
  it("should show the right default cloud provider", async () => {
    const comp = renderDialog(<VariantCanCustomizeDefaultProvider />);
    await waitForI18n(comp);

    await waitFor(() =>
      expect(
        comp.queryByText("Checking if new Kafka instances are available")
      ).not.toBeInTheDocument()
    );

    expect(comp.getByDisplayValue("Microsoft Azure"));
  });

  it("should show a single cloud provider", async () => {
    const comp = renderDialog(<VariantSingleProvider />);
    await waitForI18n(comp);

    await waitFor(() =>
      expect(
        comp.queryByText("Checking if new Kafka instances are available")
      ).not.toBeInTheDocument()
    );

    expect(comp.queryByDisplayValue("Microsoft Azure")).toBeNull();
  });

  it("should work with no defaults", async () => {
    const comp = renderDialog(<VariantNoDefaultsRequired />);
    await waitForI18n(comp);

    await waitFor(() =>
      expect(
        comp.queryByText("Checking if new Kafka instances are available")
      ).not.toBeInTheDocument()
    );

    expect(comp.getByDisplayValue("Select cloud provider"));
    expect(
      await within(comp.getByTestId("cloudRegion")).findByText("Cloud region")
    ).toBeInTheDocument();
  });
});
