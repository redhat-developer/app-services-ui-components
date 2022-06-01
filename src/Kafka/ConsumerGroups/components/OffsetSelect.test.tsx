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

    expect(await comp.findByText("absolute")).toBeInTheDocument();
    expect(await comp.findByText("latest")).toBeInTheDocument();
    expect(await comp.findByText("earliest")).toBeInTheDocument();
    expect(await comp.findByText("timestamp")).toBeInTheDocument();

    userEvent.click(await comp.findByText("absolute"));
    expect(onChangeOffsetValue).toHaveBeenCalledTimes(1);
  });
});
