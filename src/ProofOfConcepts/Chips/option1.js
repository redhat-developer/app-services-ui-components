import "@patternfly/react-core/dist/styles/base.css";
import "./fonts.css";
import "./styles.css";
import React from "react";
import ConsumerGroupLabel from "./ConsumerGroupLabel";
import TopicLabel from "./TopicLabel";
import TransactionalIdLabel from "./TrasactionalIdLabel";
import KafkaInstanceLabel from "./KafkaInstanceLabel";
import {
    Chip,
    ChipGroup,
    Text
} from "@patternfly/react-core";


class Chips1 extends React.Component {
    constructor(props) {
        super(props);
        const TopicRead = [
            <div class="row">
                <div class="child">
                    <TopicLabel />
                </div>
                <div class="child">
                    <Text>&nbsp;Read</Text>
                </div>
            </div>
        ];
        const TopicWrite = [
            <div class="row">
                <div class="child">
                    <TopicLabel />
                </div>
                <div class="child">
                    <Text>&nbsp;Write</Text>
                </div>
            </div>
        ];
        const TopicCreate = [
            <div class="row">
                <div class="child">
                    <TopicLabel />
                </div>
                <div class="child">
                    <Text>&nbsp;Create</Text>
                </div>
            </div>
        ];
        const TopicDelete = [
            <div class="row">
                <div class="child">
                    <TopicLabel />
                </div>
                <div class="child">
                    <Text>&nbsp;Delete</Text>
                </div>
            </div>
        ];

        const KafkaInstanceAll = [
            <div class="row">
                <div class="child">
                    <KafkaInstanceLabel />
                </div>
                <div class="child">
                    <Text>&nbsp;Kafka instance</Text>
                </div>
            </div>
        ];

        const ConsumerGroupRead = [
            <div class="row">
                <div class="child">
                    <ConsumerGroupLabel />
                </div>
                <div class="child">
                    <Text>&nbsp;Read</Text>
                </div>
            </div>
        ];
        const ConsumerGroupDescribe = [
            <div class="row">
                <div class="child">
                    <ConsumerGroupLabel />
                </div>
                <div class="child">
                    <Text>&nbsp;Describe</Text>
                </div>
            </div>
        ];

        this.state = {
            chipsSet1: [
                TopicRead,
                KafkaInstanceAll,
                TopicWrite,
                ConsumerGroupRead,
                ConsumerGroupDescribe,
                TopicCreate,
                TopicDelete
            ]
        };

        this.deleteItem1 = (id) => {
            const copyOfChips = this.state.chipsSet1;
            const index = copyOfChips.indexOf(id);
            if (index !== -1) {
                copyOfChips.splice(index, 1);
                this.setState({ chipsSet1: copyOfChips });
            }
        };

        this.deleteCategory1 = () => {
            this.setState({ chipsSet1: [] });
        };
    }

    render() {
        const {
            chipsSet1
        } = this.state;
        return (
            <React.Fragment>
                <ChipGroup
                    categoryName="Resource type permission"
                    isClosable
                    onClick={this.deleteCategory1}
                >
                    {chipsSet1.map((currentChip) => (
                        <Chip
                            // class="pf-c-chip custom-c-chip-height"
                            key={currentChip}
                            onClick={() => this.deleteItem1(currentChip)}
                        >
                            {currentChip}
                        </Chip>
                    ))}
                </ChipGroup>
            </React.Fragment >
        );
    }
}

export default Chips1;
