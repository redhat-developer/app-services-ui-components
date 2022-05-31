import { composeStories } from "@storybook/testing-react";
import { render, waitForI18n } from "../../../test-utils";
import * as stories from "./DeleteConsumerGroup.stories";
import { userEvent } from "@storybook/testing-library";

const {
  DeleteModalWhenConsumerStateIsStable,
  DeleteModalWhenConsumerStateIsNotStable,
} = composeStories(stories);

describe("Consumer group delete modal", () => {
  it("Delete modal when the consumer group state is equal to stable", async () => {
    const onClose = jest.fn();
    const onDeleteConsumer = jest.fn();

    const comp = render(
      <DeleteModalWhenConsumerStateIsStable
        onClose={onClose}
        onDeleteConsumer={onDeleteConsumer}
      />
    );
    await waitForI18n(comp);

    expect(
      await comp.findByText(
        "The console-745 consumer group cannot be deleted at this time"
      )
    ).toBeInTheDocument();
    expect(await comp.getByRole("button", { name: "Delete" })).toBeDisabled();
    expect(await comp.getByRole("button", { name: "Cancel" })).toBeEnabled();

    userEvent.click(await comp.getByRole("button", { name: "Cancel" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("Delete modal when the consumer group state is other than stable", async () => {
    const onClose = jest.fn();
    const onDeleteConsumer = jest.fn();

    const comp = render(
      <DeleteModalWhenConsumerStateIsNotStable
        onClose={onClose}
        onDeleteConsumer={onDeleteConsumer}
      />
    );
    await waitForI18n(comp);

    expect(await comp.getByRole("button", { name: "Delete" })).toBeEnabled();
    expect(await comp.getByRole("button", { name: "Cancel" })).toBeEnabled();

    userEvent.click(await comp.getByRole("button", { name: "Cancel" }));
    expect(onClose).toHaveBeenCalledTimes(1);

    userEvent.click(await comp.getByRole("button", { name: "Delete" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
