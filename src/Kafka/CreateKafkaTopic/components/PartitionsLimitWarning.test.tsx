import { userEvent } from "@storybook/testing-library";
import { composeStories } from "@storybook/testing-react";
import { render, waitForI18n } from "../../../test-utils";
import * as stories from "./PartitionsLimitWarning.stories";

const { EmptyState } = composeStories(stories);

describe("Partitions warning", () => {
  it("should render a partitions warning modal", async () => {
    const onSave = jest.fn();
    const isModalOpen = jest.fn();
    const comp = render(
      <EmptyState onSave={onSave} setIsModalOpen={isModalOpen} />
    );
    await waitForI18n(comp);
    expect(
      comp.getByText("Increase the number of partitions?")
    ).toBeInTheDocument();
    expect(
      comp.getByText(
        "Since this Kafka Instance has already reached its maximum partition limit, increasing the number of partitions might result in degraded performance."
      )
    ).toBeInTheDocument();
    expect(comp.getByText("No, return to form")).toBeInTheDocument();
    expect(comp.getByText("Yes")).toBeInTheDocument();
    userEvent.click(comp.getByText("No, return to form"));
    expect(isModalOpen).toBeCalledTimes(1);
    userEvent.click(comp.getByText("Yes"));
    expect(onSave).toBeCalledTimes(1);
  });
});
