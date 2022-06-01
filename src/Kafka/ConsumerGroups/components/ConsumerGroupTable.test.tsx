import { fireEvent, userEvent, within } from "@storybook/testing-library";
import { composeStories } from "@storybook/testing-react";
import { render, waitForI18n } from "../../../test-utils";
import * as stories from "./ConsumerGroupTable.stories";

const { DefaultConsumerGroupTable } = composeStories(stories);

describe("Consumer group table", () => {
  it("Consumer group table should have kebab menu", async () => {
    const comp = render(<DefaultConsumerGroupTable />);
    await waitForI18n(comp);

    const firstRow = comp.getAllByRole("row")[1];

    const btnExpand = within(firstRow).getByRole("button");
    userEvent.click(btnExpand);

    expect(await comp.findByText("Delete")).toBeInTheDocument();
    expect(await comp.findByText("View partition offsets")).toBeInTheDocument();
    expect(await comp.findByText("Reset offset")).toBeInTheDocument();
  });

  it("Consumer group table sorted in ascending order based on consumer group id", async () => {
    const comp = render(<DefaultConsumerGroupTable />);

    await waitForI18n(comp);

    userEvent.click(await comp.findByText("Consumer group ID"));

    const firstRow = comp.getAllByRole("row")[1];
    const secondRow = comp.getAllByRole("row")[2];

    expect(within(firstRow).getByText("consumer-123")).toBeInTheDocument();
    expect(within(firstRow).getByText(1)).toBeInTheDocument();
    expect(within(firstRow).getByText(2)).toBeInTheDocument();
    expect(
      within(firstRow).getByText("Completing rebalance")
    ).toBeInTheDocument();

    expect(within(secondRow).getByText("consumer-233")).toBeInTheDocument();
    expect(within(secondRow).getByText(2)).toBeInTheDocument();
    expect(within(secondRow).getByText(3)).toBeInTheDocument();
    expect(within(secondRow).getByText("Stable")).toBeInTheDocument();
  });

  it("Consumer group table sorted in descending order based on consumer group id", async () => {
    const comp = render(<DefaultConsumerGroupTable />);
    await waitForI18n(comp);

    userEvent.click(await comp.findByText("Consumer group ID"));
    userEvent.click(await comp.findByText("Consumer group ID"));

    const firstRow = comp.getAllByRole("row")[1];

    const secondRow = comp.getAllByRole("row")[2];

    expect(within(firstRow).getByText("consumer-233")).toBeInTheDocument();
    expect(within(firstRow).getByText(2)).toBeInTheDocument();
    expect(within(firstRow).getByText(3)).toBeInTheDocument();
    expect(within(firstRow).getByText("Stable")).toBeInTheDocument();

    expect(within(secondRow).getByText("consumer-123")).toBeInTheDocument();
    expect(within(secondRow).getByText(1)).toBeInTheDocument();
    expect(within(secondRow).getByText(2)).toBeInTheDocument();
    expect(
      within(secondRow).getByText("Completing rebalance")
    ).toBeInTheDocument();
  });

  it("on click action on the kebab menu", async () => {
    const onDelete = jest.fn();
    const onClickPartitionoffset = jest.fn();
    const onClickResetoffset = jest.fn();

    const comp = render(
      <DefaultConsumerGroupTable
        onClickDeleteModal={onDelete}
        onClickPartitionoffset={onClickPartitionoffset}
        onClickResetoffset={onClickResetoffset}
      />
    );
    await waitForI18n(comp);

    const firstRow = comp.getAllByRole("row")[1];

    const btnExpand = within(firstRow).getByRole("button");
    fireEvent.click(btnExpand);
    userEvent.click(await comp.findByText("Delete"));
    expect(onDelete).toHaveBeenCalledTimes(1);
    fireEvent.click(btnExpand);
    userEvent.click(await comp.findByText("View partition offsets"));
    expect(onClickPartitionoffset).toHaveBeenCalledTimes(1);
    fireEvent.click(btnExpand);
    userEvent.click(await comp.findByText("Reset offset"));
    expect(onClickResetoffset).toHaveBeenCalledTimes(1);

    expect(onDelete).toHaveBeenCalledWith({
      consumerGroupId: "consumer-123",
      activeMembers: 1,
      partitionsWithLag: 2,
      state: "CompletingRebalance",
    });
    expect(onClickResetoffset).toHaveBeenCalledWith({
      consumerGroupId: "consumer-123",
      activeMembers: 1,
      partitionsWithLag: 2,
      state: "CompletingRebalance",
    });
    expect(onClickPartitionoffset).toHaveBeenCalledWith({
      consumerGroupId: "consumer-123",
      activeMembers: 1,
      partitionsWithLag: 2,
      state: "CompletingRebalance",
    });

    const secondRow = comp.getAllByRole("row")[2];
    const btn2Expand = within(secondRow).getByRole("button");
    fireEvent.click(btn2Expand);
    userEvent.click(await comp.findByText("Delete"));
    expect(onDelete).toHaveBeenCalledTimes(2);
    fireEvent.click(btn2Expand);
    userEvent.click(await comp.findByText("View partition offsets"));
    expect(onClickPartitionoffset).toHaveBeenCalledTimes(2);
    fireEvent.click(btn2Expand);
    userEvent.click(await comp.findByText("Reset offset"));
    expect(onClickResetoffset).toHaveBeenCalledTimes(2);
    expect(onDelete).toHaveBeenLastCalledWith({
      consumerGroupId: "consumer-233",
      activeMembers: 2,
      partitionsWithLag: 3,
      state: "Stable",
    });
    expect(onClickResetoffset).toHaveBeenCalledWith({
      consumerGroupId: "consumer-233",
      activeMembers: 2,
      partitionsWithLag: 3,
      state: "Stable",
    });
    expect(onClickPartitionoffset).toHaveBeenCalledWith({
      consumerGroupId: "consumer-233",
      activeMembers: 2,
      partitionsWithLag: 3,
      state: "Stable",
    });
  });
});
