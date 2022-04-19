import { userEvent } from "@storybook/testing-library";
import { composeStories } from "@storybook/testing-react";
import { render, waitForI18n } from "../../../test-utils";
import * as stories from "./ConsumerGroupDrawer.stories";

const { ConsumerGroupDrawerDetails } = composeStories(stories);

describe("Consumer group Drawer", () => {
  it("verify on click action on the kebab menu", async () => {
    const onSelectResetOffsetConsumerGroup = jest.fn();
    const onSelectDeleteConsumerGroup = jest.fn();

    const onClickClose = jest.fn();

    const comp = render(
      <ConsumerGroupDrawerDetails
        onSelectResetOffsetConsumerGroup={onSelectResetOffsetConsumerGroup}
        onSelectDeleteConsumerGroup={onSelectDeleteConsumerGroup}
        onClickClose={onClickClose}
      />
    );
    await waitForI18n(comp);

    userEvent.click(await comp.getByRole("button", { name: "Actions" }));

    userEvent.click(await comp.findByText("Reset offset"));
    expect(onSelectResetOffsetConsumerGroup).toHaveBeenCalledTimes(1);

    userEvent.click(await comp.getByRole("button", { name: "Actions" }));
    userEvent.click(await comp.findByText("Delete"));
    expect(onSelectDeleteConsumerGroup).toHaveBeenCalledTimes(1);

    userEvent.click(await comp.findByLabelText("Close drawer panel"));
    expect(onClickClose).toHaveBeenCalledTimes(1);
  });
});
