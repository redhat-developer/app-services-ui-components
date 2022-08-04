import "./customStyles.css";
import React from "react";
import ConsumerGroupLabel from "./ConsumerGroupLabel";
import TopicLabel from "./TopicLabel";
import TransactionalIdLabel from "./TrasactionalIdLabel";
import KafkaInstanceLabel from "./KafkaInstanceLabel";
import { Chip, ChipGroup, Text } from "@patternfly/react-core";

// TODO
// Clicking on exit 'x' button for entire chip group doesn't remove the chip group as expected.
class Chips extends React.Component {
  constructor(props) {
    super(props);
    const ReadText = [
      <div class="row">
        <div class="child">
          <Text>&nbsp;Read</Text>
        </div>
      </div>,
    ];
    const KafkaInstanceText = [
      <div class="row">
        <div class="child">
          <Text>&nbsp;Kafka instance</Text>
        </div>
      </div>,
    ];
    const WriteText = [
      <div class="row">
        <div class="child">
          <Text>&nbsp;Write</Text>
        </div>
      </div>,
    ];
    const DescribeText = [
      <div class="row">
        <div class="child">
          <Text>&nbsp;Describe</Text>
        </div>
      </div>,
    ];
    const CreateText = [
      <div class="row">
        <div class="child">
          <Text>&nbsp;Create</Text>
        </div>
      </div>,
    ];
    const DeleteText = [
      <div class="row">
        <div class="child">
          <Text>&nbsp;Delete</Text>
        </div>
      </div>,
    ];
    const AllText = [
        <div class="row">
          <div class="child">
            <Text>&nbsp;All</Text>
          </div>
        </div>,
      ];

    this.state = {
      chipsSet: [AllText, DescribeText, WriteText],
    };

    this.deleteItem = (id) => {
      const copyOfChips = this.state.chipsSet;
      const index = copyOfChips.indexOf(id);
      if (index !== -1) {
        copyOfChips.splice(index, 1);
        this.setState({ chipsSet: copyOfChips });
      }
    };

    this.deleteCategory = () => {
      this.setState({ chipsSet: [] });
    };
  }

  render() {
    const { chipsSet } = this.state;
    return (
      <React.Fragment>
        <ChipGroup
          categoryName="Resource type operation"
          isClosable
          onClick={() => {
            this.deleteCategory();
          }}
        >
          
          <Chip className="custom-c-chip" isReadOnly>
            <ChipGroup categoryName={<TransactionalIdLabel />}>
              {chipsSet.map((currentChip) => (
                <Chip
                  key={currentChip}
                  onClick={() => this.deleteItem(currentChip)}
                >
                  {currentChip}
                </Chip>
              ))}
            </ChipGroup>
          </Chip>
        </ChipGroup>
      </React.Fragment>
    );
  }
}

export default Chips;
