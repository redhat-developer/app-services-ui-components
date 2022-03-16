import { render, waitForI18n } from "../../test-utils";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./KafkaConnectionTab.stories";

const { ConnectionTab, ConnectionTabWhenkafkaCreationPending } =
  composeStories(stories);

describe("ConnectionTab", () => {
  it("renders", async () => {
    const comp = render(<ConnectionTab />);
    await waitForI18n(comp);
    expect(comp.baseElement).toMatchSnapshot();
  });

  it("should render bootstrap server and Token endpoint URL value when kafka instance creation is done", async () => {
    const comp = render(<ConnectionTab />);
    await waitForI18n(comp);
    expect(await comp.findByLabelText("Bootstrap server")).toHaveDisplayValue(
      "hema-test-c-k-l-kafka-stage.rhcloud.com:443"
    );
    expect(await comp.findByLabelText("Token endpoint URL")).toHaveDisplayValue(
      "https://identify.api.stage.openshift.com/auth/realms/rhoas/protocol/openid-coonect/token"
    );
  });

  it("bootstrap server and Token endpoint URL should be disabled when the kafka creating is pending", async () => {
    const comp = render(<ConnectionTabWhenkafkaCreationPending />);
    await waitForI18n(comp);
    expect(await comp.queryByLabelText("Token endpoint URL")).toBe(null);
  });
});
