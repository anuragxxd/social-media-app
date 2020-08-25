import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { verifyUser } from "../../actions";

class Verify extends Component {
  render() {
    return (
      <div className="ui container" style={{ paddingTop: "30px" }}>
        <div
          class="ui placeholder segment"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <h3 class="ui center aligned header">
            Please press the button below to verify your account.
          </h3>
          <div
            class="fluid ui blue submit button"
            onClick={() => {
              this.props.verifyUser(this.props.match.params.token);
            }}
          >
            <i class="lock icon"></i>
            Verify your account
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { verifyUser })(Verify);
