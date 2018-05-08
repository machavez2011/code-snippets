import React from "react";
import * as interactionService from "../services/interaction.service";
import WizardGrid from "./widgets/WidgetGrid";
import JarvisWidget from "./widgets/JarvisWidget";
import PageHeader from "./PageHeader";
import headerObject from "./../constants/page-header.js";

class Leaderboard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      leaderboard: []
    };
  }

  componentWillMount() {
    interactionService.getLeaders().then(leaders => {
      this.setState({ leaderboard: leaders.data.items });
    });
  }

  render() {
    const leaderboard = this.state.leaderboard ? (
      this.state.leaderboard.map(leader => (
        <div className="row">
          <div className="col-md-6">
            Name:{" "}
            {leader.userInformation.length > 0 &&
            leader.userInformation[0].firstName
              ? leader.userInformation[0].firstName +
                " " +
                leader.userInformation[0].lastName
              : "User name DOES NOT exist"}
          </div>
          <div className="col-md-6">Points: {leader.totalPoints}</div>
        </div>
      ))
    ) : (
      <React.Fragment />
    );
    return (
      <React.Fragment>
        <div id="ribbon">
          <span className="ribbon-button-assignment" />
          <ol className="breadcrumb">
            <li>Home</li>
            <li>Leaderboard</li>
          </ol>
        </div>
        <div id="content">
          <PageHeader
            pageHeaderName={headerObject.leaderboardCrud.pageHeader}
            subtitle={headerObject.leaderboardCrud.subTitle}
          />
          <WizardGrid>
            <div className="row">
              <div className="col-md-6">
                <JarvisWidget
                  title={
                    <span>
                      <i className="fa fa-trophy" /> Leaderboard
                    </span>
                  }
                >
                  {leaderboard}
                </JarvisWidget>
              </div>
            </div>
          </WizardGrid>
        </div>
      </React.Fragment>
    );
  }
}

export default Leaderboard;
