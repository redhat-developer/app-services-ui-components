import { userEvent } from "@storybook/testing-library";
import { composeStories } from "@storybook/testing-react";
import { render } from "../../test-utils";
import * as stories from "./TableView.stories";

const { Example, NoResults, LoadingNewPage, SinglePage, UpdatingResults } =
  composeStories(stories);

describe("TableView", () => {
  it("renders the Example", () => {
    const clickSpy = jest.fn();
    const comp = render(<Example onPageChange={clickSpy} />);

    expect(comp.queryAllByLabelText("Pagination")).toHaveLength(2);

    userEvent.click(comp.getAllByLabelText("Go to next page")[0]);
    expect(clickSpy).toHaveBeenNthCalledWith(1, 2, 10);
  });

  it("renders the empty state", () => {
    const comp = render(<NoResults />);
    expect(
      comp.getByText(
        "Empty state to show when the data is filtered but has no results"
      )
    ).toBeInTheDocument();
  });

  it("shows a skeleton loader with undefined data but with a known item count", async () => {
    const comp = render(<LoadingNewPage />);
    expect(await comp.findAllByText("Loading content")).toHaveLength(3);
  });

  it("hides the pagination for a single page of data", () => {
    const comp = render(<SinglePage />);
    expect(comp.queryByLabelText("Pagination")).not.toBeInTheDocument();
  });

  it("hides the pagination when fetching for new data (data is undefined and item count is undefined)", () => {
    const comp = render(<UpdatingResults />);
    expect(comp.queryByLabelText("Pagination")).not.toBeInTheDocument();
  });

  it("renders the toolbar content", () => {
    const comp = render(<Example toolbarContent={"sample toolbar"} />);
    expect(comp.getByText("sample toolbar")).toBeInTheDocument();
  });
});
