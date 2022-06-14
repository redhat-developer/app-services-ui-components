import React, { VoidFunctionComponent } from "react";
import { Modal, ModalVariant, Button } from "@patternfly/react-core";
import { Flex, FlexItem } from "@patternfly/react-core";

export class SmallModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.handleModalToggle = () => {
      this.setState(({ isModalOpen }) => ({
        isModalOpen: !isModalOpen,
      }));
    };
  }

  render() {
    const { isModalOpen } = this.state;

    return (
      <React.Fragment>
        <Button variant="primary" onClick={this.handleModalToggle}>
          Show small modal
        </Button>
        <Modal
          id="modalTerms"
          variant={ModalVariant.small}
          title="Terms and Conditions"
          isOpen={isModalOpen}
          onClose={this.handleModalToggle}
          actions={[
            <Button
              key="confirm"
              variant="primary"
              data-testid="actionViewTerms"
              onClick={this.handleModalToggle}
            >
              View Terms and Conditions
            </Button>,
            <Button
              key="cancel"
              variant="link"
              data-testid="actionCancelViewTerms"
              onClick={this.handleModalToggle}
            >
              Cancel
            </Button>,
          ]}
        >
          <Flex direction={{ default: "column" }}>
            <FlexItem>
              <div>
                Red Hat has Terms and Conditions for its managed services.
              </div>
            </FlexItem>
            <FlexItem>
              <div class="pf-u-font-weight-bold">
                If you do not accept the terms, you will not be able to create
                new Kafka instances.
              </div>
            </FlexItem>
          </Flex>
        </Modal>
      </React.Fragment>
    );
  }
}
