import React from "react";
import { composeStories } from "@storybook/testing-react";

import {
  render,
  waitForI18n,
  waitForPopper,
  within,
} from "../../../../test-utils";
import * as stories from "./ResourceTypeOperationFilter.stories";
import { userEvent } from "@storybook/testing-library";

const { NoItemChecked, AllItemsChecked, SomeItemChecked, InteractiveExample } =
  composeStories(stories);

describe("<ResourceTypeOperationFilter/>", () => {
  it("should render acls treeview with no items checked and expanded", async () => {
    const onCheckedItemsChange = jest.fn();
    const comp = render(
      <NoItemChecked
        checkedItems={[]}
        onCheckedItemsChange={onCheckedItemsChange}
      />
    );

    await waitForI18n(comp);
    userEvent.click(await comp.findByText("Filter by resource type operation"));
    await waitForPopper();

    expect(await comp.findByText("Consumer group")).toBeInTheDocument();
    expect(await comp.findByText("Kafka instance")).toBeInTheDocument();
    expect(await comp.findByText("Topic")).toBeInTheDocument();
    expect(await comp.findByText("Transactional ID")).toBeInTheDocument();

    //expand consumer group
    const consumerGroup = comp.getByTestId("acls-consumer-group");
    const btnExpand = within(consumerGroup).getByRole("button");

    userEvent.click(btnExpand);

    expect(await comp.findByText("All")).toBeInTheDocument();
    expect(await comp.findByText("Read")).toBeInTheDocument();
    expect(await comp.findByText("Delete")).toBeInTheDocument();
    expect(await comp.findByText("Describe")).toBeInTheDocument();
  });

  it("should some items checked by default", async () => {
    const onCheckedItemsChange = jest.fn();
    const comp = render(
      <SomeItemChecked onCheckedItemsChange={onCheckedItemsChange} />
    );
    await waitForI18n(comp);

    userEvent.click(await comp.findByText("Filter by resource type operation"));
    await waitForPopper();

    //checked operations checkbox
    const consumerGroup = comp.getByTestId("acls-consumer-group");
    const btnExpand = within(consumerGroup).getByRole("button");

    userEvent.click(btnExpand);

    expect(comp.getByRole("checkbox", { name: "All" })).toHaveAttribute(
      "checked"
    );

    expect(comp.getByRole("checkbox", { name: "Read" })).toHaveAttribute(
      "checked"
    );

    expect(comp.getByRole("checkbox", { name: "Delete" })).toHaveAttribute(
      "checked"
    );

    expect(comp.getByRole("checkbox", { name: "Describe" })).toHaveAttribute(
      "checked"
    );
  });

  it("should checked all the items of each category", async () => {
    const onCheckedItemsChange = jest.fn();
    const comp = render(
      <AllItemsChecked onCheckedItemsChange={onCheckedItemsChange} />
    );
    await waitForI18n(comp);

    userEvent.click(await comp.findByText("Filter by resource type operation"));
    await waitForPopper();

    const consumerGroup = comp.getByTestId("acls-consumer-group");
    const btnExpand = within(consumerGroup).getByRole("button");

    userEvent.click(btnExpand);

    //checked all operations checkbox
    expect(comp.getByRole("checkbox", { name: "All" })).toHaveAttribute(
      "checked"
    );

    expect(comp.getByRole("checkbox", { name: "Read" })).toHaveAttribute(
      "checked"
    );

    expect(comp.getByRole("checkbox", { name: "Delete" })).toHaveAttribute(
      "checked"
    );

    expect(comp.getByRole("checkbox", { name: "Describe" })).toHaveAttribute(
      "checked"
    );

    //checked all parent checkbox for all category
    expect(
      comp.getByRole("checkbox", { name: "G Consumer group" })
    ).toHaveAttribute("checked");

    expect(
      comp.getByRole("checkbox", { name: "KI Kafka instance" })
    ).toHaveAttribute("checked");

    expect(comp.getByRole("checkbox", { name: "T Topic" })).toHaveAttribute(
      "checked"
    );

    expect(
      comp.getByRole("checkbox", { name: "TI Transactional ID" })
    ).toHaveAttribute("checked");
  });

  //skipping below test due to issue in patternfly component. There is no checked attribute attached in DOM on checked checkbox.
  // Raised issue on slack with patternfly team https://patternfly.slack.com/archives/C4FM977N0/p1644936798748779
  xit("should item checked and expand, collaped based on user iteraction", async () => {
    const onCheckedItemsChange = jest.fn();
    const comp = render(
      <InteractiveExample onCheckedItemsChange={onCheckedItemsChange} />
    );
    await waitForI18n(comp);

    userEvent.click(await comp.findByText("Filter by resource type operation"));
    await waitForPopper();

    const consumerGroup = comp.getByTestId("acls-consumer-group");
    const btnExpand = within(consumerGroup).getByRole("button");

    userEvent.click(btnExpand);

    //expand consumer group and checked all the child items
    const checkedAll = within(consumerGroup).getByRole("checkbox", {
      name: "All",
    });
    userEvent.click(checkedAll);

    const checkedRead = within(consumerGroup).getByRole("checkbox", {
      name: "Read",
    });
    userEvent.click(checkedRead);

    const checkedDelete = within(consumerGroup).getByRole("checkbox", {
      name: "Delete",
    });
    userEvent.click(checkedDelete);

    const checkedDescribe = within(consumerGroup).getByRole("checkbox", {
      name: "Describe",
    });
    userEvent.click(checkedDescribe);

    //checked all operations checkbox
    expect(comp.getByRole("checkbox", { name: "All" })).toHaveAttribute(
      "checked"
    );

    expect(comp.getByRole("checkbox", { name: "Read" })).toHaveAttribute(
      "checked"
    );

    expect(comp.getByRole("checkbox", { name: "Delete" })).toHaveAttribute(
      "checked"
    );

    expect(comp.getByRole("checkbox", { name: "Describe" })).toHaveAttribute(
      "checked"
    );

    //checked all parent checkbox for all consumer group
    expect(
      comp.getByRole("checkbox", { name: "G Consumer group" })
    ).toHaveAttribute("checked");
  });
});
