import { composeStories } from "@storybook/testing-react";
import * as stories from "./ConsumeTopicShortcut.stories";
import { render, waitForI18n } from "../../../test-utils";

const {
  FormSubmitted,
  MultipleRowsExist,
  OnlyRowInTheTable,
  PrefixRuleVariant,
} = composeStories(stories);

describe("Consume Topic shortcut permissions", () => {
  it("should render a shortcut permissions table row when form is sumbitted", async () => {
    const comp = render(<FormSubmitted />);

    await waitForI18n(comp);

    expect(await comp.findByText("Resource")).toBeInTheDocument();
    expect(await comp.findByText("Permission")).toBeInTheDocument();
    expect(await comp.findByText("Consume from a topic")).toBeInTheDocument();
    expect(await comp.findByText("Write")).toBeInTheDocument();
    expect(await comp.findByText("Create")).toBeInTheDocument();
    expect(await comp.findByText("Read")).toBeInTheDocument();
    expect(await comp.findByText("Describe")).toBeInTheDocument();
    expect(await comp.findByText("Topic")).toBeInTheDocument();
    expect(await comp.findByText("Consumer group")).toBeInTheDocument();
    const requiredValue = await comp.findAllByText("Required");
    expect(requiredValue[0]).toBeInTheDocument();
    expect(requiredValue[1]).toBeInTheDocument();
    const allow = await comp.findAllByText("Allow");
    expect(allow[0]).toBeInTheDocument();
    expect(allow[1]).toBeInTheDocument();
    const startsWith = await comp.findAllByText("Starts with");
    expect(startsWith[0]).toBeInTheDocument();
    expect(startsWith[1]).toBeInTheDocument();
    const prefix = await comp.findAllByPlaceholderText("Enter prefix");
    expect(prefix[0]).toBeInTheDocument();
    expect(prefix[1]).toBeInTheDocument();
  });

  it("should render a permissions table without header with initial state when there are multiple rows in the table", async () => {
    const comp = render(<MultipleRowsExist />);

    await waitForI18n(comp);
    expect(comp.baseElement).toMatchSnapshot();
  });

  it("should render a permissions table and header with initial state when there is only one row in the table", async () => {
    const comp = render(<OnlyRowInTheTable />);

    await waitForI18n(comp);
    expect(comp.baseElement).toMatchSnapshot();
  });

  it("should render a permissions table and header with initial state and prefix variant set to is", async () => {
    const comp = render(<PrefixRuleVariant />);

    await waitForI18n(comp);
    expect(comp.baseElement).toMatchSnapshot();
  });
});
