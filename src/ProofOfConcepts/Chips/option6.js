import "@patternfly/react-core/dist/styles/base.css";
import "./fonts.css";
import "./styles.css";
import React from "react";
import ConsumerGroupLabel from "./ConsumerGroupLabel";
import TopicLabel from "./TopicLabel";
import TransactionalIdLabel from "./TrasactionalIdLabel";
import KafkaInstanceLabel from "./KafkaInstanceLabel";
import { Chip, ChipGroup, Text } from "@patternfly/react-core";

class Chips6 extends React.Component {
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

    this.state = {
      chipsSet2: [ReadText, WriteText, CreateText, DeleteText],
      chipsSet3: [KafkaInstanceText],
      chipsSet4: [ReadText, DescribeText],
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
  }

  render() {
    const { chipsSet2, chipsSet3, chipsSet4 } = this.state;
    return (
      <React.Fragment>
        <ChipGroup
          categoryName="Resource type permission"
          isClosable
          onClick={() => {
            this.deleteCategory2();
            this.deleteCategory3();
            this.deleteCategory4();
          }}
        >
          <Chip className="custom-c-chip" isReadOnly>
            <ChipGroup
              // className="lightblue"
              categoryName={<TopicLabel />}
            >
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
            <ChipGroup
              // className="lightgrey"
              categoryName={<KafkaInstanceLabel />}
            >
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
            <ChipGroup
              // className="lightgreen"
              categoryName={<ConsumerGroupLabel />}
            >
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
      </React.Fragment>
    );
  }
}

export default Chips6;
