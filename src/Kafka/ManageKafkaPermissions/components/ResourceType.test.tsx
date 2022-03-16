import { composeStories } from "@storybook/testing-react";
import * as stories from "./ResourceType.stories";
import { userEvent } from "@storybook/testing-library";
import { render, waitForI18n } from "../../../test-utils";

const { InitialState, InteractiveExample } = composeStories(stories);

describe("Resource type", () => {
  it("should render a select component for resource type", async () => {
    const onChangeValue = jest.fn();
    const comp = render(<InitialState onChangeValue={onChangeValue} />);

    await waitForI18n(comp);

    expect(await comp.findByText("Select type")).toBeInTheDocument();
    expect(await comp.findByText("Consumer group")).toBeInTheDocument();
    expect(await comp.findByText("Topic")).toBeInTheDocument();
    expect(await comp.findByText("Kafka instance")).toBeInTheDocument();
    expect(await comp.findByText("Transactional ID")).toBeInTheDocument();
    userEvent.click(await comp.findByText("Transactional ID"));
    expect(await comp.findByText("Select type")).toBeInTheDocument();
    expect(await comp.queryByText("Topic")).not.toBeInTheDocument();
    expect(await comp.queryByText("Kafka instance")).not.toBeInTheDocument();
    expect(await comp.queryByText("Transactional ID")).not.toBeInTheDocument();
    expect(await comp.queryByText("Consumer group")).not.toBeInTheDocument();
  });
  it("should show a select component for resource type ", async () => {
    const onChangeValue = jest.fn();
    const comp = render(<InteractiveExample onChangeValue={onChangeValue} />);
    await waitForI18n(comp);
    expect(await comp.findByText("Select type")).toBeInTheDocument();
    expect(await comp.findByText("Consumer group")).toBeInTheDocument();
    expect(await comp.findByText("Topic")).toBeInTheDocument();
    expect(await comp.findByText("Kafka instance")).toBeInTheDocument();
    expect(await comp.findByText("Transactional ID")).toBeInTheDocument();
    userEvent.click(await comp.findByText("Transactional ID"));
    expect(await comp.findByText("Transactional ID")).toBeInTheDocument();
    expect(await comp.queryByText("Topic")).not.toBeInTheDocument();
    expect(await comp.queryByText("Kafka instance")).not.toBeInTheDocument();
    expect(await comp.queryByText("Consumer group")).not.toBeInTheDocument();
  });
});
