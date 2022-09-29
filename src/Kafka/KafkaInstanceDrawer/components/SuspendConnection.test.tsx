import { render, waitForI18n } from "../../../test-utils";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./SuspendConnection.stories";

const { SuspendedConnectionEmptyState } = composeStories(stories);

describe("Consumer Group empty state", () => {
  it("renders", async () => {
    const comp = render(<SuspendedConnectionEmptyState />);
    await waitForI18n(comp);
    expect(comp.baseElement).toMatchSnapshot();
  });
});
