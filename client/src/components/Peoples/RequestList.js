import React, { Component } from "react";
import { connect } from "react-redux";
import { requestList, acceptRequest } from "../../actions";
import { Link } from "react-router-dom";

class RequestList extends Component {
  componentDidMount() {
    this.props.requestList();
  }

  renderRequestList = () => {
    if (!this.props.requests) {
      return <div>Loading...</div>;
    }
    return this.props.requests.map((request) => {
      return (
        <div class="item">
          <div class="content">
            <Link
              to={`/users/${request.requestedBy}`}
              class="middle aligned content"
              style={{ color: "black" }}
            >
              {request.requestedBy}
            </Link>
            <button
              class="ui right floated primary mini button"
              onClick={() => {
                this.props.acceptRequest(request.requestedBy);
              }}
            >
              Accept
            </button>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div
        class="ui divided items"
        style={{
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        {this.renderRequestList()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    requests: state.requestList,
  };
};

export default connect(mapStateToProps, { requestList, acceptRequest })(
  RequestList
);
