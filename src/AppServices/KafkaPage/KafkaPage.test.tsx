import { render, waitForI18n } from "../../test-utils";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./KafkaPage.stories";

const { Example } = composeStories(stories);

describe("KafkaPage", () => {
  it("renders", async () => {
    const comp = render(<Example />);
    await waitForI18n(comp);
    expect(comp.baseElement).toMatchSnapshot();
  });

  it("should persist ouiaComponentId of purchase card", async () => {
    const comp = render(<Example />);
    await waitForI18n(comp);

    const purchaseCard = comp.getByRole("article", { name: "Purchase now" });
    expect(purchaseCard.dataset.ouiaComponentId).toBe(
      "card-overview-purchase-now"
    );

    const link = comp.getByRole("link", { name: "Purchase now" });
    expect(link.dataset.ouiaComponentId).toBe("link-purchase-now");
  });

  it("should persist ouiaComponentId of contact card", async () => {
    const comp = render(<Example />);
    await waitForI18n(comp);

    const purchaseCard = comp.getByRole("article", { name: "Contact sales" });
    expect(purchaseCard.dataset.ouiaComponentId).toBe(
      "card-overview-contact-sales"
    );

    const link = comp.getByRole("link", { name: "Contact sales" });
    expect(link.dataset.ouiaComponentId).toBe("link-contact-sales");
  });
});
