import { composeStories } from "@storybook/testing-react";
import { render, waitForI18n } from "../test-utils";
import * as stories from "./KafkaPageV2.stories";

const { KafkaPageV2 } = composeStories(stories);

describe("KafkaPage", () => {
  it("renders", async () => {
    const comp = render(<KafkaPageV2 />);
    await waitForI18n(comp);
    expect(comp.baseElement).toMatchSnapshot();
  });

  it("should persist ouia ids", async () => {
    const comp = render(<KafkaPageV2 />);
    await waitForI18n(comp);
    expect(comp.getByRole("article", { name: "Purchase now" })).toHaveAttribute(
      "data-ouia-component-id",
      "card-overview-purchase-now"
    );
    expect(comp.getByRole("link", { name: "Purchase now" })).toHaveAttribute(
      "data-ouia-component-id",
      "link-purchase-now"
    );

    expect(
      comp.getByRole("article", { name: "Contact sales" })
    ).toHaveAttribute("data-ouia-component-id", "card-overview-contact-sales");
    expect(comp.getByRole("link", { name: "Contact sales" })).toHaveAttribute(
      "data-ouia-component-id",
      "link-contact-sales"
    );
  });
});
