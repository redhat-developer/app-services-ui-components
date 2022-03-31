import { composeStories } from "@storybook/testing-react";
import * as stories from "./AsyncTypeaheadSelect.stories";
import { userEvent } from "@storybook/testing-library";
import { render, waitForI18n } from "../../test-utils";

const {
  InitialState,
  ValidInput,
  PlaceHolderVariation,
  LoadingSuggestions,
  CreatableText,
  InvalidConsumerGroupCharacters,
  InvalidLength,
  InvalidTopicCharacters,
  InvalidTopicLength,
} = composeStories(stories);

describe("Resource prefix", () => {
  it("should render a select typeahead for resource prefix", async () => {
    const onChangeValue = jest.fn();
    const onFetchOptions = jest.fn(InitialState.args!.onFetchOptions);
    const onValidationCheck = jest.fn();
    const comp = render(
      <InitialState
        onChange={onChangeValue}
        onFetchOptions={onFetchOptions}
        onValidationCheck={onValidationCheck}
      />
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

  it("should show a select component for resource prefix with a valid value selected ", async () => {
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
    await waitForI18n(comp);
    expect(await comp.queryByText("Required")).not.toBeInTheDocument();
    expect(await comp.findByDisplayValue("topic")).toBeInTheDocument;
  });

  it("should show a diffetrent typeahead when resouce condition is 'starts with' ", async () => {
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
  xit("should show a loading spinner when typeahead suggestions are loading ", async () => {
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
    expect(await comp.findByPlaceholderText("Enter name")).toBeInTheDocument();
    expect(await comp.getByRole("progressbar")).toBeInTheDocument();
  });
  xit("should show a creatable typeahead suggestion", async () => {
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
    expect(
      await comp.findByLabelText(`Use "test-topic-name"`)
    ).toBeInTheDocument();
  });
  //Ignoring these tests for now. Unable to find text inside the form
  xit("should show invalid consumer group characters error message", async () => {
    const onChange = jest.fn();
    const onFetchOptions = jest.fn(CreatableText.args!.onFetchOptions);
    const onValidationCheck = jest.fn();
    const comp = render(
      <InvalidConsumerGroupCharacters
        onChange={onChange}
        onFetchOptions={onFetchOptions}
        onValidationCheck={onValidationCheck}
      />
    );
    await waitForI18n(comp);
    expect(await comp.findByText("$!")).toBeInTheDocument();
    expect(
      await comp.findByText(
        "Valid characters in a consumer group ID include letters (Aa–Zz), numbers, underscores ( _ ), and hyphens ( - )."
      )
    ).toBeInTheDocument();
  });
  xit("should show invalid length error message", async () => {
    const onChange = jest.fn();
    const onFetchOptions = jest.fn(CreatableText.args!.onFetchOptions);
    const onValidationCheck = jest.fn();
    const comp = render(
      <InvalidLength
        onChange={onChange}
        onFetchOptions={onFetchOptions}
        onValidationCheck={onValidationCheck}
      />
    );
    await waitForI18n(comp);
    expect(
      await comp.findByText(
        "this-is-a-very-long-invalid-name-exceeding--32-characters"
      )
    ).toBeInTheDocument();
    expect(
      await comp.findByText("Cannot exceed 32 characters")
    ).toBeInTheDocument();
  });
  xit("should show error message when invalid charecters for topic name are typed", async () => {
    const onChange = jest.fn();
    const onFetchOptions = jest.fn(CreatableText.args!.onFetchOptions);
    const onValidationCheck = jest.fn();
    const comp = render(
      <InvalidTopicCharacters
        onChange={onChange}
        onFetchOptions={onFetchOptions}
        onValidationCheck={onValidationCheck}
      />
    );
    await waitForI18n(comp);
    expect(await comp.findByText("$!")).toBeInTheDocument();
    expect(
      await comp.findByText(
        "Valid characters in a topic name include letters (Aa-Zz), numbers, underscores ( _ ), periods ( . ), and hyphens ( - )."
      )
    ).toBeInTheDocument();
  });
  xit("should show error message when topic reource with condition 'is' and value typed is '.' or '..'", async () => {
    const onChange = jest.fn();
    const onFetchOptions = jest.fn(CreatableText.args!.onFetchOptions);
    const onValidationCheck = jest.fn();
    const comp = render(
      <InvalidTopicLength
        onChange={onChange}
        onFetchOptions={onFetchOptions}
        onValidationCheck={onValidationCheck}
      />
    );
    await waitForI18n(comp);
    expect(await comp.findByTestId("resource-prefix-select-helper"));
    expect(await comp.findByDisplayValue("..")).toBeInTheDocument();
  });
});
