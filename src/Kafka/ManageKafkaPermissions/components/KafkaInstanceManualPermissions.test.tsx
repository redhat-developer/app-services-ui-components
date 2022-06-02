import { composeStories } from "@storybook/testing-react";
import * as stories from "./KafkaInstanceManualPermissions.stories";
import { render, waitForI18n } from "../../../test-utils";

const { FormSubmitted, MultipleRowsExist } = composeStories(stories);

describe("Kafka instance manual permissions", () => {
  it("should render a permissions table row when form is sumbitted", async () => {
    const comp = render(<FormSubmitted />);

    await waitForI18n(comp);
    expect(comp.queryByText("Resource")).not.toBeInTheDocument();
    expect(comp.queryByText("Permission")).not.toBeInTheDocument();
    expect(await comp.findByText("Kafka instance")).toBeInTheDocument();
    expect(comp.queryByText("is")).not.toBeInTheDocument();
    expect(comp.queryByPlaceholderText("Enter name")).not.toBeInTheDocument();
    expect(await comp.findByText("Allow")).toBeInTheDocument();
    expect(await comp.findByText("Required")).toBeInTheDocument();
  });

  it("should render a permissions table and header with initial state when there are multiple rows in the table", async () => {
    const comp = render(<MultipleRowsExist />);

    await waitForI18n(comp);
    expect(await comp.findByText("Kafka instance")).toBeInTheDocument();
    expect(comp.queryByText("Required")).not.toBeInTheDocument();
  });
});
