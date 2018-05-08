import React from "react";
import JarvisWidget from "./widgets/JarvisWidget";
import { Modal, Grid } from "react-bootstrap";
import classNames from "classnames";
import * as notificationsLog from "../services/notifications-log.service";

class AdminNotificationModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.props.showNotificationModal;
    this.state = {
      showNotificationModal: false,
      showNotificationInput: false,
      message: ""
    };
    this.handleOnSave = this.handleOnSave.bind(this);
    this.handleToggleModal = this.handleToggleModal.bind(this);
    this.showNotificationInput = this.showNotificationInput.bind(this);
    this.sendNotification = this.sendNotification.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleOnSave() {
    this.props.onSave();
    this.handleToggleModal();
  }

  handleToggleModal() {
    this.setState({
      showNotificationModal: !this.state.showNotificationModal
    });
  }

  showNotificationInput() {
    this.setState({
      showNotificationInput: !this.state.showNotificationInput
    });
  }

  sendNotification(e) {
    e.preventDefault();
    let message = this.state.message;
    notificationsLog.sendAdminNotification(message);
    this.handleToggleModal();
  }

  onChange(e) {
    this.setState({ message: e.target.value });
  }

  render() {
    return (
      <React.Fragment>
        <button
          type="button"
          onClick={this.handleOnSave}
          className="btn btn-primary"
          disabled={this.props.disabled}
        >
          Save
        </button>
        <Modal
          show={this.state.showNotificationModal}
          aria-labelledby="ModalHeader"
          bsSize="large"
        >
          <Modal.Body>
            <JarvisWidget
              title={
                <span>
                  <i className="fa fa-trophy" /> Notification
                </span>
              }
            >
              {this.state.showNotificationInput === false ? (
                <React.Fragment>
                  <h1>
                    Would you like to send a notification to the Poor Dawg
                    users?
                  </h1>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.showNotificationInput}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={this.handleToggleModal}
                  >
                    No
                  </button>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <form>
                    <div className="form-group">
                      <h1>What would you like to tell them?</h1>
                      <textarea
                        className="form-control"
                        rows="3"
                        name="message"
                        value={this.state.message}
                        onChange={this.onChange}
                      />
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={this.sendNotification}
                      >
                        Send
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={this.handleToggleModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </React.Fragment>
              )}
            </JarvisWidget>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default AdminNotificationModal;
