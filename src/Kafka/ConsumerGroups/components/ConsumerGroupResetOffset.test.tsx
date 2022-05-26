import { composeStories } from "@storybook/testing-react";
import { render, waitForI18n } from "../../../test-utils";
import * as stories from "./ConsumerGroupResetOffset.stories";
import { userEvent } from "@storybook/testing-library";

const {
  ResetOffsetWhenTopicisNotSelected,
  ResetOffsetErrorMessage,
  ResetOffsetWhenTopicIsSelected,
  ResetOffsetWhenOffsetIsAbsolute,
  ResetOffsetWhenAllFieldsSelected,
} = composeStories(stories);

describe("Consumer group reset offset Modal", () => {
  const onClickResetOffset = jest.fn();
  const onCancel = jest.fn();

  it("Reset offset when consumer group is not disconnected", async () => {
    const comp = render(
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
    const comp = render(<ResetOffsetWhenTopicisNotSelected />);

    await waitForI18n(comp);

    expect(comp.queryByLabelText("New offset")).not.toBeInTheDocument();
    expect(comp.queryByLabelText("Custom offset")).not.toBeInTheDocument();
    expect(comp.getByRole("button", { name: "Reset offset" })).toBeDisabled();
  });

  it("Reset offset when topic is selected", async () => {
    const comp = render(<ResetOffsetWhenTopicIsSelected />);
    await waitForI18n(comp);
    expect(comp.queryByLabelText("Custom offset")).not.toBeInTheDocument();
    expect(comp.getByRole("button", { name: "Reset offset" })).toBeDisabled();
  });

  it("Reset offset when absolute is selected as new offset", async () => {
    const comp = render(<ResetOffsetWhenOffsetIsAbsolute />);
    await waitForI18n(comp);

    expect(await comp.findByLabelText("Custom offset")).toHaveDisplayValue("2");
    expect(comp.getByRole("button", { name: "Reset offset" })).toBeDisabled();
  });

  it("Reset offset when All the fields are selected", async () => {
    const comp = render(<ResetOffsetWhenAllFieldsSelected />);
    await waitForI18n(comp);
    expect(comp.getByRole("button", { name: "Reset offset" })).toBeEnabled();
  });
});
