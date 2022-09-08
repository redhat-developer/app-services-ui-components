import { composeStories } from "@storybook/testing-react";
import { render, waitForI18n } from "../../../test-utils";
import * as stories from "./AdvanceTopic.stories";

const { AdvanceTopic } = composeStories(stories);

describe("Create advance topic", () => {
  it("should render an advanced topic creation page", async () => {
    const comp = render(<AdvanceTopic />);
    await waitForI18n(comp);
    expect(comp.baseElement).toMatchSnapshot();
  });
});
