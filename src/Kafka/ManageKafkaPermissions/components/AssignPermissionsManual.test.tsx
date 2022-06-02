import { composeStories } from "@storybook/testing-react";
import * as stories from "./AssgnPermissionsManual.stories";
import { userEvent } from "@storybook/testing-library";
import { render, waitForI18n } from "../../../test-utils";

const {
  FormSubmitted,
  OnlyRowInTheTable,
  MultiplePermissionsExist,
  PrefixRuleVariant,
  KafkaInstancePermission,
  TopicPermission,
  ConsumerGroupPermission,
  TransactionalIdPermission,
} = composeStories(stories);

describe("Assign Permissions Manual", () => {
  it("should render a permissions table wehn form is sumbitted with validation error", async () => {
    const comp = render(<FormSubmitted />);

    await waitForI18n(comp);

    expect(await comp.findByText("Resource")).toBeInTheDocument();
    expect(await comp.findByText("Permission")).toBeInTheDocument();
    expect(await comp.findByText("Select type")).toBeInTheDocument();
    expect(await comp.findByText("Is")).toBeInTheDocument();
    expect(await comp.findByPlaceholderText("Enter name")).toBeInTheDocument();
    expect(await comp.findByText("Allow")).toBeInTheDocument();
    expect(await comp.findByText("Select operation")).toBeInTheDocument();
    const requiredValue = await comp.findAllByText("Required");
    expect(requiredValue[0]).toBeInTheDocument();
    expect(requiredValue[1]).toBeInTheDocument();
    expect(requiredValue[2]).toBeInTheDocument();
  });

  it("should render a permissions table and header with initial state when it is the only row in the table", async () => {
    const comp = render(<OnlyRowInTheTable />);

    await waitForI18n(comp);

    expect(await comp.findByText("Resource")).toBeInTheDocument();
    expect(await comp.findByText("Permission")).toBeInTheDocument();
    expect(await comp.findByText("Select type")).toBeInTheDocument();
    expect(await comp.findByText("Is")).toBeInTheDocument();
    expect(await comp.findByPlaceholderText("Enter name")).toBeInTheDocument();
    expect(await comp.findByText("Allow")).toBeInTheDocument();
    expect(await comp.findByText("Select operation")).toBeInTheDocument();
    expect(comp.queryByText("Required")).not.toBeInTheDocument();
  });

  it("should render a permissions table without header and multiple rows", async () => {
    const comp = render(<MultiplePermissionsExist />);

    await waitForI18n(comp);
    const resourceType = await comp.findAllByText("Select type");
    const resourcePrefix = await comp.findAllByText("Is");
    const resourceName = await comp.findAllByPlaceholderText("Enter name");
    const resourcePermision = await comp.findAllByText("Allow");
    const resourceOperation = await comp.findAllByText("Select operation");
    expect(comp.queryByText("Resource")).not.toBeInTheDocument();
    expect(comp.queryByText("Permission")).not.toBeInTheDocument();
    expect(comp.queryByText("Required")).not.toBeInTheDocument();
    expect(resourceType[0]).toBeInTheDocument();
    expect(resourceType[1]).toBeInTheDocument();
    expect(resourcePrefix[0]).toBeInTheDocument();
    expect(resourcePrefix[1]).toBeInTheDocument();
    expect(resourceName[0]).toBeInTheDocument();
    expect(resourceName[1]).toBeInTheDocument();
    expect(resourcePermision[0]).toBeInTheDocument();
    expect(resourcePermision[1]).toBeInTheDocument();
    expect(resourceOperation[0]).toBeInTheDocument();
    expect(resourceOperation[1]).toBeInTheDocument();
  });

  it("should render a permissions table with prefix rule 'Starts with' ", async () => {
    const comp = render(<PrefixRuleVariant />);

    await waitForI18n(comp);
    expect(await comp.findByText("Starts with")).toBeInTheDocument();
    expect(comp.queryByText("is")).not.toBeInTheDocument();
  });

  it("should render a permissions table with resource type consumer group ", async () => {
    const comp = render(<ConsumerGroupPermission />);

    await waitForI18n(comp);
    expect(await comp.findByText("Consumer group")).toBeInTheDocument();
    expect(await comp.findByText("Allow")).toBeInTheDocument();
    expect(await comp.findByText("Is")).toBeInTheDocument();
    expect(await comp.findByPlaceholderText("Enter name")).toBeInTheDocument();
    userEvent.click(await comp.findByText("Select operation"));
    expect(await comp.findByText("All")).toBeInTheDocument();
    expect(await comp.findByText("Read")).toBeInTheDocument();
    expect(await comp.findByText("Delete")).toBeInTheDocument();
    expect(await comp.findByText("Describe")).toBeInTheDocument();
  });

  it("should render a permissions table with resource type kafka instance ", async () => {
    const comp = render(<KafkaInstancePermission />);

    await waitForI18n(comp);
    expect(await comp.findByText("Kafka instance")).toBeInTheDocument();
    expect(await comp.findByText("Allow")).toBeInTheDocument();
    expect(comp.queryByText("is")).not.toBeInTheDocument();
    expect(comp.queryByPlaceholderText("Enter name")).not.toBeInTheDocument();
  });

  it("should render a permissions table with resource type topic ", async () => {
    const comp = render(<TopicPermission />);

    await waitForI18n(comp);
    expect(await comp.findByText("Topic")).toBeInTheDocument();
    expect(await comp.findByText("Allow")).toBeInTheDocument();
    expect(await comp.findByText("Is")).toBeInTheDocument();
    expect(await comp.findByPlaceholderText("Enter name")).toBeInTheDocument();
  });

  it("should render a permissions table with resource type transactional id ", async () => {
    const comp = render(<TransactionalIdPermission />);

    await waitForI18n(comp);
    expect(await comp.findByText("Transactional ID")).toBeInTheDocument();
    expect(await comp.findByText("Allow")).toBeInTheDocument();
    expect(await comp.findByText("Is")).toBeInTheDocument();
    expect(await comp.findByText("Select operation")).toBeInTheDocument();
    expect(await comp.findByPlaceholderText("Enter name")).toBeInTheDocument();
  });
});
