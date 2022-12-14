import { composeStories } from "@storybook/testing-react";
import { render, waitForI18n } from "../test-utils";
import * as stories from "./KafkaPageV3.stories";

const { KafkaPageV3 } = composeStories(stories);

describe("KafkaPage", () => {
  it("renders", async () => {
    const comp = render(<KafkaPageV3 />);
    await waitForI18n(comp);
    expect(comp.baseElement).toMatchSnapshot();
  });
});
