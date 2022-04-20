import { userEvent } from "@storybook/testing-library";
import { composeStories } from "@storybook/testing-react";
import { waitFor } from "@testing-library/react";
import { render, waitForI18n } from "../../test-utils";
import * as stories from "./KafkaMessageBrowser.stories";

const { Example, InitialLoading, NoData, NoMatch } = composeStories(stories);

describe("KafkaMessageBrowser", () => {
  it("renders the Example", async () => {
    const getMessages = jest.fn(Example.args!.getMessages);
    const comp = render(<Example getMessages={getMessages} />);
    await waitForI18n(comp);
    expect(getMessages).toBeCalledTimes(1);
    // 1 row for the header plus 10 rows of data
    expect(await comp.findAllByRole("row")).toHaveLength(11);
  });

  it("renders the right empty state if there are no messages at all", async () => {
    const getMessages = jest.fn(NoData.args!.getMessages);
    const comp = render(<NoData getMessages={getMessages} />);
    await waitForI18n(comp);
    expect(
      await comp.findByText(
        "Data will appear shortly after we receive produced messages."
      )
    ).toBeInTheDocument();
    expect(getMessages).toBeCalledTimes(1);
    userEvent.click(comp.getByText("Check for new data"));
    expect(getMessages).toBeCalledTimes(2);
  });

  it("renders a single spinner when initially loading the data", async () => {
    const comp = render(<InitialLoading />);
    await waitForI18n(comp);
    expect(comp.getByRole("progressbar")).toBeInTheDocument();
  });

  // this also tests the toolbar
  it("renders the right empty state if after a filtering there is no data", async () => {
    const comp = render(<NoMatch />);
    await waitForI18n(comp);
    await NoMatch.play({ canvasElement: comp.container });
    expect(
      await comp.findByText("Adjust your selection criteria and try again.")
    ).toBeInTheDocument();
    userEvent.click(comp.getByText("Show latest messages"));
    await waitFor(() => expect(comp.queryAllByRole("row")).toHaveLength(11));
  });
});
