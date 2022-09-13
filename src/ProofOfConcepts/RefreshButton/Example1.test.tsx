import React from "react";
import { userEvent } from "@storybook/testing-library";
import { composeStories } from "@storybook/testing-react";
import { render } from "../../test-utils";
import * as stories from "./Example1.stories";

const { Example } = composeStories(stories);

describe("TableView", () => {
  it("renders the Example", () => {
    const clickSpy = jest.fn();
    const comp = render(<Example onPageChange={clickSpy} />);

    expect(comp.queryAllByLabelText("Pagination")).toHaveLength(2);

    userEvent.click(comp.getAllByLabelText("Go to next page")[0]);
    expect(clickSpy).toHaveBeenNthCalledWith(1, 2, 10);
  });

  it("renders the toolbar content", () => {
    const comp = render(<Example toolbarContent={"sample toolbar"} />);
    expect(comp.getByText("sample toolbar")).toBeInTheDocument();
  });
});
