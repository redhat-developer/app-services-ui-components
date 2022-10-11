import { Button, ButtonVariant } from "@patternfly/react-core";
import { userEvent } from "@storybook/testing-library";
import { render, waitForI18n } from "../../../test-utils";
import { SuspendedPopover } from "./SuspendedPopover";

describe("SuspendedPopover", () => {
  it("Popover", async () => {
    const tree = render(
      <SuspendedPopover>
        <Button variant={ButtonVariant.link}>{"Suspended"}</Button>
      </SuspendedPopover>
    );
    await waitForI18n(tree);
    userEvent.click(await tree.findByText("Suspended"));
    expect(await tree.findByText("Suspended instance")).toBeInTheDocument();
    expect(
      await tree.findByText(
        "The subscription associated with this instance is no longer active."
      )
    ).toBeInTheDocument();
  });
});
