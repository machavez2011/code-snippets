import React, { Component } from "react";
import * as challengeService from "../services/challenge.service";
import ChallengeList from "./ChallengeList";
import { Modal } from "react-bootstrap";
import JarvisWidget from "./widgets/JarvisWidget";

class ChallengeListModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      challenges: []
    };

    this.onSelect = this.onSelect.bind(this);
    this.dateDisplay = this.dateDisplay.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    challengeService.getByTiers([2,3]).then(data => {
      this.setState({ challenges: data.items });
    });
  }

  onSelect(item, event) {
    event.preventDefault();
    this.setState({
      formData: item
    });
  }

  dateDisplay(dateValue) {
    let year = dateValue.slice(0, 4);
    let month = dateValue.slice(5, 7);
    let day = dateValue.slice(8, 10);
    return month + "/" + day + "/" + year;
  }

  render() {
    return (
      <React.Fragment>
        <Modal
          show={this.props.showModal}
          onHide={this.props.handleToggleModal}
          aria-labelledby="ModalHeader"
          bsSize="large"
        >
          <Modal.Body>
            <JarvisWidget
              title={
                <span>
                  <i className="fa fa-trophy" /> Challenges
                </span>
              }
            >
              <ChallengeList
                challenges={this.state.challenges}
                onSelect={this.onSelect}
                dateDisplay={this.dateDisplay}
              />
            </JarvisWidget>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ChallengeListModal;
