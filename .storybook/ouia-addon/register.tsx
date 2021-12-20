import {
  TableComposable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@patternfly/react-table";
import { addons, types } from "@storybook/addons";
import { useChannel, useAddonState } from "@storybook/api";
import "@patternfly/patternfly/patternfly.css";
import "@patternfly/react-core/dist/styles/base.css";
import React, { useState, VoidFunctionComponent } from "react";
import { ADDON_ID, EVENTS, PANEL_ID } from "./constants";
import {
  Alert,
  AlertActionLink,
  ClipboardCopy,
  ClipboardCopyVariant,
  TextContent,
} from "@patternfly/react-core";

export interface PanelProp {
  active: boolean;
}

export interface OUIANode {
  id: string;
  type: string;
  selector: string;
}

// give a unique name for the panel
const OUIAPanel: React.FunctionComponent<PanelProp> = ({
  active,
  ...props
}) => {
  const [nodes, setNodes] = useAddonState<OUIANode[]>(ADDON_ID, []);

  useChannel({
    [EVENTS.RENDERED]: function ({ nodes }) {
      setNodes(nodes);
    },
  });

  if (!active) return null;
  return (
    <TableComposable>
      <Thead>
        <Tr>
          <Th hasRightBorder colSpan={2}>
            OUIA
          </Th>
          <Th>Pendo</Th>
        </Tr>
        <Tr>
          <Th isSubheader>OUIA id</Th>
          <Th isSubheader>OUIA type</Th>

          <Th isSubheader>Selector</Th>
        </Tr>
      </Thead>
      <Tbody>
        {nodes.map((node, rowIndex) => (
          <Tr key={rowIndex}>
            <Td>{node.id}</Td>
            <Td>{node.type}</Td>
            <Td>
              <Selector selector={node.selector} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </TableComposable>
  );
};

const Selector: VoidFunctionComponent<{ selector: string }> = ({
  selector,
}) => {
  const isSelectorSafe = !selector.includes("OUIA-Generated");
  const [showSelector, setShowSelector] = useState(isSelectorSafe);
  return (
    <>
      {!isSelectorSafe && (
        <Alert
          variant="warning"
          isInline
          title="Selector not safe to be used on Pendo!"
          actionLinks={
            <>
              <AlertActionLink onClick={() => setShowSelector(true)}>
                I understand, show anyway
              </AlertActionLink>
            </>
          }
        >
          <TextContent>
            <p>
              This selector contains references to automatically generated OUIA
              ids. These ids are generated when the component is added on the
              page. It is <strong>very likely</strong> these ids will be
              different in the final application.
            </p>
            <p>
              It is advised <strong>not</strong> to use this selector to track
              the feature on Pendo. Open an issue to ask the developers to
              statically define the id.
            </p>
          </TextContent>
        </Alert>
      )}
      {showSelector && (
        <ClipboardCopy
          isReadOnly
          hoverTip="Copy"
          clickTip="Copied"
          variant={ClipboardCopyVariant.expansion}
        >
          {selector}
        </ClipboardCopy>
      )}
    </>
  );
};

addons.register(ADDON_ID, (api) => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: "OUIA",
    render: ({ active, key }) => <OUIAPanel active={active} key={key} />,
  });
});
