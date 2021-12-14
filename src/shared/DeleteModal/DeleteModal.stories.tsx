import { Alert } from "@patternfly/react-core";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useMachine } from "@xstate/react";
import React from "react";
import { createMachine } from "xstate";

import { DeleteModal, DeleteModalConfirmation } from "./DeleteModal";

export default {
  title: "Components/Shared/DeleteModal",
  component: DeleteModal,
  subcomponents: { DeleteModalConfirmation },
  args: {
    title: "Delete something",
    children: "You are deleting something.",
    disableFocusTrap: true,
  },
  argTypes: {
    title: { table: { category: "Appearance" } },
    ouiaId: { table: { category: "Tracking" } },
    appendTo: { table: { category: "Functional" } },
    onDelete: { table: { category: "Events" } },
    onCancel: { table: { category: "Events" } },
    children: { table: { category: "Appearance" } },
    disableFocusTrap: { table: { category: "Development" } },
    confirmationValue: { table: { category: "Appearance" } },
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
  { cond: (context) => context.isAsync, target: "deleting" },
  { cond: (context) => context.willFail, target: "withError" },
  { target: "closed" },
];
const makeModalStoryMachine = ({ id, initial = "open", isAsync, willFail }) =>
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
          CLOSE: null,
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
        initial: parameters.initialState,
        isAsync: parameters.isDeleteAsync,
        willFail: parameters.willDeleteFail,
      }),
    { devTools: true }
  );

  const onDelete = () => {
    onDeleteAction();
    send("DELETE");
  };
  const onCancel = () => {
    onCancelAction();
    send("CLOSE");
  };

  return (
    <div style={{ minHeight: 500, height: "100%" }}>
      <DeleteModal
        isDeleting={state.value === "deleting"}
        isModalOpen={state.value !== "closed"}
        appendTo={() => {
          return (
            document.getElementById(`story--${id}`) ||
            document.getElementById("root")
          );
        }}
        onCancel={onCancel}
        onDelete={onDelete}
        {...args}
      >
        {state.value === "withError" && (
          <Alert variant="danger" title="Danger alert title" isInline>
            <p>This should tell the user more information about the alert.</p>
          </Alert>
        )}
        {children}
      </DeleteModal>
      <button onClick={() => send("OPEN")}>Open modal</button>
    </div>
  );
};

export const SyncronousDelete = Template.bind({});

export const SyncronousDeleteWithError = Template.bind({});
SyncronousDeleteWithError.args = SyncronousDelete.args;
SyncronousDeleteWithError.parameters = {
  willDeleteFail: true,
  initialState: "withError",
  docs: {
    description: {
      story: `If the delete action fails, it's possible to show an inline error.
The user can then try again or cancel the action. In this demo the delete will 
always fail.
      `,
    },
  },
};

export const SyncronousDeleteWithConfirmation = Template.bind({});
SyncronousDeleteWithConfirmation.args = {
  confirmationValue: "digit this",
  ...SyncronousDelete.args,
};
SyncronousDeleteWithConfirmation.parameters = {
  docs: {
    description: {
      story: `It is possible to ask the user to type something to enable the 
disable button. In this demo you should be typing \`digit this\`.
      `,
    },
  },
};

export const SyncronousDeleteWithConfirmationAndError = Template.bind({});
SyncronousDeleteWithConfirmationAndError.args =
  SyncronousDeleteWithConfirmation.args;
SyncronousDeleteWithConfirmationAndError.parameters = {
  willDeleteFail: true,
  initialState: "withError",

  docs: {
    description: {
      story: `It is possible to ask the user to type something to enable the 
disable button. In this demo you should be typing \`digit this\`.

If the delete action fails, it's possible to show an inline error. The user can 
then try again or cancel the action. In this demo the delete will always fail.
      `,
    },
  },
};

