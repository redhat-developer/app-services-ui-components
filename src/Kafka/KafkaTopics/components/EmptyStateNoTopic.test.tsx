import { userEvent } from "@storybook/testing-library";
import { composeStories } from "@storybook/testing-react";
import { render, waitForI18n } from "../../../test-utils";
import * as stories from "./EmptyStateNoTopic.stories";

const { EmptyStateNoTopics } = composeStories(stories);

describe("EmptyStateNoTopics", () => {
  it("has the right ouia id", async () => {
    const comp = render(<EmptyStateNoTopics />);
    await waitForI18n(comp);
    expect(comp.getByRole("button", { name: "Create topic" })).toHaveAttribute(
      "data-ouia-component-id",
      "button-create"
    );
  });

  it("has working links", async () => {
    const onCreateTopic = jest.fn();
    const comp = render(<EmptyStateNoTopics onCreateTopic={onCreateTopic} />);
    await waitForI18n(comp);
    userEvent.click(comp.getByText("Create topic"));
    expect(onCreateTopic).toBeCalledTimes(1);
  });
});
