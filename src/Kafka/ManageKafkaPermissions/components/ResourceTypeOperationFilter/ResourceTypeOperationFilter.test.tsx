import React from "react";
import { composeStories } from "@storybook/testing-react";

import { render, waitForI18n, waitForPopper } from "../../../../test-utils";
import * as stories from "./ResourceTypeOperationFilter.stories";
import { userEvent } from "@storybook/testing-library";

const { NoItemChecked } = composeStories(stories);

describe("<ResourceTypeOperationFilter/>", () => {
  it("should render acls treeview and expend", async () => {
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
  });
});
