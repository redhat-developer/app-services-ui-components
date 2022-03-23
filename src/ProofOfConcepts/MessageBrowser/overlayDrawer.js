import ReactDOM from "react-dom";
import "@patternfly/react-core/dist/styles/base.css";
import "./fonts.css";

// TODO
// Add hover and clicked popover to copy button. And copy the text to clipboard when clicked.
import React from "react";
import {
  Drawer,
  DrawerPanelContent,
  DrawerContent,
  DrawerContentBody,
  DrawerHead,
  DrawerActions,
  DrawerCloseButton,
  Button,
  DescriptionList,
  DescriptionListTerm,
  DescriptionListText,
  DescriptionListGroup,
  DescriptionListDescription,
  TextContent,
  Text,
  TextVariants,
  TextList,
  TextListVariants,
  TextListItem,
  TextListItemVariants,
  Tabs,
  Tab,
  TabTitleText,
  ClipboardCopy,
  ClipboardCopyVariant,
  Flex,
  FlexItem,
  Grid,
  GridItem,
} from "@patternfly/react-core";
import CopyIcon from "@patternfly/react-icons/dist/esm/icons/copy-icon";

export class OverlayDrawerClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    };
    this.drawerRef = React.createRef();

    this.onExpand = () => {
      this.drawerRef.current && this.drawerRef.current.focus();
    };

    this.onClick = () => {
      const isExpanded = !this.state.isExpanded;
      this.setState({
        isExpanded,
      });
    };

    this.onCloseClick = () => {
      this.setState({
        isExpanded: false,
      });
    };
  }

  render() {
    const { isExpanded } = this.state;
    const panelContent = (
      <DrawerPanelContent>
        <DrawerHead>
          <span tabIndex={isExpanded ? 0 : -1} ref={this.drawerRef}>
            <TextContent>
              <Text component={TextVariants.h2}>Message</Text>
            </TextContent>
            <br></br>
            <DescriptionList isHorizontal>
              <DescriptionListGroup>
                <DescriptionListTerm>Partition</DescriptionListTerm>
                <DescriptionListDescription>
                  <React.Fragment>0</React.Fragment>
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Offset</DescriptionListTerm>
                <DescriptionListDescription>9</DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Timestamp</DescriptionListTerm>
                <DescriptionListDescription>
                  Feb 6, 2022, 11:26:00:456 AM
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Epoch timestamp</DescriptionListTerm>
                <DescriptionListDescription>
                  1644146760456
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Timestamp type</DescriptionListTerm>
                <DescriptionListDescription>
                  Create time
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Key</DescriptionListTerm>
                <DescriptionListDescription>
                  this-is-a-sample-key
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Size</DescriptionListTerm>
                <DescriptionListDescription>20 KiB</DescriptionListDescription>
              </DescriptionListGroup>
            </DescriptionList>
            <br></br>
            <Tabs defaultActiveKey={0}>
              <Tab eventKey={0} title={<TabTitleText>Value</TabTitleText>}>
                <br></br>
                <Grid>
                  <GridItem span={11}>
                    <Text>{`{ "menu": {`}</Text>
                    <Text> {` "id": "file",`}</Text>
                    <Text>{`"value": "File",`}</Text>
                    <Text> {`"popup": {`}</Text>
                    <Text> {`  "menuitem": [`}</Text>
                    <Text>{`   {"value": "New", "onclick": "CreateNewDoc()"},`}</Text>
                    <Text>{`  {"value": "Open", "onclick": "OpenDoc()"},`}</Text>
                    <Text>{`  {"value": "Close", "onclick": "CloseDoc()"}`}</Text>
                    <Text>{` ]`}</Text>
                    <Text>{`}`}</Text>
                    <Text>{` }} `}</Text>
                  </GridItem>
                  <GridItem span={1}>
                    <CopyIcon />
                  </GridItem>
                </Grid>
              </Tab>
              <Tab eventKey={1} title={<TabTitleText>Headers</TabTitleText>}>
                <br></br>
                <Grid>
                  <GridItem span={11}>
                    <Text>{` {`}</Text>
                    <Text>{` "key": "Struct{order_id=3}",`}</Text>
                    <Text>{`"payload": {`}</Text>
                    <Text>{`  "order_id": {`}</Text>
                    <Text>{`    "string": "3"`}</Text>
                    <Text>{`  },`}</Text>
                    <Text>{`  "customer_id": {`}</Text>
                    <Text>{`   "string": "695"`}</Text>
                    <Text>{` },`}</Text>
                    <Text>{` "order_total_energy_credits": {`}</Text>
                    <Text>{`  "string": "155000"`}</Text>
                    <Text>{` },`}</Text>
                    <Text>{` "make": {`}</Text>
                    <Text>{`   "string": "Enterprise"`}</Text>
                    <Text>{` },`}</Text>
                    <Text>{` "model": {`}</Text>
                    <Text>{`  "string": "NCC-1701"`}</Text>
                    <Text>{` },`}</Text>
                    <Text>{` "delivery_city": {`}</Text>
                    <Text>{`   "string": "Vulcan"`}</Text>
                    <Text>{`},`}</Text>
                    <Text>{`"delivery_company": {`}</Text>
                    <Text>{`  "string": "James, Spock, and Scotty"`}</Text>
                    <Text>{` },`}</Text>
                    <Text>{` "delivery_address": {`}</Text>
                    <Text>{`  "string": "Mount Seleya"`}</Text>
                    <Text>{` }`}</Text>
                    <Text>{`}`}</Text>
                    <Text>{`} `}</Text>
                  </GridItem>
                  <GridItem span={1}>
                    <CopyIcon />
                  </GridItem>
                </Grid>
              </Tab>
            </Tabs>
          </span>
          <DrawerActions>
            <DrawerCloseButton onClick={this.onCloseClick} />
          </DrawerActions>
        </DrawerHead>
      </DrawerPanelContent>
    );

    const drawerContent = "This is where table will be.";

    return (
      <React.Fragment>
        <Button aria-expanded={isExpanded} onClick={this.onClick}>
          Toggle drawer
        </Button>
        <Drawer isExpanded={isExpanded} onExpand={this.onExpand}>
          <DrawerContent panelContent={panelContent}>
            <DrawerContentBody>{drawerContent}</DrawerContentBody>
          </DrawerContent>
        </Drawer>
      </React.Fragment>
    );
  }
}
