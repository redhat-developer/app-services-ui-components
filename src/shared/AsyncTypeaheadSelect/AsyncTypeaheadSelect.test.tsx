import { userEvent } from "@storybook/testing-library";
import { composeStories } from "@storybook/testing-react";
import { act, render, waitForI18n, waitForPopper } from "../../test-utils";
import * as stories from "./AsyncTypeaheadSelect.stories";

const {
  InitialState,
  ValidInput,
  PlaceHolderVariation,
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

    expect(comp.queryByText("bar")).not.toBeInTheDocument();

    expect(onChangeValue).not.toBeCalled();
    expect(onFetchOptions).toBeCalledTimes(1);
    expect(onValidationCheck).not.toBeCalled();
  });
  it("It should render an async typeahead with a valid value selected", async () => {
    const comp = render(<ValidInput />);
    await waitForI18n(comp);

    expect(comp.getByDisplayValue("foo")).toBeInTheDocument();
  });

  it("should show a custom placeholder", async () => {
    const onChange = jest.fn();
    const comp = render(<PlaceHolderVariation onChange={onChange} />);
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

  it("should show an option to 'Use {{input value}}' if a valid value is typed ", async () => {
    const onChange = jest.fn();
    await act(async () => {
      const comp = render(<CreatableText onChange={onChange} />);
      const select = await focusSelect(comp);

      userEvent.type(select, "test-topic-name");
      const option = await comp.findByText('Use "test-topic-name"');
      expect(option).toBeInTheDocument();

      expect(onChange).not.toBeCalledTimes(1);

      userEvent.click(option);
      expect(onChange).toBeCalledTimes(3);
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
    expect(onChange).not.toBeCalledTimes(2);
    userEvent.click(clearBtn[0]);
    await waitForPopper();
    expect(onChange).toBeCalledTimes(2);
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
