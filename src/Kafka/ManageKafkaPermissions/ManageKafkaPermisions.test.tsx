import { composeStories } from "@storybook/testing-react";

import { render, waitForI18n, waitForPopper } from "../../test-utils";
import * as stories from "./ManageKafkaPermissions.stories";
import { userEvent } from "@storybook/testing-library";

const { EmptyState } = composeStories(stories);

describe("ManagePermissionsModal", () => {
  it("should render a modal with a title and a select component", async () => {
    const onChangeAccount = jest.fn();
    const comp = render(<EmptyState onChangeAccount={onChangeAccount} />);

    await waitForI18n(comp);
    expect(await comp.findByText("Manage access")).toBeInTheDocument();
    expect(await comp.findByText("Kafka instance")).toBeInTheDocument();
    expect(await comp.findByText("name-test")).toBeInTheDocument();
    const button = await comp.findByText("Next");
    expect(button).toBeDisabled();

    userEvent.click(await comp.findByLabelText("Select an account"));
    await waitForPopper();

    expect(await comp.findByText("All accounts")).toBeInTheDocument();
    expect(await comp.findByText("Service accounts")).toBeInTheDocument();
    expect(await comp.findByText("User accounts")).toBeInTheDocument();
    expect(await comp.findByText("id2")).toBeInTheDocument();
    userEvent.click(await comp.findByText("id2"));
    await waitForPopper();
    expect(button).toBeEnabled();
    userEvent.click(await comp.findByLabelText("Clear all"));
    await waitForPopper();
    expect(button).toBeDisabled();
    expect(await comp.findByText("Required")).toBeInTheDocument();
  });
});
