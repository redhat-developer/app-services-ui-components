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

    const AllowText = [
      <div class="row">
        <div class="child">
          <Text>&nbsp;Allow</Text>
        </div>
      </div>,
    ];

    const DenyText = [
      <div class="row">
        <div class="child">
          <Text>&nbsp;Deny</Text>
        </div>
      </div>,
    ];

    this.state = {
      chipsSet2: [ReadText, WriteText, CreateText, DeleteText],
      chipsSet3: [KafkaInstanceText],
      chipsSet4: [ReadText, DescribeText],
      chipsSet5: [AllowText, DenyText],
    };

    this.deleteItem2 = (id) => {
      const copyOfChips = this.state.chipsSet2;
      const index = copyOfChips.indexOf(id);
      if (index !== -1) {
        copyOfChips.splice(index, 1);
        this.setState({ chipsSet2: copyOfChips });
      }
    };

    this.deleteCategory2 = () => {
      this.setState({ chipsSet2: [] });
    };

    this.deleteItem3 = (id) => {
      const copyOfChips = this.state.chipsSet3;
      const index = copyOfChips.indexOf(id);
      if (index !== -1) {
        copyOfChips.splice(index, 1);
        this.setState({ chipsSet3: copyOfChips });
      }
    };

    this.deleteCategory3 = () => {
      this.setState({ chipsSet3: [] });
    };

    this.deleteItem4 = (id) => {
      const copyOfChips = this.state.chipsSet4;
      const index = copyOfChips.indexOf(id);
      if (index !== -1) {
        copyOfChips.splice(index, 1);
        this.setState({ chipsSet4: copyOfChips });
      }
    };

    this.deleteCategory4 = () => {
      this.setState({ chipsSet4: [] });
    };

    this.deleteItem5 = (id) => {
      const copyOfChips = this.state.chipsSet5;
      const index = copyOfChips.indexOf(id);
      if (index !== -1) {
        copyOfChips.splice(index, 1);
        this.setState({ chipsSet4: copyOfChips });
      }
    };

    this.deleteCategory5 = () => {
      this.setState({ chipsSet5: [] });
    };
  }

  render() {
    const { chipsSet2, chipsSet3, chipsSet4, chipsSet5 } = this.state;
    return (
      <React.Fragment>
        <ChipGroup>
          <ChipGroup
            categoryName="Resource type operation"
            isClosable
            onClick={() => {
              this.deleteCategory2();
              this.deleteCategory3();
              this.deleteCategory4();
            }}
          >
            <Chip className="custom-c-chip" isReadOnly>
              <ChipGroup categoryName={<TopicLabel />}>
                {chipsSet2.map((currentChip) => (
                  <Chip
                    key={currentChip}
                    onClick={() => this.deleteItem2(currentChip)}
                  >
                    {currentChip}
                  </Chip>
                ))}
              </ChipGroup>
            </Chip>
            <Chip className="custom-c-chip" isReadOnly>
              <ChipGroup categoryName={<KafkaInstanceLabel />}>
                {chipsSet3.map((currentChip) => (
                  <Chip
                    key={currentChip}
                    onClick={() => this.deleteItem3(currentChip)}
                  >
                    {currentChip}
                  </Chip>
                ))}
              </ChipGroup>
            </Chip>
            <Chip className="custom-c-chip" isReadOnly>
              <ChipGroup categoryName={<ConsumerGroupLabel />}>
                {chipsSet4.map((currentChip) => (
                  <Chip
                    key={currentChip}
                    onClick={() => this.deleteItem4(currentChip)}
                  >
                    {currentChip}
                  </Chip>
                ))}
              </ChipGroup>
            </Chip>
          </ChipGroup>
          <ChipGroup
            className="content"
            categoryName="Permission access types"
            isClosable
            onClick={() => {
              this.deleteCategory5();
            }}
          >
            <ChipGroup className="custom-c-chip" isReadOnly>
              {chipsSet5.map((currentChip) => (
                <Chip
                  key={currentChip}
                  onClick={() => this.deleteItem5(currentChip)}
                >
                  {currentChip}
                </Chip>
              ))}
            </ChipGroup>
          </ChipGroup>
        </ChipGroup>
      </React.Fragment>
    );
  }
}

export default Chips;
