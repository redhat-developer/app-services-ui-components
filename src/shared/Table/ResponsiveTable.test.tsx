import { userEvent } from "@storybook/testing-library";
import { composeStories } from "@storybook/testing-react";
import { render } from "../../test-utils";
import * as stories from "./ResponsiveTable.stories";
import { sampleData } from "./storybookHelpers";

const {
  Example,
  NoSelectedRow,
  UndefinedDataShowsSkeleton,
  WithoutActions,
  NoResults,
  CustomActionTestId,
} = composeStories(stories);

describe("ResponsiveTable", () => {
  it("renders the Example", () => {
    const clickSpy = jest.fn();
    const comp = render(<Example onRowClick={clickSpy} />);
    sampleData
      .flatMap((row) => row.slice(0, -1))
      .forEach((cell) => {
        if (typeof cell === "string")
          expect(comp.getByText(cell)).toBeInTheDocument();
      });
    expect(comp.queryAllByTestId("row-selected")).toHaveLength(1);
    expect(comp.queryAllByTestId("row-deleted")).toHaveLength(1);
    expect(comp.queryAllByLabelText("Actions")).toHaveLength(
      sampleData.length - 1 /* deleted lines don't have actions */
    );
    const actions = comp.queryAllByTestId("actions-for-row-0");
    userEvent.click(actions[0]);
    expect(clickSpy).not.toHaveBeenCalled();
    userEvent.click(comp.getByText(sampleData[0][0]));

    expect(clickSpy).toHaveBeenNthCalledWith(1, {
      row: sampleData[0],
      rowIndex: 0,
    });
  });

  it("renders the empty state", () => {
    const comp = render(<NoResults />);
    expect(
      comp.getByText(
        "Empty state to show when the data is filtered but has no results"
      )
    ).toBeInTheDocument();
  });

  it("works without specifying isRowSelected", () => {
    const comp = render(<NoSelectedRow />);
    expect(comp.queryAllByTestId("row-selected")).toHaveLength(0);
  });

  xit("supports unclickable rows", () => {
    // not sure how to test this
  });

  it("shows a skeleton loader with undefined data", async () => {
    const comp = render(<UndefinedDataShowsSkeleton />);
    expect(await comp.findAllByText("Loading content")).toHaveLength(3);
  });

  it("works without specifying renderActions", () => {
    const comp = render(<WithoutActions />);
    expect(comp.queryAllByLabelText("Actions")).toHaveLength(0);
  });

  it("can use a custom test id for actions", () => {
    const comp = render(<CustomActionTestId />);
    expect(comp.queryAllByTestId("my-action-row-0")).toHaveLength(1);
  });
});
