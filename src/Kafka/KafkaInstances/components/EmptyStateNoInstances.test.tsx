import { userEvent } from "@storybook/testing-library";
import { composeStories } from "@storybook/testing-react";
import { render, waitForI18n } from "../../../test-utils";
import * as stories from "./EmptyStateNoInstances.stories";

const { EmptyStateNoInstances } = composeStories(stories);

describe("EmptyStateNoInstances", () => {
  it("has the right ouia id", async () => {
    const comp = render(<EmptyStateNoInstances />);
    await waitForI18n(comp);
    expect(
      comp.getByRole("button", { name: "Create Kafka instance" })
    ).toHaveAttribute("data-ouia-component-id", "button-create");
  });

  it("has working links", async () => {
    const onCreate = jest.fn();
    const onQuickstartGuide = jest.fn();
    const comp = render(
      <EmptyStateNoInstances
        onCreate={onCreate}
        onQuickstartGuide={onQuickstartGuide}
      />
    );
    await waitForI18n(comp);
    userEvent.click(comp.getByText("quick start guide"));
    expect(onQuickstartGuide).toBeCalledTimes(1);
    userEvent.click(comp.getByText("Create Kafka instance"));
    expect(onCreate).toBeCalledTimes(1);
  });
});
