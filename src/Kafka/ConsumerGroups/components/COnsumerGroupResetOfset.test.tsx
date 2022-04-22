import { composeStories } from "@storybook/testing-react";
import { renderDialog, waitForI18n, waitForPopper } from "../../../test-utils";
import * as stories from "./ConsumerGroupResetOffset.stories";
import { userEvent, within } from "@storybook/testing-library";

const { ResetOffset, ResetOffsetErrorMessage } = composeStories(stories);

describe("Consumer group reset offset Modal", () => {
  const onClickResetOffset = jest.fn();
  const onCancel = jest.fn();

  it("Reset offset when consumer group is not disconnected", async () => {
    const comp = renderDialog(
      <ResetOffsetErrorMessage
        onClickResetOffset={onClickResetOffset}
        onClickClose={onCancel}
      />
    );
    await waitForI18n(comp);

    userEvent.click(await comp.findByText("Cancel"));
    expect(onCancel).toBeCalledTimes(1);

    expect(
      await comp.findByText(
        "The offset for this consumer group cannot be reset at this time"
      )
    ).toBeInTheDocument();

    expect(
      await comp.findByText(
        "One or more members of the consumer group are currently connected to a topic. All members of a consumer group must be disconnected before resetting the offset."
      )
    ).toBeInTheDocument();

    expect(comp.getByRole("button", { name: "Reset offset" })).toBeDisabled();
  });

  it("Reset offset when consumer group is disconnected", async () => {
    const comp = renderDialog(<ResetOffset />);

    await waitForI18n(comp);

    const openDropdown = async () => {
      userEvent.click(await comp.findByTestId("topic-dropdowntoggle"));
      await waitForPopper();
    };

    await openDropdown();

    const menubars = await comp.queryAllByRole("menu");
    const menu = within(menubars[0]);

    userEvent.click(await menu.findByText("test-topic"));

    expect(await comp.queryByText("test-topic")).toBeInTheDocument();
  });
});
