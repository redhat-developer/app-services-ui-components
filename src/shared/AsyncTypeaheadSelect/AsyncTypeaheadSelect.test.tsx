import { composeStories } from "@storybook/testing-react";
import * as stories from "./AsyncTypeaheadSelect.stories";
import { userEvent } from "@storybook/testing-library";
import { act, render, waitForI18n, waitForPopper } from "../../test-utils";

const {
  InitialState,
  ValidInput,
  PlaceHolderVariation,
  LoadingSuggestions,
  CreatableText,
} = composeStories(stories);

describe("Async typeahead", () => {
  jest.useFakeTimers();
  it("should render a select with async typeahead suggestions", async () => {
    const onChangeValue = jest.fn();
    const onFetchOptions = jest.fn(InitialState.args!.onFetchOptions);
    const onValidationCheck = jest.fn();
    await act(async () => {
      const comp = render(
        <InitialState
          onChange={onChangeValue}
          onFetchOptions={onFetchOptions}
          onValidationCheck={onValidationCheck}
        />
      );
      userEvent.click(await comp.findByPlaceholderText("Enter name"));
      jest.advanceTimersByTime(1000);
      expect(await comp.findByText("foo")).toBeInTheDocument();
      expect(await comp.findByText("bar")).toBeInTheDocument();
      userEvent.type(comp.getByPlaceholderText("Enter name"), "foo");
      jest.advanceTimersByTime(2000);
      expect(await comp.findByText("foo")).toBeInTheDocument();
      expect(await comp.queryByText("bar")).not.toBeInTheDocument();
    });
  });
  it("should render a select with a valid value selected", async () => {
    const onChangeValue = jest.fn();
    const onFetchOptions = jest.fn(ValidInput.args!.onFetchOptions);
    const onValidationCheck = jest.fn();
    const comp = render(
      <ValidInput
        onChange={onChangeValue}
        onFetchOptions={onFetchOptions}
        onValidationCheck={onValidationCheck}
      />
    );
    expect(await comp.findByDisplayValue("foo")).toBeInTheDocument();
    expect(await comp.queryByText("bar")).not.toBeInTheDocument();
  });
  it("should show the typeahad passed to the component through props", async () => {
    const onChange = jest.fn();
    const onFetchOptions = jest.fn(PlaceHolderVariation.args!.onFetchOptions);
    const onValidationCheck = jest.fn();
    const comp = render(
      <PlaceHolderVariation
        onChange={onChange}
        onFetchOptions={onFetchOptions}
        onValidationCheck={onValidationCheck}
      />
    );
    await waitForI18n(comp);

    expect(await comp.queryByText("Enter name")).not.toBeInTheDocument();
    expect(
      await comp.findByPlaceholderText("Enter prefix")
    ).toBeInTheDocument();
  });

  it("should show a loading spinner when typeahead suggestions are loading ", async () => {
    const onChange = jest.fn();
    const onFetchOptions = jest.fn(LoadingSuggestions.args!.onFetchOptions);
    const onValidationCheck = jest.fn();
    const comp = render(
      <LoadingSuggestions
        onChange={onChange}
        onFetchOptions={onFetchOptions}
        onValidationCheck={onValidationCheck}
      />
    );
    await waitForI18n(comp);
    const input = comp.getByPlaceholderText("Enter name");
    userEvent.click(input);
    await waitForPopper();
    expect(await comp.getByRole("progressbar")).toBeInTheDocument();
  });

  it("should show a creatable typeahead suggestion", async () => {
    const onChange = jest.fn();
    const onValidationCheck = jest.fn();
    const onFetchOptions = jest.fn(CreatableText.args!.onFetchOptions);
    const comp = render(
      <CreatableText
        onChange={onChange}
        onFetchOptions={onFetchOptions}
        onValidationCheck={onValidationCheck}
      />
    );
    await waitForI18n(comp);
    const input = comp.getByPlaceholderText("Enter name");
    userEvent.click(input);
    await waitForPopper();
    userEvent.type(input, "test-topic-name");
    expect(await comp.findByRole("progressbar")).toBeInTheDocument();
  });
});
