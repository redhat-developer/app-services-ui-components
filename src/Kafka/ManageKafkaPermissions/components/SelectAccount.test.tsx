import { composeStories } from "@storybook/testing-react";
import * as stories from "./SelectAccount.stories";
import { userEvent } from "@storybook/testing-library";
import { render, waitForI18n } from "../../../test-utils";

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

    expect(await comp.findByText("All accounts")).toBeInTheDocument();
    expect(await comp.findByText("Service accounts")).toBeInTheDocument();
    expect(await comp.findByText("User accounts")).toBeInTheDocument();
    expect(await comp.findByText("id2")).toBeInTheDocument();
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

    expect(await comp.findByText("All accounts")).toBeInTheDocument();
    expect(await comp.findByText("Service accounts")).toBeInTheDocument();
    expect(await comp.findByText("User accounts")).toBeInTheDocument();
    expect(await comp.findAllByText("No results found")).toHaveLength(2);
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

    expect(await comp.findByText("All accounts")).toBeInTheDocument();
    expect(await comp.findByText("Service accounts")).toBeInTheDocument();
    expect(await comp.findByText("User accounts")).toBeInTheDocument();
    expect(await comp.findByText("No results found")).toBeInTheDocument();
    expect(await comp.findByText("id5")).toBeInTheDocument();
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

    expect(await comp.findByText("All accounts")).toBeInTheDocument();
    expect(await comp.findByText("Service accounts")).toBeInTheDocument();
    expect(await comp.findByText("User accounts")).toBeInTheDocument();
    expect(await comp.findByText("No results found")).toBeInTheDocument();
    expect(await comp.findByText("id6")).toBeInTheDocument();
  });

  it("should show a select component ", async () => {
    const onChangeAccount = jest.fn();
    const comp = render(
      <InteractiveExample onChangeAccount={onChangeAccount} />
    );
    await waitForI18n(comp);

    userEvent.click(await comp.findByLabelText("Account"));

    expect(await comp.findByText("All accounts")).toBeInTheDocument();
    expect(await comp.findByText("Service accounts")).toBeInTheDocument();
    expect(await comp.findByText("User accounts")).toBeInTheDocument();
    userEvent.type(comp.getByPlaceholderText("Select an account"), "id2");
    userEvent.click(await comp.findByText("id2"));
  });
});
