import { Button, ButtonVariant } from "@patternfly/react-core";
import { userEvent } from "@storybook/testing-library";
import { render, waitForI18n } from "../../../test-utils";
import { SuspendPopover } from "./SuspendPopover";

describe("SuspendPopover", () => {
  it("Popover", async () => {
    const tree = render(
      <SuspendPopover>
        <Button variant={ButtonVariant.link}>{"Suspended"}</Button>
      </SuspendPopover>
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
