import { userEvent } from "@storybook/testing-library";
import { sub } from "date-fns";
import { render, waitForI18n, waitForPopper } from "../../test-utils";
import { KafkaInstanceStatus } from "./KafkaInstanceStatus";

// Batch snapshot testing
describe("KafkaInstanceStatus", () => {
  it("Accepted", async () => {
    const onClickConnectionTabLink = jest.fn();
    const onClickSupportLink = jest.fn();
    const createdAt = new Date();

    const tree = render(
      <KafkaInstanceStatus
        onClickConnectionTabLink={onClickConnectionTabLink}
        onClickSupportLink={onClickSupportLink}
        status={"accepted"}
        createdAt={createdAt}
      />
    );
    userEvent.click(await tree.findByText("Creating"));

    await waitForI18n(tree);
    await tree.findByText("0 of 3 steps completed");
    userEvent.click(await tree.findByText("Connection tab."));
    expect(onClickConnectionTabLink).toBeCalledTimes(1);
    expect(onClickSupportLink).toBeCalledTimes(0);
  });

  it("Provisioning", async () => {
    const onClickConnectionTabLink = jest.fn();
    const onClickSupportLink = jest.fn();
    const createdAt = new Date();

    const tree = render(
      <KafkaInstanceStatus
        onClickConnectionTabLink={onClickConnectionTabLink}
        onClickSupportLink={onClickSupportLink}
        status={"provisioning"}
        createdAt={createdAt}
      />
    );
    await waitForI18n(tree);
    userEvent.click(await tree.findByText("Creating"));

    await tree.findByText("1 of 3 steps completed");
    userEvent.click(await tree.findByText("Connection tab."));
    expect(onClickConnectionTabLink).toBeCalledTimes(1);
    expect(onClickSupportLink).toBeCalledTimes(0);
  });

  it("Preparing", async () => {
    const onClickConnectionTabLink = jest.fn();
    const onClickSupportLink = jest.fn();
    const createdAt = new Date();

    const tree = render(
      <KafkaInstanceStatus
        onClickConnectionTabLink={onClickConnectionTabLink}
        onClickSupportLink={onClickSupportLink}
        status={"preparing"}
        createdAt={createdAt}
      />
    );
    await waitForI18n(tree);
    userEvent.click(await tree.findByText("Creating"));

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
      <KafkaInstanceStatus
        onClickConnectionTabLink={onClickConnectionTabLink}
        onClickSupportLink={onClickSupportLink}
        status={"accepted"}
        createdAt={createdAt}
      />
    );
    await waitForI18n(tree);
    userEvent.click(await tree.findByText("Creating"));

    await tree.findByText("0 of 3 steps completed");
    expect(
      await tree.findAllByText("This is taking longer than expected.")
    ).toHaveLength(2);
    userEvent.click(await tree.findByText("Connection tab."));
    expect(onClickConnectionTabLink).toBeCalledTimes(1);
    expect(onClickSupportLink).toBeCalledTimes(0);
  });

  it("More than 30 minutes", async () => {
    const onClickConnectionTabLink = jest.fn();
    const onClickSupportLink = jest.fn();
    const createdAt = sub(new Date(), { minutes: 31 });

    const tree = render(
      <KafkaInstanceStatus
        onClickConnectionTabLink={onClickConnectionTabLink}
        onClickSupportLink={onClickSupportLink}
        status={"accepted"}
        createdAt={createdAt}
      />
    );
    await waitForI18n(tree);
    userEvent.click(await tree.findByText("Creating"));

    await tree.findByText("0 of 3 steps completed");
    expect(
      await tree.findAllByText("This is taking longer than expected.")
    ).toHaveLength(2);
    userEvent.click(await tree.findByText("Connections tab."));
    expect(onClickConnectionTabLink).toBeCalledTimes(1);

    userEvent.click(await tree.findByText("Creating"));
    await waitForPopper();
    userEvent.click(await tree.findByText("open a support case."));
    expect(onClickSupportLink).toBeCalledTimes(1);
  });

  it("Deprovision/Deleting", async () => {
    const onClickConnectionTabLink = jest.fn();
    const onClickSupportLink = jest.fn();
    const createdAt = new Date();

    const tree = render(
      <KafkaInstanceStatus
        onClickConnectionTabLink={onClickConnectionTabLink}
        onClickSupportLink={onClickSupportLink}
        status={"deprovision"}
        createdAt={createdAt}
      />
    );
    await waitForI18n(tree);
    await tree.findByText("Deleting");

    tree.rerender(
      <KafkaInstanceStatus
        onClickConnectionTabLink={onClickConnectionTabLink}
        onClickSupportLink={onClickSupportLink}
        status={"deleting"}
        createdAt={createdAt}
      />
    );
    await tree.findByText("Deleting");
  });

  it("Deprovision/Deleting", async () => {
    const onClickConnectionTabLink = jest.fn();
    const onClickSupportLink = jest.fn();
    const createdAt = new Date();

    const tree = render(
      <KafkaInstanceStatus
        onClickConnectionTabLink={onClickConnectionTabLink}
        onClickSupportLink={onClickSupportLink}
        status={"ready"}
        createdAt={createdAt}
      />
    );
    await waitForI18n(tree);
    await tree.findByText("Ready");
  });

  it("Degraded", async () => {
    const onClickConnectionTabLink = jest.fn();
    const onClickSupportLink = jest.fn();
    const createdAt = new Date();

    const tree = render(
      <KafkaInstanceStatus
        onClickConnectionTabLink={onClickConnectionTabLink}
        onClickSupportLink={onClickSupportLink}
        status={"degraded"}
        createdAt={createdAt}
      />
    );
    await waitForI18n(tree);
    await tree.findByText("Degraded");
  });
});
