import { composeStories } from "@storybook/testing-react";
import { render, waitForI18n } from "../../../test-utils"
import * as stories from "./EmptyStateNoTopics.stories";

const { WithCTA } = composeStories(stories);

describe("Create button", () => {
  it("should persist ouia id for create button", async () => {
    const comp = render(<WithCTA />);
    await waitForI18n(comp);
    expect(comp.getByRole("button", { name: "Create topic" })).toHaveAttribute(
      "data-ouia-component-id",
      "button-create"
    );
  });
});
