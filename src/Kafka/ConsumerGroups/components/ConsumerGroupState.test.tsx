import { render, waitForI18n } from "../../../test-utils";
import { ConsumerGroupStateLabel } from "./ConsumerGroupState";

describe("Consumer group state label", () => {
  it("On select Completing Rebalance state", async () => {
    const comp = render(
      <ConsumerGroupStateLabel state={"CompletingRebalance"} />
    );
    await waitForI18n(comp);
    expect(await comp.findByText("Completing rebalance")).toBeInTheDocument();
  });
  it("On select Empty state", async () => {
    const comp = render(<ConsumerGroupStateLabel state={"Empty"} />);
    await waitForI18n(comp);
    expect(await comp.findByText("Empty")).toBeInTheDocument();
  });
  it("On select Stable state", async () => {
    const comp = render(<ConsumerGroupStateLabel state={"Stable"} />);
    await waitForI18n(comp);
    expect(await comp.findByText("Stable")).toBeInTheDocument();
  });

  it("On select preparing rebalance state", async () => {
    const comp = render(
      <ConsumerGroupStateLabel state={"PreparingRebalance"} />
    );
    await waitForI18n(comp);
    expect(await comp.findByText("Preparing rebalance")).toBeInTheDocument();
  });

  it("On select Unknown state", async () => {
    const comp = render(<ConsumerGroupStateLabel state={"Unknown"} />);
    await waitForI18n(comp);
    expect(await comp.findByText("Unknown")).toBeInTheDocument();
  });

  it("On select dead state", async () => {
    const comp = render(<ConsumerGroupStateLabel state={"Dead"} />);
    await waitForI18n(comp);
    expect(await comp.findByText("Dead")).toBeInTheDocument();
  });
});
