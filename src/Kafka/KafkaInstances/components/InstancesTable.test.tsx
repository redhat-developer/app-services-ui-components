import { userEvent, within } from "@storybook/testing-library";
import { composeStories } from "@storybook/testing-react";
import { render, waitForI18n } from "../../../test-utils";
import * as stories from "./InstancesTable.stories";

const { InstancesTable } = composeStories(stories);

describe("Instances Table", () => {
  it("Instance link click based on row status", async () => {
    const onCreateKafka = jest.fn();
    const onInstanceLinkClick = jest.fn();
    const comp = render(
      <InstancesTable
        onCreate={onCreateKafka}
        onInstanceLinkClick={onInstanceLinkClick}
      />
    );
    await waitForI18n(comp);
    userEvent.click(comp.getByText("Create Kafka instance"));
    expect(onCreateKafka).toBeCalledTimes(1);

    const instanceLinkDisable = comp.getAllByRole("row")[5];
    expect(
      within(instanceLinkDisable).getByText("Suspended")
    ).toBeInTheDocument();
    userEvent.click(within(instanceLinkDisable).getByText("buzz"));
    expect(onInstanceLinkClick).not.toHaveBeenCalled();

    const instanceLinkEnable = comp.getAllByRole("row")[3];
    expect(within(instanceLinkEnable).getByText("Ready")).toBeInTheDocument();
    expect(within(instanceLinkEnable).getByText("baz")).toBeEnabled();
    userEvent.click(within(instanceLinkEnable).getByText("baz"));
    expect(onInstanceLinkClick).toHaveBeenCalledTimes(1);
  });
});
