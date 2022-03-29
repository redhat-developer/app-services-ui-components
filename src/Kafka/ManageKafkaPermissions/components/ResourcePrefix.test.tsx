import { composeStories } from "@storybook/testing-react";
import * as stories from "./ResourcePrefix.stories";
import { userEvent } from "@storybook/testing-library";
import { render, waitForI18n } from "../../../test-utils";

const { InitialState, InvalidInput, ValidInput, PlaceHolderVariation } =
  composeStories(stories);

describe("Resource prefix", () => {
  it("should render a select typeahead for resource prefix", async () => {
    const onChangeValue = jest.fn();
    const onFetchOptions = jest.fn(InitialState.args!.onFetchOptions);
    const comp = render(
      <InitialState onChange={onChangeValue} onFetchOptions={onFetchOptions} />
    );

    await waitForI18n(comp);
    userEvent.click(await comp.findByPlaceholderText("Enter name"));

    expect(await comp.findByText("topic")).toBeInTheDocument();
    expect(await comp.findByText("my-topic")).toBeInTheDocument();
    expect(await comp.findByText("topic-test")).toBeInTheDocument();
    userEvent.type(comp.getByPlaceholderText("Enter name"), "topic");
    expect(await comp.findByText("topic")).toBeInTheDocument();
    expect(await comp.findByText("topic-test")).toBeInTheDocument();
    expect(await comp.queryByText("my-topic")).not.toBeInTheDocument();
    userEvent.click(await comp.findByText("topic"));
  });
  it("should show a text input with validation error ", async () => {
    const onChangeValue = jest.fn();
    const onFetchOptions = jest.fn(InvalidInput.args!.onFetchOptions);
    const comp = render(
      <InvalidInput onChange={onChangeValue} onFetchOptions={onFetchOptions} />
    );
    await waitForI18n(comp);
    expect(await comp.findByPlaceholderText("Enter name")).toBeInTheDocument();
    expect(await comp.findByText("Required")).toBeInTheDocument();
  });

  it("should show a select component for resource prefix with a valid value selected ", async () => {
    const onChangeValue = jest.fn();
    const onFetchOptions = jest.fn(ValidInput.args!.onFetchOptions);
    const comp = render(
      <ValidInput onChange={onChangeValue} onFetchOptions={onFetchOptions} />
    );
    await waitForI18n(comp);
    expect(await comp.queryByText("Required")).not.toBeInTheDocument();
    expect(await comp.findByDisplayValue("topic")).toBeInTheDocument;
  });

  it("should show a diffetrent typeahead when resouce condition is 'starts with' ", async () => {
    const onChange = jest.fn();
    const onFetchOptions = jest.fn(PlaceHolderVariation.args!.onFetchOptions);
    const comp = render(
      <PlaceHolderVariation
        onChange={onChange}
        onFetchOptions={onFetchOptions}
      />
    );
    await waitForI18n(comp);

    expect(await comp.queryByText("Enter name")).not.toBeInTheDocument();
    expect(
      await comp.findByPlaceholderText("Enter prefix")
    ).toBeInTheDocument();
  });
});
