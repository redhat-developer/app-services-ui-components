import React from 'react';
import { Tabs, Tab, TabTitleText, Title, Breadcrumb, BreadcrumbItem } from '@patternfly/react-core';

export class TopicTabsClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTabKey: 0,
        };
        // Toggle currently active tab
        this.handleTabClick = (event, tabIndex) => {
            this.setState({
                activeTabKey: tabIndex
            });
        };
    }

    render() {
        const { activeTabKey, isBox } = this.state;

        return (
            <div>
                <Breadcrumb>
                    <BreadcrumbItem to="#">Kafka instances</BreadcrumbItem>
                    <BreadcrumbItem to="#">test-kafka-instance</BreadcrumbItem>
                    <BreadcrumbItem to="#" isActive>
                        test-topic-2
                    </BreadcrumbItem>
                </Breadcrumb>
                <Title headingLevel="h4" size="xl">
                    test-topic-2
                </Title>
                <Tabs activeKey={activeTabKey} onSelect={this.handleTabClick} isBox={isBox}>
                    <Tab eventKey={0} title={<TabTitleText>Consumer groups</TabTitleText>}>
                    </Tab>
                    <Tab eventKey={1} title={<TabTitleText>Messages</TabTitleText>}>
                        Messages
                    </Tab>
                    <Tab eventKey={2} title={<TabTitleText>Schemas</TabTitleText>}>
                        Schemas
                    </Tab>
                    <Tab eventKey={3} title={<TabTitleText>Properties</TabTitleText>}>
                        Properties
                    </Tab>
                </Tabs>
            </div>
        );
    }
}
