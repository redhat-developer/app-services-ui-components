import { userEvent } from "@storybook/testing-library";
import { composeStories } from "@storybook/testing-react";
import { render, waitForI18n } from "../../../test-utils";
import * as stories from "./ResourceOperation.stories";

const { WorksWithModal, InvalidSelection, ValidSelection } =
  composeStories(stories);

describe("Resource type", () => {
  it("should render a select component for resource type", async () => {
    const onChangeValue = jest.fn();
    const comp = render(<WorksWithModal onChangeValue={onChangeValue} />);

    await waitForI18n(comp);

    expect(await comp.findByText("Select operation")).toBeInTheDocument();
    expect(await comp.findByText("All")).toBeInTheDocument();
    expect(await comp.findByText("Read")).toBeInTheDocument();
    expect(await comp.findByText("Write")).toBeInTheDocument();
    expect(await comp.findByText("Create")).toBeInTheDocument();
    expect(await comp.findByText("Delete")).toBeInTheDocument();
    expect(await comp.findByText("Alter")).toBeInTheDocument();
    expect(await comp.findByText("Describe")).toBeInTheDocument();
    expect(await comp.findByText("Describe configs")).toBeInTheDocument();
    expect(await comp.findByText("Alter configs")).toBeInTheDocument();
    userEvent.click(await comp.findByText("Delete"));
    expect(await comp.findByText("Select operation")).toBeInTheDocument();
    expect(comp.queryByText("Delete")).not.toBeInTheDocument();
    expect(comp.queryByText("All")).not.toBeInTheDocument();
    expect(comp.queryByText("Read")).not.toBeInTheDocument();
    expect(comp.queryByText("Write")).not.toBeInTheDocument();
    expect(comp.queryByText("Create")).not.toBeInTheDocument();
    expect(comp.queryByText("Delete")).not.toBeInTheDocument();
    expect(comp.queryByText("Alter")).not.toBeInTheDocument();
    expect(comp.queryByText("Describe")).not.toBeInTheDocument();
    expect(comp.queryByText("Describe configs")).not.toBeInTheDocument();
    expect(comp.queryByText("Alter configs")).not.toBeInTheDocument();
  });
  it("should show a select component for resource type with validation error ", async () => {
    const onChangeValue = jest.fn();
    const comp = render(<InvalidSelection onChangeValue={onChangeValue} />);
    await waitForI18n(comp);
    expect(await comp.findByText("Select operation")).toBeInTheDocument();
    expect(await comp.findByText("Required")).toBeInTheDocument();
    userEvent.click(await comp.findByText("Select operation"));
    expect(await comp.findByText("Select operation")).toBeInTheDocument();
    expect(await comp.findByText("All")).toBeInTheDocument();
    expect(await comp.findByText("Read")).toBeInTheDocument();
    expect(await comp.findByText("Write")).toBeInTheDocument();
    expect(await comp.findByText("Create")).toBeInTheDocument();
    expect(await comp.findByText("Delete")).toBeInTheDocument();
    expect(await comp.findByText("Alter")).toBeInTheDocument();
    expect(await comp.findByText("Describe")).toBeInTheDocument();
    expect(await comp.findByText("Describe configs")).toBeInTheDocument();
    expect(await comp.findByText("Alter configs")).toBeInTheDocument();
    userEvent.click(await comp.findByText("Delete"));
    expect(await comp.findByText("Select operation")).toBeInTheDocument();
    expect(comp.queryByText("Delete")).not.toBeInTheDocument();
    expect(await comp.findByText("Select operation")).toBeInTheDocument();
    expect(await comp.findByText("Required")).toBeInTheDocument();
  });

  it("should show a select component for resource type with a valid value selected ", async () => {
    const onChangeValue = jest.fn();
    const comp = render(<ValidSelection onChangeValue={onChangeValue} />);
    await waitForI18n(comp);
    expect(await comp.findByText("All")).toBeInTheDocument();
    expect(comp.queryByText("Select operation")).not.toBeInTheDocument();
    userEvent.click(await comp.findByText("All"));
    expect(await comp.findByText("Read")).toBeInTheDocument();
    expect(await comp.findByText("Write")).toBeInTheDocument();
    expect(await comp.findByText("Create")).toBeInTheDocument();
    expect(await comp.findByText("Delete")).toBeInTheDocument();
    expect(await comp.findByText("Alter")).toBeInTheDocument();
    expect(await comp.findByText("Describe")).toBeInTheDocument();
    expect(await comp.findByText("Describe configs")).toBeInTheDocument();
    expect(await comp.findByText("Alter configs")).toBeInTheDocument();
    const operationValue = comp.getAllByText("All");
    expect(operationValue[0]).toBeInTheDocument();
    expect(operationValue[1]).toBeInTheDocument();
  });
});
