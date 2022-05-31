import { composeStories } from "@storybook/testing-react";
import * as stories from "./ProduceTopicShortcut.stories";
import { render, waitForI18n } from "../../../test-utils";

const { OnlyRowInTheTable, PrefixRuleVariant, MultipleRowsExist } =
  composeStories(stories);

describe("Produce topic shortcut", () => {
  it("should render a shortcuts table without a header", async () => {
    const comp = render(<MultipleRowsExist />);

    await waitForI18n(comp);
    expect(comp.baseElement).toMatchSnapshot();
  });

  it("should render a shortcuts table with prefix rule variation", async () => {
    const comp = render(<PrefixRuleVariant />);

    await waitForI18n(comp);
    expect(comp.baseElement).toMatchSnapshot();
  });

  it("should render a shortcuts table with table header", async () => {
    const comp = render(<OnlyRowInTheTable />);

    await waitForI18n(comp);
    expect(comp.baseElement).toMatchSnapshot();
  });
});
