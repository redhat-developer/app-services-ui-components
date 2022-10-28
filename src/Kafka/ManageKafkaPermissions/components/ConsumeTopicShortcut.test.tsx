import { composeStories } from "@storybook/testing-react";
import * as stories from "./ConsumeTopicShortcut.stories";
import { render, waitForI18n } from "../../../test-utils";

const {
  FormSubmitted,
  MultipleRowsExist,
  OnlyRowInTheTable,
  PrefixRuleVariant,
} = composeStories(stories);

describe("Consume Topic shortcut permissions", () => {
  it("should render a shortcut permissions table row when form is sumbitted", async () => {
    const comp = render(<FormSubmitted />);

    await waitForI18n(comp);
    expect(comp.baseElement).toMatchSnapshot();
  });

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

  it("should render a permissions table and header with initial state and prefix variant set to is", async () => {
    const comp = render(<PrefixRuleVariant />);

    await waitForI18n(comp);
    expect(comp.baseElement).toMatchSnapshot();
  });
});
