import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

// Message Browser:
// Tabs
// Partition Selector, Offset Selector Group, Search, Reload, Offset Range
// Table, Drawer
// Empty State, No Match found State
import { MessageBrowserClass } from "./messageBrowser";
import { TopicTabsClass } from "./tabs";
import { PartitionSelectorClass } from "./partitionSelector";
import { OffsetSelectorGroupClass } from "./offsetSelectorGroup";
import { ToolbarIconsClass } from "./searchAndReload";
import { OffsetRangeClass } from "./offsetRange";
import { TableClass } from "./table";
import { OverlayDrawerClass } from "./overlayDrawer";
import { EmptyStateMessageClass } from "./emptyState";
import { ComposableTableEmptyStateClass } from "./noSearchResults";

export default {
  title: "PoCs/Mesage Browser",
  component: TopicTabsClass,
  args: {},
} as ComponentMeta<typeof TopicTabsClass>;

// Tabs component
const Template1: ComponentStory<typeof TopicTabsClass> = (args) => (
  <TopicTabsClass {...args} />
);

export const Tabs = Template1.bind({});
Tabs.args = {};

// Partition Selector component
const Template2: ComponentStory<typeof PartitionSelectorClass> = (args) => (
  <PartitionSelectorClass {...args} />
);

export const PartitionSelector = Template2.bind({});
PartitionSelector.args = {};

// Offset Selector Group component
const Template3: ComponentStory<typeof OffsetSelectorGroupClass> = (args) => (
  <OffsetSelectorGroupClass {...args} />
);

export const OffsetSelectorGroup = Template3.bind({});
OffsetSelectorGroup.args = {};

// Search and Reload component
const Template4: ComponentStory<typeof ToolbarIconsClass> = (args) => (
  <ToolbarIconsClass {...args} />
);

export const ReloadAndSearch = Template4.bind({});
ReloadAndSearch.args = {};

// Offset Range component
const Template5: ComponentStory<typeof OffsetRangeClass> = (args) => (
  <OffsetRangeClass {...args} />
);

export const OffsetRange = Template5.bind({});
OffsetRange.args = {};

// Messages Table component
const Template6: ComponentStory<typeof TableClass> = (args) => (
  <TableClass {...args} />
);

export const Table = Template6.bind({});
Table.args = {};

// Overlay Drawer component
const Template7: ComponentStory<typeof OverlayDrawerClass> = (args) => (
  <OverlayDrawerClass {...args} />
);

export const OverlayDrawer = Template7.bind({});
OverlayDrawer.args = {};

// Empty State component
const Template8: ComponentStory<typeof EmptyStateMessageClass> = (args) => (
  <EmptyStateMessageClass {...args} />
);

export const EmptyState = Template8.bind({});
EmptyState.args = {};

// No Match Found State component
const Template9: ComponentStory<typeof ComposableTableEmptyStateClass> = (args) => (
  <ComposableTableEmptyStateClass {...args} />
);

export const TableEmptyState = Template9.bind({});
TableEmptyState.args = {};