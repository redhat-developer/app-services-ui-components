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

    expect(await comp.getByText("Resource")).toBeInTheDocument();
    expect(await comp.getByText("Permission")).toBeInTheDocument();
    expect(await comp.findByText("Consume from a topic")).toBeInTheDocument();
    expect(await comp.getByText("Write")).toBeInTheDocument();
    expect(await comp.getByText("Create")).toBeInTheDocument();
    expect(await comp.getByText("Read")).toBeInTheDocument();
    expect(await comp.getByText("Describe")).toBeInTheDocument();
    expect(await comp.getByText("Topic")).toBeInTheDocument();
    expect(await comp.getByText("Consumer group")).toBeInTheDocument();
    const requiredValue = await comp.getAllByText("Required");
    expect(requiredValue[0]).toBeInTheDocument();
    expect(requiredValue[1]).toBeInTheDocument();
    const allow = await comp.getAllByText("Allow");
    expect(allow[0]).toBeInTheDocument();
    expect(allow[1]).toBeInTheDocument();
    const startsWith = await comp.getAllByText("starts-with");
    expect(startsWith[0]).toBeInTheDocument();
    expect(startsWith[1]).toBeInTheDocument();
    const prefix = await comp.getAllByPlaceholderText("Enter prefix");
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
