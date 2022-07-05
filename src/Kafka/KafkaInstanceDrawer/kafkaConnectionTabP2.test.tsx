import { composeStories } from "@storybook/testing-react";
import { render, waitForI18n } from "../../test-utils";
import * as stories from "./KafkaConnectionTabP2.stories";

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
      "https://identify.api.stage.openshift.com/auth/realms/rhoas/protocol/openid-connect/token"
    );
    expect(
      await comp.findByLabelText("URL for Kafka Instance API")
    ).toHaveDisplayValue(
      "https://admin-server-[name of instance]-[domain]/openapi"
    );
    expect(
      await comp.findByLabelText("URL for Kafka Management API")
    ).toHaveDisplayValue(
      "https://api.openshift.com/api/kafkas_mgmt/v1/openapi"
    );
  });

  it("bootstrap server and Token endpoint URL should be disabled when the kafka creating is pending", async () => {
    const comp = render(<ConnectionTabWhenkafkaCreationPending />);
    await waitForI18n(comp);
    expect(comp.queryByLabelText("Bootstrap server")).toBe(null);
    expect(comp.queryByLabelText("Token endpoint URL")).toBe(null);
    expect(comp.queryByLabelText("URL for Kafka Instance API")).toBe(null);
    expect(comp.queryByLabelText("URL for Kafka Management API")).toBe(null);
  });
});
