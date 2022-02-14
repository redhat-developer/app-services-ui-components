import React from "react";
// import { userEvent } from "@storybook/testing-library";
import { composeStories } from "@storybook/testing-react";

import {
  render,
  waitForI18n,
} from "../../../../test-utils";
import * as stories from "./ResourceTypeOperationFilter.stories";

const { ResourceTypeOperationFilterStory } = composeStories(stories);

// jest.mock("popper.js", () => {
//   const PopperJS = jest.requireActual("popper.js");

//   return class {
//     static placements = PopperJS.placements;

//     constructor() {
//       return {
//         destroy: () => {},
//         scheduleUpdate: () => {},
//       };
//     }
//   };
// });

describe("<ResourceTypeOperationFilter/>", () => {
  it("should render acls treeview and expend", async () => {
    const onCheckedItemsChange = jest.fn();
    const comp = render(
      <ResourceTypeOperationFilterStory
        checkedItems={[]}
        onCheckedItemsChange={onCheckedItemsChange}
      />
    );

    await waitForI18n(comp);

    // const menuToggle = within(
    //   await comp.findByTestId("acls-treeview-menu-toggle")
    // );

    //const button = await comp.getByText(/Filter by resource type operation/i);
    // button.click();

    //userEvent.click(await comp.findByText("Filter by resource type operation"));
  });
});
