import { composeStories } from "@storybook/testing-react";
import * as stories from "./MultipleShortcutsView.stories";
import { render, waitForI18n } from "../../../test-utils";

const { FormSubmitted, MultipleShortcutsView } = composeStories(stories);

describe("Multiple shortcuts view", () => {
  it("should render a shortcuts table wit multiple permisions", async () => {
    const comp = render(<MultipleShortcutsView />);

    await waitForI18n(comp);
    expect(comp.baseElement).toMatchSnapshot();
  });

  it("should render a shortcuts table wit multiple permisions and validation error", async () => {
    const comp = render(<FormSubmitted />);

    await waitForI18n(comp);
    expect(comp.baseElement).toMatchSnapshot();
  });
});
