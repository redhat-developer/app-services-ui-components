import { userEvent } from "@storybook/testing-library";
import { composeStories } from "@storybook/testing-react";

import {
  render,
  waitForI18n,
  waitForPopper,
  within,
} from "../../../test-utils";

import * as stories from "./ReviewPermissionsTable.stories";

const {
  AllAccountsCanDeleteAllAccounts,
  IndividualAccountCanDeleteOnlyOwnRules,
} = composeStories(stories);

describe("ReviewPermissionsTable", () => {
  it("should render review table with data for 'all accounts'", async () => {
    const comp = render(<AllAccountsCanDeleteAllAccounts />);

    await waitForI18n(comp);

    expect(await comp.findByText("Resource")).toBeInTheDocument();
    expect(await comp.findByText("Permission")).toBeInTheDocument();
    //header row
    expect(await comp.getAllByRole("row")[0]).toBeDefined();
    //table body data row
    expect(await comp.getAllByRole("row")[1]).toBeDefined();
    //row data
    const firstRow = await comp.getAllByRole("row")[1];

    expect(within(firstRow).getByText("Kafka instance")).toBeInTheDocument();
    expect(within(firstRow).getByText("Allow")).toBeInTheDocument();
    expect(within(firstRow).getByText("All accounts")).toBeInTheDocument();
    expect(within(firstRow).getByRole("button")).toBeInTheDocument();

    //check deny permission
    const denyPermissionRows = await comp.getAllByText("Deny");

    expect(denyPermissionRows[0]).toBeInTheDocument();
    expect(denyPermissionRows[1]).toBeInTheDocument();
  });

  it("should render review table with selected account and should not have delete button for 'all accounts' rows", async () => {
    const comp = render(<IndividualAccountCanDeleteOnlyOwnRules />);
    await waitForI18n(comp);

    //check selected account rows
    const deleteBtn = await comp.getAllByRole("button");
    expect(deleteBtn[0]).toBeInTheDocument();
    expect(deleteBtn[1]).toBeInTheDocument();

    //check  for all accounts rows
    const allAccountsRows = await comp.getAllByText("All accounts");
    expect(allAccountsRows[0]).toBeInTheDocument();
    expect(allAccountsRows[1]).toBeInTheDocument();

    //all accounts rows should not have delete button
    expect(
      within(allAccountsRows[0]).queryByRole("button")
    ).not.toBeInTheDocument();

    expect(
      within(allAccountsRows[1]).queryByRole("button")
    ).not.toBeInTheDocument();
  });

  it("should delete row for 'all accounts' review", async () => {
    const comp = render(<AllAccountsCanDeleteAllAccounts />);

    await waitForI18n(comp);
    await waitForPopper();

    const firstRow = await comp.getAllByRole("row")[1];
    const firstRowDeleteBtn = within(firstRow).getByRole("button");
    userEvent.click(firstRowDeleteBtn);

    expect(
      within(firstRow).queryByText("Kafka instance")
    ).not.toBeInTheDocument();
  });
});
