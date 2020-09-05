import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { loginUser, getUser } from "../../actions";
import { Link } from "react-router-dom";
import history from "../../history";

class Login extends Component {
  state = {
    loader: false,
  };

  async componentDidMount() {
    if (!this.props.user || this.props.user.length == 0) {
      await this.props.getUser();
    }
    if (this.props.user.userName) {
      history.push("/feed");
    }
  }

  renderInput(formProps) {
    return (
      <div class="field">
        <label>{formProps.label}</label>
        <div class="ui left icon input">
          <input
            {...formProps.input}
            type={`${formProps.type}`}
            placeholder={`${formProps.placeholder}`}
            required
          />
          <i class={`${formProps.icon}`}></i>
        </div>
      </div>
    );
  }

  renderError = () => {
    if (
      this.props.user.login_error ==
      "Error: Request failed with status code 400"
    ) {
      return (
        <form className="ui form">
          <div class="field error">
            <input
              className="disabled field"
              value="Wrong Credentials!"
              type="text"
            />
          </div>
        </form>
      );
    } else if (
      this.props.user.login_error ==
      "Error: Request failed with status code 401"
    ) {
      return (
        <form className="ui form">
          <div class="field error">
            <input
              className="disabled field"
              value="Check mail for verification."
              type="text"
            />
          </div>
        </form>
      );
    }
  };

  onSubmit = async (formValues) => {
    this.setState({ loader: true });
    await this.props.loginUser(formValues);
    this.setState({ loader: false });
  };

  render() {
    return (
      <div>
        <h1 class="ui center aligned header" style={{ paddingTop: "200px" }}>
          Social Apes
        </h1>
        <div className="ui container" style={{ paddingTop: "20px" }}>
          <div
            class="ui placeholder segment"
            style={{ height: "350px", backgroundColor: "#FFFFFF" }}
          >
            <div class="ui two column very relaxed stackable grid">
              <div class="column">
                <form
                  className="ui form"
                  onSubmit={this.props.handleSubmit(this.onSubmit)}
                >
                  <Field
                    name="email"
                    component={this.renderInput}
                    label="Email"
                    icon="envelope icon"
                    type="text"
                    placeholder="johndoe@gmail.com"
                  ></Field>
                  <Field
                    name="password"
                    component={this.renderInput}
                    label="Password"
                    icon="lock icon"
                    type="password"
                    placeholder="password"
                  ></Field>
                  <button
                    class={`fluid ui blue ${
                      this.state.loader ? "disabled loading" : ""
                    } submit button`}
                    type="submit"
                  >
                    Login
                  </button>
                </form>
                {this.renderError()}
              </div>
              <div class="small aligned column" style={{ paddingTop: "80px" }}>
                <Link to="/create">
                  <div class="fluid ui blue submit button">
                    <i class="signup icon"></i>
                    Sign Up
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

Login = connect(mapStateToProps, { loginUser, getUser })(Login);

export default reduxForm({
  form: "login",
})(Login);
