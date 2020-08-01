import React, { Component } from "react";
import { connect } from "react-redux";
import { querySearch } from "../../actions";
import history from "../../history";

class PeopleNav extends Component {
  state = {
    query: "",
  };
  onSearch = async () => {
    await this.props.querySearch(this.state.query);
    history.push("/search");
  };
  render() {
    return (
      <div
        class="ui secondary tiny menu"
        style={{
          marginTop: "45px",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <div class="active item">Requests</div>
        <div class="right menu">
          <div className="item">
            <div class="field">
              <div class="ui input">
                <input
                  required
                  placeholder="Search Peoples.."
                  value={this.state.query}
                  onChange={(e) => this.setState({ query: e.target.value })}
                  style={{
                    borderTop: "0px",
                    borderLeft: "0px",
                    borderRight: "0px",
                  }}
                />
              </div>
              <i
                class="search icon"
                onClick={() => {
                  this.onSearch();
                }}
              ></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { querySearch })(PeopleNav);
