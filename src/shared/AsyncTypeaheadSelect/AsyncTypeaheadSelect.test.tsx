import { act, render, waitForI18n, waitForPopper } from "../../test-utils";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./AsyncTypeaheadSelect.stories";
import { userEvent } from "@storybook/testing-library";

const {
  InitialState,
  ValidInput,
  PlaceHolderVariation,
  LoadingSuggestions,
  CreatableText,
  RequiredField,
} = composeStories(stories);

describe("Async typeahead", () => {
  jest.useFakeTimers();
  it("should render an async typeahead", async () => {
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

    expect(await comp.queryByText("bar")).not.toBeInTheDocument();

    expect(onChangeValue).not.toBeCalled();
    expect(onFetchOptions).not.toBeCalled();
    expect(onValidationCheck).not.toBeCalled();
  });
  it("It should render an async typeahead with a valid value selected", async () => {
    const comp = render(<ValidInput />);
    await waitForI18n(comp);

    expect(comp.getByDisplayValue("foo")).toBeInTheDocument();
  });

  it("should show a custom placeholder", async () => {
    const comp = render(<PlaceHolderVariation />);
    await waitForI18n(comp);

    expect(comp.getByPlaceholderText("Enter prefix")).toBeInTheDocument();
    const select = comp.getByPlaceholderText("Enter prefix");
    userEvent.click(select);
    await waitForPopper();
    const option = await comp.findByText("foo");
    expect(option).toBeInTheDocument();
    userEvent.click(select);
    await waitForPopper();
    expect(option).not.toBeInTheDocument();
  });

  it("should show a loading spinner when typeahead suggestions are loading ", async () => {
    const onFetchOptions = jest.fn(LoadingSuggestions.args!.onFetchOptions);
    const onValidationCheck = jest.fn();

    const comp = render(
      <LoadingSuggestions
        onFetchOptions={onFetchOptions}
        onValidationCheck={onValidationCheck}
      />
    );
    await waitForI18n(comp);
    const select = comp.getByPlaceholderText("Enter name");
    userEvent.click(select);

    await waitForPopper();

    expect(await comp.getByRole("progressbar")).toBeInTheDocument();
    jest.advanceTimersByTime(1000);
    expect(onFetchOptions).toBeCalledTimes(1);
    expect(onValidationCheck).not.toBeCalled();
  });

  it("should show an option to 'Use {{input value}}' if a valid value is typed ", async () => {
    const onChange = jest.fn();
    await act(async () => {
      const comp = render(<CreatableText onChange={onChange} />);
      const select = await focusSelect(comp);

      userEvent.type(select, "test-topic-name");
      const option = await comp.findByText('Use "test-topic-name"');
      expect(option).toBeInTheDocument();

      expect(onChange).not.toBeCalled();

      userEvent.click(option);
      expect(onChange).toBeCalledTimes(1);
    });
  });
});

it("should show a validation error ", async () => {
  await act(async () => {
    const onChange = jest.fn();
    const comp = render(<RequiredField onChange={onChange} />);
    await waitForI18n(comp);
    await waitForPopper();
    const required = await comp.findByText("Required");
    expect(required).toBeInTheDocument();
    const select = await focusSelect(comp);
    userEvent.type(select, "foo");
    await waitForPopper();
    const clearBtn = comp.getAllByRole("button");
    expect(onChange).not.toBeCalled();
    await userEvent.click(clearBtn[0]);
    await waitForPopper();
    expect(onChange).toBeCalledTimes(1);
  });
});

async function focusSelect(comp: ReturnType<typeof render>) {
  await waitForI18n(comp);
  const select = comp.getByPlaceholderText("Enter name");
  userEvent.click(select);
  jest.advanceTimersByTime(1000);
  await waitForPopper();
  return select;
}
