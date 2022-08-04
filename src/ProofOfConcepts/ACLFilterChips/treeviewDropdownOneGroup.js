import "./customStyles.css";
import React from "react";
import ConsumerGroupLabel from "./ConsumerGroupLabel";
import TopicLabel from "./TopicLabel";
import TransactionalIdLabel from "./TrasactionalIdLabel";
import KafkaInstanceLabel from "./KafkaInstanceLabel";
import { TreeView } from "@patternfly/react-core";

class CheckboxTreeView extends React.Component {
  constructor(props) {
    super(props);
    this.options = [
      {
        name: (
          <React.Fragment>
            <div class="row">
              <div>
                <div class="child">
                  <ConsumerGroupLabel />
                </div>
                <div class="child">&ensp;Consumer group</div>
              </div>
            </div>
          </React.Fragment>
        ),
        id: "g-consumer-group",
        checkProps: { "aria-label": "consumer-group-check", checked: false },
        children: [
          {
            name: "All",
            id: "g-all",
            checkProps: { "aria-label": "g-all-check", checked: false },
          },
          {
            name: "Delete",
            id: "g-delete",
            checkProps: { "aria-label": "g-delete-check", checked: false },
          },
          {
            name: "Describe",
            id: "g-describe",
            checkProps: { "aria-label": "g-describe-check", checked: false },
          },
          {
            name: "Read",
            id: "g-read",
            checkProps: { "aria-label": "g-read-check", checked: false },
          },
        ],
        defaultExpanded: false,
      },
      {
        name: (
          <React.Fragment>
            <div class="row">
              <div>
                <div class="child">
                  <KafkaInstanceLabel />
                </div>
                <div class="child">&ensp;Kafka Instance</div>
              </div>
            </div>
          </React.Fragment>
        ),
        id: "ki-kafka-instance",
        checkProps: { "aria-label": "kafka-instance-check", checked: false },
        children: [
          {
            name: "Alter",
            id: "ki-alter",
            checkProps: { "aria-label": "ki-alter-check", checked: false },
          },
          {
            name: "Describe",
            id: "ki-describe",
            checkProps: { "aria-label": "ki-describe-check", checked: false },
          },
        ],
        defaultExpanded: false,
      },
      {
        name: (
          <React.Fragment>
            <div class="row">
              <div>
                <div class="child">
                  <TopicLabel />
                </div>
                <div class="child">&ensp;Topic</div>
              </div>
            </div>
          </React.Fragment>
        ),
        id: "t-topic",
        checkProps: { "aria-label": "topic-check", checked: false },
        children: [
          {
            name: "All",
            id: "t-all",
            checkProps: { "aria-label": "t-all-check", checked: false },
          },
          {
            name: "Alter",
            id: "t-alter",
            checkProps: { "aria-label": "t-alter-check", checked: false },
          },
          {
            name: "Alter configs",
            id: "t-alter-configs",
            checkProps: {
              "aria-label": "t-alter-configs-check",
              checked: false,
            },
          },
          {
            name: "Create",
            id: "t-create",
            checkProps: { "aria-label": "t-create-check", checked: false },
          },
          {
            name: "Delete",
            id: "t-delete",
            checkProps: { "aria-label": "t-delete-check", checked: false },
          },
          {
            name: "Describe",
            id: "t-describe",
            checkProps: { "aria-label": "t-describe-check", checked: false },
          },
          {
            name: "Describe configs",
            id: "t-describe-configs",
            checkProps: {
              "aria-label": "t-describe-configs-check",
              checked: false,
            },
          },
          {
            name: "Read",
            id: "t-read",
            checkProps: { "aria-label": "t-read-check", checked: false },
          },
          {
            name: "Write",
            id: "t-write",
            checkProps: { "aria-label": "t-write-check", checked: false },
          },
        ],
        defaultExpanded: false,
      },
      {
        name: (
          <React.Fragment>
            <div class="row">
              <div>
                <div class="child">
                  <TransactionalIdLabel />
                </div>
                <div class="child">&ensp;Transactional ID</div>
              </div>
            </div>
          </React.Fragment>
        ),
        id: "ti-transactional-id",
        checkProps: { "aria-label": "transactional-id-check", checked: true },
        children: [
          {
            name: "All",
            id: "ti-all",
            checkProps: { "aria-label": "ti-all-check", checked: true },
          },
          {
            name: "Describe",
            id: "ti-describe",
            checkProps: { "aria-label": "ti-describe-check", checked: true },
          },
          {
            name: "Write",
            id: "ti-write",
            checkProps: { "aria-label": "ti-write-check", checked: true },
          },
        ],
        defaultExpanded: true,
      },
    ];

    this.state = { checkedItems: [] };

    this.onCheck = (evt, treeViewItem) => {
      const checked = evt.target.checked;
      console.log(checked);

      const checkedItemTree = this.options
        .map((opt) => Object.assign({}, opt))
        .filter((item) => this.filterItems(item, treeViewItem));
      const flatCheckedItems = this.flattenTree(checkedItemTree);
      console.log("flat", flatCheckedItems);

      this.setState(
        (prevState) => ({
          checkedItems: checked
            ? prevState.checkedItems.concat(
                flatCheckedItems.filter(
                  (item) =>
                    !prevState.checkedItems.some((i) => i.id === item.id)
                )
              )
            : prevState.checkedItems.filter(
                (item) => !flatCheckedItems.some((i) => i.id === item.id)
              ),
        }),
        () => {
          console.log("Checked items: ", this.state.checkedItems);
        }
      );
    };

    // Helper functions
    const isChecked = (dataItem) =>
      this.state.checkedItems.some((item) => item.id === dataItem.id);
    const areAllDescendantsChecked = (dataItem) =>
      dataItem.children
        ? dataItem.children.every((child) => areAllDescendantsChecked(child))
        : isChecked(dataItem);
    const areSomeDescendantsChecked = (dataItem) =>
      dataItem.children
        ? dataItem.children.some((child) => areSomeDescendantsChecked(child))
        : isChecked(dataItem);

    this.flattenTree = (tree) => {
      var result = [];
      tree.forEach((item) => {
        result.push(item);
        if (item.children) {
          result = result.concat(this.flattenTree(item.children));
        }
      });
      return result;
    };

    this.mapTree = (item) => {
      const hasCheck = areAllDescendantsChecked(item);
      // Reset checked properties to be updated
      // item.checkProps.checked = false;

      if (hasCheck) {
        item.checkProps.checked = true;
      } else {
        const hasPartialCheck = areSomeDescendantsChecked(item);
        if (hasPartialCheck) {
          item.checkProps.checked = null;
        }
      }

      if (item.children) {
        return {
          ...item,
          children: item.children.map((child) => this.mapTree(child)),
        };
      }
      return item;
    };

    this.filterItems = (item, checkedItem) => {
      if (item.id === checkedItem.id) {
        return true;
      }

      if (item.children) {
        return (
          (item.children = item.children
            .map((opt) => Object.assign({}, opt))
            .filter((child) => this.filterItems(child, checkedItem))).length > 0
        );
      }
    };
  }

  render() {
    const mapped = this.options.map((item) => this.mapTree(item));
    return (
      <React.Fragment>
        <TreeView data={mapped} onCheck={this.onCheck} hasChecks />
      </React.Fragment>
    );
  }
}

export default CheckboxTreeView;