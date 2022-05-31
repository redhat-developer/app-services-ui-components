import { composeStories } from "@storybook/testing-react";
import * as stories from "./ManageAccessShortcut.stories";
import { render, waitForI18n } from "../../../test-utils";

const { MultipleRowsExist, OnlyRowInTheTable } = composeStories(stories);

describe("Manage access shortcut permissions", () => {
  it("should render a permissions table without header with initial state when there are multiple rows in the table", async () => {
    const comp = render(<MultipleRowsExist />);

    await waitForI18n(comp);
    expect(comp.baseElement).toMatchSnapshot();
  });

  it("should render a permissions table and header with initial state when there is only one row in the table", async () => {
    const comp = render(<OnlyRowInTheTable />);

    await waitForI18n(comp);
    expect(comp.baseElement).toMatchSnapshot();
  });
});