export const AsyncronousDelete = Template.bind({});
AsyncronousDelete.args = SyncronousDelete.args;
AsyncronousDelete.parameters = {
  isDeleteAsync: true,
  initialState: "deleting",
  docs: {
    description: {
      story: `For asyncronous deletes, after the user clicks Delete all the 
buttons gets disabled, the X button to close the modal is removed, and the 
Delete button shows a spinner to indicate that the delete process is 
ongoing.`,
    },
  },
};

export const AsyncronousDeleteWithError = Template.bind({});
AsyncronousDeleteWithError.args = SyncronousDeleteWithError.args;
AsyncronousDeleteWithError.parameters = {
  isDeleteAsync: true,
  willDeleteFail: true,
  initialState: "withError",

  docs: {
    description: {
      story: `For asyncronous deletes, after the user clicks Delete all the 
buttons gets disabled, the X button to close the modal is removed, and the 
Delete button shows a spinner to indicate that the delete process is 
ongoing.
      
If the delete action fails, it's possible to show an inline error. The user can 
then try again or cancel the action. In this demo the delete will always fail.
      `,
    },
  },
};

export const AsyncronousDeleteWithConfirmation = Template.bind({});
AsyncronousDeleteWithConfirmation.args = SyncronousDeleteWithConfirmation.args;
AsyncronousDeleteWithConfirmation.parameters = {
  isDeleteAsync: true,
  docs: {
    description: {
      story: `It is possible to ask the user to type something to enable the 
disable button. In this demo you should be typing \`digit this\`.
      `,
    },
  },
};

export const AsyncronousDeleteWithConfirmationAndError = Template.bind({});
AsyncronousDeleteWithConfirmationAndError.args =
  SyncronousDeleteWithConfirmationAndError.args;
AsyncronousDeleteWithConfirmationAndError.parameters = {
  isDeleteAsync: true,
  willDeleteFail: true,
  initialState: "withError",

  docs: {
    description: {
      story: `It is possible to ask the user to type something to enable the 
disable button. In this demo you should be typing \`digit this\`.

If the delete action fails, it's possible to show an inline error.
The user can then try again or cancel the action. In this demo the delete will 
always fail.

In this example a single wrapper will be applied.
      `,
    },
  },
};

export const CustomConfirmationPlacement = Template.bind({});
CustomConfirmationPlacement.args = {
  children: (
    <div>
      <p>You are deleting something.</p>
      <p>⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️</p>
      <DeleteModalConfirmation requiredConfirmationValue="digit this" />
      <p>⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️</p>
      <p>This goes after the confirmation</p>
    </div>
  ),
};
CustomConfirmationPlacement.parameters = {
  docs: {
    description: {
      story: `If needed it's possible to opt-out of the default placement of the
confirmation field using the \`DeleteModalConfirmation\` component
directly.

Each node in the children property gets automatically wrapped in a ModalBoxBody
component to apply proper spacing.
      `,
    },
  },
};

export const CustomConfirmationPlacementWithAutomaticSpacing = Template.bind(
  {}
);
CustomConfirmationPlacementWithAutomaticSpacing.args = {
  children: [
    <p key={0}>You are deleting something.</p>,
    <p key={1}>⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️</p>,
    <DeleteModalConfirmation key={2} requiredConfirmationValue="digit this" />,
    <p key={3}>⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️</p>,
    <p key={4}>This goes after the confirmation</p>,
  ],
};
CustomConfirmationPlacementWithAutomaticSpacing.parameters = {
  docs: {
    description: {
      story: `In this example a wrapper around each node will be applied since
an array of elements is being passed to the \`children\` property.`,
    },
  },
};

export const AsyncronousCustomConfirmationPlacement = Template.bind({});
AsyncronousCustomConfirmationPlacement.args = CustomConfirmationPlacement.args;
AsyncronousCustomConfirmationPlacement.parameters = {
  isDeleteAsync: true,
};

export const AsyncronousCustomConfirmationPlacementAndError = Template.bind({});
AsyncronousCustomConfirmationPlacementAndError.args =
  CustomConfirmationPlacement.args;
AsyncronousCustomConfirmationPlacementAndError.parameters = {
  isDeleteAsync: true,
  willDeleteFail: true,
  initialState: "withError",
};
