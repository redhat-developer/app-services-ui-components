import { composeStories } from "@storybook/testing-react";
import * as stories from "./MultipleShortcutsView.stories";
import { render, waitForI18n } from "../../../test-utils";

const { FormSubmitted, MultipleShortcutsView } = composeStories(stories);

describe("Multiple shortcuts view", () => {
  it("should render a shortcuts table wit multiple permisions", async () => {
    const comp = render(<MultipleShortcutsView />);

    await waitForI18n(comp);

    expect(await comp.getByText("Resource")).toBeInTheDocument();
    expect(await comp.getByText("Permission")).toBeInTheDocument();
    expect(await comp.findByText("Consume from a topic")).toBeInTheDocument();
    expect(await comp.findByText("Produce to a topic")).toBeInTheDocument();
    expect(await comp.findByText("Manage access")).toBeInTheDocument();
    const topic = await comp.getAllByText("Topic");
    expect(topic[0]).toBeInTheDocument();
    expect(topic[1]).toBeInTheDocument();
    const startsWith = await comp.getAllByText("starts-with");
    expect(startsWith[0]).toBeInTheDocument();
    expect(startsWith[1]).toBeInTheDocument();
    expect(startsWith[2]).toBeInTheDocument();
    const prefix = await comp.getAllByPlaceholderText("Enter prefix");
    expect(prefix[0]).toBeInTheDocument();
    expect(prefix[1]).toBeInTheDocument();
    expect(prefix[2]).toBeInTheDocument();
    const allow = await comp.getAllByText("Allow");
    expect(allow[0]).toBeInTheDocument();
    expect(allow[1]).toBeInTheDocument();
    expect(allow[2]).toBeInTheDocument();
    expect(allow[3]).toBeInTheDocument();
    const write = await comp.getAllByText("Write");
    expect(write[0]).toBeInTheDocument();
    expect(write[1]).toBeInTheDocument();
    const create = await comp.getAllByText("Create");
    expect(create[0]).toBeInTheDocument();
    expect(create[1]).toBeInTheDocument();
    expect(await comp.getByText("Consumer group")).toBeInTheDocument();
    expect(await comp.getByText("Read")).toBeInTheDocument();
    expect(await comp.getByText("Describe")).toBeInTheDocument();
    expect(await comp.getByText("Alter")).toBeInTheDocument();
    expect(
      await comp.getByText("Kafka instance story-instance")
    ).toBeInTheDocument();
    expect(await comp.queryByText("Required")).not.toBeInTheDocument();
  });

  it("should render a shortcuts table wit multiple permisions and validation error", async () => {
    const comp = render(<FormSubmitted />);

    await waitForI18n(comp);
    const required = await comp.getAllByText("Required");
    expect(required[0]).toBeInTheDocument();
    expect(required[1]).toBeInTheDocument();
    expect(required[2]).toBeInTheDocument();
  });
});
