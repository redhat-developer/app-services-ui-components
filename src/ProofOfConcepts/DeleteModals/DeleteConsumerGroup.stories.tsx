import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { useMachine } from "@xstate/react";
import { createMachine } from "xstate";
import { DeleteModal, DeleteModalConfirmation } from "./DeleteConsumerGroup";
import React from "react";

export default {
  component: DeleteModal,
  subcomponents: { DeleteModalConfirmation },
  args: {
    title: "Delete consumer group?",
    children: (
      <p>
        The <strong>resource name</strong> consumer group will be deleted.
      </p>
    ),
    disableFocusTrap: true,
  },
  argTypes: {
    ouiaId: { table: { category: "Tracking" } },
    appendTo: { table: { category: "Functional" } },
    onDelete: { table: { category: "Events" } },
    onCancel: { table: { category: "Events" } },
    children: { table: { category: "Appearance" } },
    disableFocusTrap: { table: { category: "Development" } },
    isModalOpen: {
      control: {
        type: null,
      },
      table: { category: "States" },
    },
    isDeleting: {
      control: {
        type: null,
      },
      table: { category: "States" },
    },
  },
} as ComponentMeta<typeof DeleteModal>;

const onDelete = [
  {
    cond: (context: { isAsync: boolean }) => context.isAsync,
    target: "deleting",
  },
  {
    cond: (context: { willFail: boolean }) => context.willFail,
    target: "withError",
  },
  { target: "closed" },
];
const makeModalStoryMachine = ({
  id,
  initial = "open",
  isAsync,
  willFail,
}: {
  id: string;
  initial?: string;
  isAsync: boolean;
  willFail: boolean;
}) =>
  createMachine({
    initial,
    id,
    context: {
      isAsync,
      willFail,
    },
    states: {
      closed: {
        on: {
          OPEN: "open",
        },
      },
      open: {
        on: {
          DELETE: onDelete,
        },
      },
      deleting: {
        after: {
          1000: [
            { cond: (context) => context.willFail, target: "withError" },
            { cond: () => initial !== "deleting", target: "closed" },
          ],
        },
        on: {
          CLOSE: "deleting",
        },
      },
      withError: {
        on: {
          DELETE: onDelete,
        },
      },
    },
    on: {
      CLOSE: "closed",
    },
  });

const Template: ComponentStory<typeof DeleteModal> = (
  { onDelete: onDeleteAction, onCancel: onCancelAction, children, ...args },
  { id, parameters }
) => {
  const [state, send] = useMachine(
    () =>
      makeModalStoryMachine({
        id,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        initial: parameters.initialState,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        isAsync: parameters.isDeleteAsync,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        willFail: parameters.willDeleteFail,
      }),
    { devTools: true }
  );

  const onDelete = () => {
    onDeleteAction && onDeleteAction();
    send("DELETE");
  };
  const onCancel = () => {
    onCancelAction && onCancelAction();
    send("CLOSE");
  };

  return (
    <div style={{ minHeight: 500, height: "100%" }}>
      <DeleteModal
        {...args}
        isDeleting={state.value === "deleting"}
        isModalOpen={state.value !== "closed"}
        appendTo={() => {
          return (
            document.getElementById(`story--${id}`) ||
            document.getElementById("root") ||
            document.body
          );
        }}
        onCancel={onCancel}
        onDelete={onDelete}
      >
        {children}
      </DeleteModal>
      <button onClick={() => send("OPEN")}>Open modal</button>
    </div>
  );
};

export const DeleteConsumerGroup = Template.bind({});
DeleteConsumerGroup.args = {};
DeleteConsumerGroup.parameters = {
  docs: {
    description: {
      story: `Shows consumer group to be deleted, action is easily recorable.
      `,
    },
  },
};
