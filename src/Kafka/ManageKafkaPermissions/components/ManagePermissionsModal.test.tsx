import { composeStories } from "@storybook/testing-react";

import { render, waitForI18n, waitForPopper } from "../../../test-utils";
import * as stories from "./ManagePermissionsModal.stories";
import { userEvent } from "@storybook/testing-library";

const {
  EmptyState,
  NoServiceOrUserAccounts,
  OnlyServiceAccounts,
  OnlyUserAccounts,
} = composeStories(stories);

describe("ManagePermissionsModal", () => {
  it("should render a moal with a select component", async () => {
    const onChangeAccount = jest.fn();
    const comp = render(<EmptyState onChangeAccount={onChangeAccount} />);

    await waitForI18n(comp);
    userEvent.click(await comp.findByLabelText("Select an account"));
    await waitForPopper();

    expect(await comp.findByText("All accounts")).toBeInTheDocument();
    expect(await comp.findByText("Service accounts")).toBeInTheDocument();
    expect(await comp.findByText("User accounts")).toBeInTheDocument();
    expect(await comp.findByText("id2")).toBeInTheDocument();
  });

  it("should show empty list of options", async () => {
    const onChangeAccount = jest.fn();
    const comp = render(
      <NoServiceOrUserAccounts onChangeAccount={onChangeAccount} />
    );
    await waitForI18n(comp);

    userEvent.click(await comp.findByLabelText("Select an account"));
    await waitForPopper();

    expect(await comp.findByText("No results found")).toBeInTheDocument();
  });

  it("should show list of service accounts while showing empty user accounts", async () => {
    const onChangeAccount = jest.fn();
    const comp = render(
      <OnlyServiceAccounts onChangeAccount={onChangeAccount} />
    );
    await waitForI18n(comp);

    userEvent.click(await comp.findByLabelText("Select an account"));
    await waitForPopper();
    expect(await comp.findByText("All accounts")).toBeInTheDocument();
    expect(await comp.findByText("Service accounts")).toBeInTheDocument();
    expect(await comp.findByText("User accounts")).toBeInTheDocument();
  });

  it("should show list of user accounts while showing empty user accounts", async () => {
    const onChangeAccount = jest.fn();
    const comp = render(<OnlyUserAccounts onChangeAccount={onChangeAccount} />);
    await waitForI18n(comp);

    userEvent.click(await comp.findByLabelText("Select an account"));
    await waitForPopper();
    expect(await comp.findByText("All accounts")).toBeInTheDocument();
    expect(await comp.findByText("Service accounts")).toBeInTheDocument();
    expect(await comp.findByText("User accounts")).toBeInTheDocument();
  });
});
