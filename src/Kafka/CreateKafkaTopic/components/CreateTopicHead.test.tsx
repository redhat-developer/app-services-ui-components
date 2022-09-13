import { composeStories } from "@storybook/testing-react";
import { render, waitForI18n } from "../../../test-utils";
import * as stories from "./CreateTopicHead.stories";

const { EmptyState } = composeStories(stories);

describe("Create topic", () => {
  it("should render breadcrumbs and switch", async () => {
    const comp = render(<EmptyState />);
    await waitForI18n(comp);
    const createTopicLabel = comp.getAllByText("Create topic");
    expect(createTopicLabel[0]).toBeInTheDocument();
    expect(createTopicLabel[1]).toBeInTheDocument();
    expect(
      comp.getByLabelText("Show all available options")
    ).toBeInTheDocument();
    expect(comp.getByText("Kafka Instances")).toBeInTheDocument();
    expect(comp.getByText("test-kafka")).toBeInTheDocument();
  });
});
