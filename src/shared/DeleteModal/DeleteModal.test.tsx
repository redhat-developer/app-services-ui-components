import React from "react";
import { render, waitFor } from "../../test-utils";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./DeleteModal.stories";
import { userEvent } from "@storybook/testing-library";

const {
  SynchronousDelete,
  SynchronousDeleteWithError,
  SynchronousDeleteWithConfirmation,
  AsynchronousDelete,
  AsynchronousDeleteWithError,
  AsynchronousDeleteWithConfirmation,
} = composeStories(stories);

describe("DeleteModal", () => {
  it("SynchronousDelete - can delete", async () => {
    const onDelete = jest.fn();
    const onCancel = jest.fn();

    const comp = render(
      <div id={"root"}>
        <SynchronousDelete onDelete={onDelete} onCancel={onCancel} />
      </div>
    );
    expect(await comp.findByText("You are deleting something.")).toBeTruthy();
    userEvent.click(await comp.findByText("Delete"));
    await waitFor(() => {
      expect(
        comp.queryByText("You are deleting something.")
      ).not.toBeInTheDocument();
    });
    expect(onDelete).toBeCalledTimes(1);
    expect(onCancel).not.toBeCalled();
  });

  it("SynchronousDelete - can cancel", async () => {
    const onDelete = jest.fn();
    const onCancel = jest.fn();

    const comp = render(
      <div id={"root"}>
        <SynchronousDelete onDelete={onDelete} onCancel={onCancel} />
      </div>
    );
    expect(await comp.findByText("You are deleting something.")).toBeTruthy();
    userEvent.click(await comp.findByText("Cancel"));
    await waitFor(() => {
      expect(
        comp.queryByText("You are deleting something.")
      ).not.toBeInTheDocument();
    });
    expect(onCancel).toBeCalledTimes(1);
    expect(onDelete).not.toBeCalled();
  });

  it("SynchronousDeleteWithError", async () => {
    const comp = render(
      <div id={"root"}>
        <SynchronousDeleteWithError />
      </div>
    );
    expect(await comp.findByText("Danger alert title")).toBeTruthy();
  });

  it("SynchronousDeleteWithConfirmation", async () => {
    const comp = render(
      <div id={"root"}>
        <SynchronousDeleteWithConfirmation />
      </div>
    );
    await SynchronousDeleteWithConfirmation.play({
      canvasElement: comp.container,
    });
    await waitFor(() => {
      expect(
        comp.queryByText("You are deleting something.")
      ).not.toBeInTheDocument();
    });
  });

  it("AsynchronousDelete - delete button disabled after clicking", async () => {
    const comp = render(
      <div id={"root"}>
        <AsynchronousDelete />
      </div>
    );
    const button = await comp.findByText("Delete");
    userEvent.click(button);
    expect(button).toBeDisabled();
  });

  it("AsynchronousDelete - can retry in case of error", async () => {
    const comp = render(
      <div id={"root"}>
        <AsynchronousDeleteWithError />
      </div>
    );
    const button = await comp.findByText("Delete");
    userEvent.click(button);
    expect(button).toBeDisabled();
    expect(await comp.findByText("Danger alert title")).toBeTruthy();
    expect(button).toBeEnabled();
  });

  it("AsynchronousDelete - can delete", async () => {
    const onDelete = jest.fn();
    const onCancel = jest.fn();

    const comp = render(
      <div id={"root"}>
        <AsynchronousDeleteWithConfirmation
          onDelete={onDelete}
          onCancel={onCancel}
        />
      </div>
    );
    await AsynchronousDeleteWithConfirmation.play({
      canvasElement: comp.container,
    });
    await waitFor(() => {
      expect(
        comp.queryByText("You are deleting something.")
      ).not.toBeInTheDocument();
    });
    expect(onDelete).toBeCalledTimes(1);
    expect(onCancel).not.toBeCalled();
  });
});
