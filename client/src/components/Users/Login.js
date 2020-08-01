import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { loginUser } from "../../actions";
import { Link } from "react-router-dom";

class Login extends Component {
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

  onSubmit = (formValues) => {
    this.props.loginUser(formValues);
  };

  render() {
    return (
      <div>
        <h1 class="ui center aligned header" style={{ paddingTop: "200px" }}>
          Social Media
        </h1>
        <div className="ui container" style={{ paddingTop: "20px" }}>
          <div
            class="ui placeholder segment"
            style={{ height: "300px", backgroundColor: "#FFFFFF" }}
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
                  <button class="fluid ui blue submit button" type="submit">
                    Login
                  </button>
                </form>
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

Login = connect(null, { loginUser })(Login);

export default reduxForm({
  form: "login",
})(Login);
