import React from "react";
import { render, waitForI18n } from "../../../../test-utils";
import { userEvent } from "@storybook/testing-library";
import { StatusPopover } from "./StatusPopover";
import sub from "date-fns/sub";

// Batch snapshot testing
describe("StatusPopover", () => {
  it("Step 0", async () => {
    const onClickConnectionTabLink = jest.fn();
    const onClickSupportLink = jest.fn();
    const createdAt = new Date();

    const tree = render(
      <StatusPopover
        initialOpen={true}
        createdAt={createdAt}
        onClickConnectionTabLink={onClickConnectionTabLink}
        onClickSupportLink={onClickSupportLink}
        status={"pending"}
      >
        <a>test</a>
      </StatusPopover>
    );
    await waitForI18n(tree);
    await tree.findByText("0 of 3 steps completed");
    userEvent.click(await tree.findByText("Connection tab."));
    expect(onClickConnectionTabLink).toBeCalledTimes(1);
    expect(onClickSupportLink).toBeCalledTimes(0);
  });

  it("Step 1", async () => {
    const onClickConnectionTabLink = jest.fn();
    const onClickSupportLink = jest.fn();
    const createdAt = new Date();

    const tree = render(
      <StatusPopover
        initialOpen={true}
        createdAt={createdAt}
        onClickConnectionTabLink={onClickConnectionTabLink}
        onClickSupportLink={onClickSupportLink}
        status={"provisioning"}
      >
        <a>test</a>
      </StatusPopover>
    );
    await waitForI18n(tree);
    await tree.findByText("1 of 3 steps completed");
    userEvent.click(await tree.findByText("Connection tab."));
    expect(onClickConnectionTabLink).toBeCalledTimes(1);
    expect(onClickSupportLink).toBeCalledTimes(0);
  });

  it("Step 2", async () => {
    const onClickConnectionTabLink = jest.fn();
    const onClickSupportLink = jest.fn();
    const createdAt = new Date();

    const tree = render(
      <StatusPopover
        initialOpen={true}
        createdAt={createdAt}
        onClickConnectionTabLink={onClickConnectionTabLink}
        onClickSupportLink={onClickSupportLink}
        status={"preparing"}
      >
        <a>test</a>
      </StatusPopover>
    );
    await waitForI18n(tree);
    await tree.findByText("2 of 3 steps completed");
    userEvent.click(await tree.findByText("Connection tab."));
    expect(onClickConnectionTabLink).toBeCalledTimes(1);
    expect(onClickSupportLink).toBeCalledTimes(0);
  });

  it("More than 15 minutes", async () => {
    const onClickConnectionTabLink = jest.fn();
    const onClickSupportLink = jest.fn();
    const createdAt = sub(new Date(), { minutes: 16 });

    const tree = render(
      <StatusPopover
        initialOpen={true}
        createdAt={createdAt}
        onClickConnectionTabLink={onClickConnectionTabLink}
        onClickSupportLink={onClickSupportLink}
        status={"pending"}
      >
        <a>test</a>
      </StatusPopover>
    );
    await waitForI18n(tree);
    await tree.findByText("0 of 3 steps completed");
    await tree.findByText("This is taking longer than expected.");
    userEvent.click(await tree.findByText("Connection tab."));
    expect(onClickConnectionTabLink).toBeCalledTimes(1);
    expect(onClickSupportLink).toBeCalledTimes(0);
  });

  it("More than 30 minutes", async () => {
    const onClickConnectionTabLink = jest.fn();
    const onClickSupportLink = jest.fn();
    const createdAt = sub(new Date(), { minutes: 31 });

    const tree = render(
      <StatusPopover
        initialOpen={true}
        createdAt={createdAt}
        onClickConnectionTabLink={onClickConnectionTabLink}
        onClickSupportLink={onClickSupportLink}
        status={"pending"}
      >
        <a>test</a>
      </StatusPopover>
    );
    await waitForI18n(tree);
    await tree.findByText("0 of 3 steps completed");
    await tree.findByText("This is taking longer than expected.");
    userEvent.click(await tree.findByText("Connections tab."));
    expect(onClickConnectionTabLink).toBeCalledTimes(1);
    // userEvent.click(await tree.findByText("open a support case."));
    // expect(onClickSupportLink).toBeCalledTimes(1);
  });
});
