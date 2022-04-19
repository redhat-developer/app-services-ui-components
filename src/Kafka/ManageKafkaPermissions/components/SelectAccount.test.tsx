import { userEvent } from "@storybook/testing-library";
import { composeStories } from "@storybook/testing-react";
import { render, waitForI18n, waitForPopper } from "../../../test-utils";
import * as stories from "./SelectAccount.stories";

const {
  EmptyState,
  NoServiceOrUserAccounts,
  OnlyServiceAccounts,
  OnlyUserAccounts,
  InteractiveExample,
} = composeStories(stories);

describe("Select Account", () => {
  it("should render a select component", async () => {
    const onChangeAccount = jest.fn();
    const onEscapeModal = jest.fn();
    const comp = render(
      <EmptyState
        onChangeAccount={onChangeAccount}
        onEscapeModal={onEscapeModal}
      />
    );

    await waitForI18n(comp);
    userEvent.click(await comp.findByLabelText("Account"));
    await waitForPopper();

    expect(comp.getByText("All accounts")).toBeInTheDocument();
    expect(comp.getByText("Service accounts")).toBeInTheDocument();
    expect(comp.getByText("User accounts")).toBeInTheDocument();
    expect(comp.getByText("id2")).toBeInTheDocument();
  });

  it("should show empty list of options", async () => {
    const onChangeAccount = jest.fn();
    const onEscapeModal = jest.fn();
    const comp = render(
      <NoServiceOrUserAccounts
        onChangeAccount={onChangeAccount}
        onEscapeModal={onEscapeModal}
      />
    );
    await waitForI18n(comp);

    userEvent.click(await comp.findByLabelText("Account"));
    await waitForPopper();

    expect(comp.getByText("All accounts")).toBeInTheDocument();
    expect(comp.getByText("Service accounts")).toBeInTheDocument();
    expect(comp.getByText("User accounts")).toBeInTheDocument();
    expect(comp.queryAllByText("No results found")).toHaveLength(2);
  });

  it("should show list of service accounts while showing empty user accounts", async () => {
    const onChangeAccount = jest.fn();
    const onEscapeModal = jest.fn();
    const comp = render(
      <OnlyServiceAccounts
        onChangeAccount={onChangeAccount}
        onEscapeModal={onEscapeModal}
      />
    );
    await waitForI18n(comp);

    userEvent.click(await comp.findByLabelText("Account"));
    await waitForPopper();

    expect(comp.getByText("All accounts")).toBeInTheDocument();
    expect(comp.getByText("Service accounts")).toBeInTheDocument();
    expect(comp.getByText("User accounts")).toBeInTheDocument();
    expect(comp.getByText("No results found")).toBeInTheDocument();
    expect(comp.getByText("id5")).toBeInTheDocument();
  });

  it("should show list of user accounts while showing empty service accounts", async () => {
    const onChangeAccount = jest.fn();
    const onEscapeModal = jest.fn();
    const comp = render(
      <OnlyUserAccounts
        onChangeAccount={onChangeAccount}
        onEscapeModal={onEscapeModal}
      />
    );
    await waitForI18n(comp);

    userEvent.click(await comp.findByLabelText("Account"));
    await waitForPopper();

    expect(comp.getByText("All accounts")).toBeInTheDocument();
    expect(comp.getByText("Service accounts")).toBeInTheDocument();
    expect(comp.getByText("User accounts")).toBeInTheDocument();
    expect(comp.getByText("No results found")).toBeInTheDocument();
    expect(comp.getByText("id6")).toBeInTheDocument();
  });

  it("should show a select component ", async () => {
    const onChangeAccount = jest.fn();
    const onEscapeModal = jest.fn();

    const comp = render(
      <InteractiveExample
        onChangeAccount={onChangeAccount}
        onEscapeModal={onEscapeModal}
      />
    );
    await waitForI18n(comp);

    userEvent.click(await comp.findByLabelText("Account"));
    await waitForPopper();

    expect(comp.getByText("All accounts")).toBeInTheDocument();
    expect(comp.getByText("Service accounts")).toBeInTheDocument();
    expect(comp.getByText("User accounts")).toBeInTheDocument();
    userEvent.type(
      comp.getByPlaceholderText("Select an account"),
      "ServiceAccount2"
    );
    userEvent.click(comp.getByText("ServiceAccount2"));
  });
});
