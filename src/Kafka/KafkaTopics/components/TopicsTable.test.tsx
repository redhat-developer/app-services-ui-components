import { fireEvent, userEvent, within } from "@storybook/testing-library";
import { composeStories } from "@storybook/testing-react";
import { render, waitForI18n } from "../../../test-utils";
import * as stories from "./TopicsTable.stories";

const { KafkaTopicsTable } = composeStories(stories);

describe("Topics table", () => {
  it("has working actions", async () => {
    const onDelete = jest.fn();
    const onEdit = jest.fn();
    const comp = render(
      <KafkaTopicsTable onDelete={onDelete} onEdit={onEdit} />
    );
    await waitForI18n(comp);

    const firstRow = comp.getAllByRole("row")[1];

    const btnExpand = within(firstRow).getByRole("button");
    fireEvent.click(btnExpand);
    userEvent.click(comp.getByText("Delete topic"));
    expect(onDelete).toBeCalledTimes(1);

    fireEvent.click(btnExpand);
    userEvent.click(comp.getByText("Edit topic configuration"));
    expect(onEdit).toBeCalledTimes(1);
  });

  it("should persist ouia ids", async () => {
    const comp = render(<KafkaTopicsTable />);
    await waitForI18n(comp);
    expect(comp.getByLabelText("Topic list table")).toHaveAttribute(
      "data-ouia-component-id",
      "card-table"
    );
  });
});
