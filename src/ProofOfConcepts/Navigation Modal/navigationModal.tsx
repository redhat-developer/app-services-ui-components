import React from "react";
import { Modal, ModalVariant, Button } from "@patternfly/react-core";

export class NavigationModal extends React.Component {
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
          variant={ModalVariant.small}
          title="Leave page without saving?"
          isOpen={isModalOpen}
          onClose={this.handleModalToggle}
          actions={[
            <Button
              key="confirm"
              variant="primary"
              onClick={this.handleModalToggle}
            >
              Leave
            </Button>,
            <Button
              key="cancel"
              variant="link"
              onClick={this.handleModalToggle}
            >
              Stay
            </Button>,
          ]}
        >
          Changes you made to the topic properties will be lost.
        </Modal>
      </React.Fragment>
    );
  }
}
