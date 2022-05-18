import { composeStories } from "@storybook/testing-react";
import { renderDialog, waitForI18n, waitForPopper } from "../../../test-utils";
import * as stories from "./TopicsDropdown.stories";
import { userEvent, within } from "@storybook/testing-library";

const { TopicDropdownSelect } = composeStories(stories);

describe("Topics Dropdown", () => {
  it("Topics Dropdown select", async () => {
    const onChangeTopic = jest.fn();
    const comp = renderDialog(<TopicDropdownSelect onChange={onChangeTopic} />);

    await waitForI18n(comp);

    const openDropdown = async () => {
      userEvent.click(await comp.findByTestId("topic-dropdowntoggle"));
      await waitForPopper();
    };

    await openDropdown();

    const menubars = await comp.queryAllByRole("menu");
    const menu = within(menubars[0]);

    expect(await menu.findByText("test-topic")).toBeInTheDocument();
    expect(await menu.findByText("test-value")).toBeInTheDocument();

    userEvent.click(await menu.findByText("test-value"));
    expect(onChangeTopic).toHaveBeenCalledTimes(1);
  });
});
