import React, { Component } from "react";
import { Link } from "react-router-dom";

class BackTo extends Component {
  render() {
    return (
      <div class="ui top fixed menu">
        <Link to={`/${this.props.toRoute}`} class="item">
          <i class="angle left icon"></i>
          Back to {this.props.to}
        </Link>
      </div>
    );
  }
}

export default BackTo;
