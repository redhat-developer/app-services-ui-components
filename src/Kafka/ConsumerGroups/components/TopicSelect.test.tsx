import { composeStories } from "@storybook/testing-react";
import { render, waitForI18n, waitForPopper } from "../../../test-utils";
import * as stories from "./TopicSelect.stories";
import { userEvent } from "@storybook/testing-library";

const { TopicSelectDropdown } = composeStories(stories);

describe("Topics Dropdown", () => {
  it("Topics Dropdown select", async () => {
    const onChangeTopic = jest.fn();
    const comp = render(<TopicSelectDropdown onChange={onChangeTopic} />);

    await waitForI18n(comp);

    userEvent.click(await comp.findByLabelText("Topic"));
    await waitForPopper();

    expect(await comp.findByText("test-topic")).toBeInTheDocument();
    expect(await comp.findByText("test-value")).toBeInTheDocument();

    userEvent.click(await comp.findByText("test-value"));
    expect(onChangeTopic).toHaveBeenCalledTimes(1);
  });
});
