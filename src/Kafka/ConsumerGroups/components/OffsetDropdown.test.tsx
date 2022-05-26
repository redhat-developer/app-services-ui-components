import { composeStories } from "@storybook/testing-react";
import { renderDialog, waitForI18n, waitForPopper } from "../../../test-utils";
import * as stories from "./OffsetDropdown.stories";
import { userEvent, within } from "@storybook/testing-library";

const { OffsetDropdownSelect } = composeStories(stories);

describe("Offset Dropdown", () => {
  it("Offset Dropdown select", async () => {
    const onChangeOffsetValue = jest.fn();
    const comp = renderDialog(
      <OffsetDropdownSelect onChange={onChangeOffsetValue} />
    );

    await waitForI18n(comp);

    const openDropdown = async () => {
      userEvent.click(await comp.getByRole("button"));
      await waitForPopper();
    };

    await openDropdown();

    const menubars = await comp.queryAllByRole("menu");
    const menu = within(menubars[0]);

    expect(await menu.findByText("absolute")).toBeInTheDocument();
    expect(await menu.findByText("latest")).toBeInTheDocument();
    expect(await menu.findByText("earliest")).toBeInTheDocument();
    expect(await menu.findByText("timestamp")).toBeInTheDocument();

    userEvent.click(await menu.findByText("absolute"));
    expect(onChangeOffsetValue).toHaveBeenCalledTimes(1);
  });
});
