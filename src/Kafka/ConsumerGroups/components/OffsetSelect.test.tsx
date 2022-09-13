import { composeStories } from "@storybook/testing-react";
import { renderDialog, waitForI18n, waitForPopper } from "../../../test-utils";
import * as stories from "./OffsetSelect.stories";
import { userEvent } from "@storybook/testing-library";

const { OffsetDropdownSelect } = composeStories(stories);

describe("Offset Dropdown", () => {
  it("Offset Dropdown select", async () => {
    const onChangeOffsetValue = jest.fn();
    const comp = renderDialog(
      <OffsetDropdownSelect onChange={onChangeOffsetValue} />
    );

    await waitForI18n(comp);

    userEvent.click(await comp.findByLabelText("New offset"));
    await waitForPopper();

    expect(await comp.findByText("Custom offset")).toBeInTheDocument();
    expect(await comp.findByText("Latest")).toBeInTheDocument();
    expect(await comp.findByText("Earliest")).toBeInTheDocument();

    userEvent.click(await comp.findByText("Earliest"));
    expect(onChangeOffsetValue).toHaveBeenCalledTimes(1);
  });
});
