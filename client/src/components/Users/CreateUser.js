import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { addUser } from "../../actions";
import { Link } from "react-router-dom";

class CreateUser extends Component {
  state = {
    loader: false,
  };
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

  renderTextBox = (formProps) => {
    return (
      <div class="field">
        <label>{formProps.label}</label>
        <textarea
          {...formProps.input}
          placeholder={`${formProps.placeholder}`}
          rows="4"
          style={{ resize: "none" }}
        />
      </div>
    );
  };

  renderError = () => {
    if (
      this.props.user.create_error ==
      "Error: Request failed with status code 400"
    ) {
      return (
        <form className="ui form">
          <div class="field error">
            <input
              className="disabled field"
              value="Email already taken!"
              type="text"
            />
          </div>
        </form>
      );
    } else if (
      this.props.user.create_error ==
      "Error: Request failed with status code 401"
    ) {
      return (
        <form className="ui form">
          <div class="field error">
            <input
              className="disabled field"
              value="Username already in use!"
              type="text"
            />
          </div>
        </form>
      );
    } else if (this.props.user.create_success) {
      return (
        <form className="ui form">
          <div class="field">
            <input
              className="disabled field"
              value="Check mail to verify!"
              type="text"
            />
          </div>
        </form>
      );
    }
  };

  onSubmit = (formValues) => {
    this.setState({ loader: true });
    this.props.addUser(formValues);
    this.setState({ loader: false });
  };

  render() {
    return (
      <div>
        <h1 class="ui center aligned header" style={{ paddingTop: "80px" }}>
          Create New Account
        </h1>
        <div className="ui container" style={{ paddingTop: "20px" }}>
          <div
            class="ui placeholder segment"
            style={{ height: "700px", backgroundColor: "#FFFFFF" }}
          >
            <div class="column">
              <form
                className="ui form"
                onSubmit={this.props.handleSubmit(this.onSubmit)}
              >
                <Field
                  name="name"
                  component={this.renderInput}
                  label="Name"
                  icon="user icon"
                  type="text"
                  placeholder="John Doe"
                ></Field>
                <Field
                  name="age"
                  component={this.renderInput}
                  label="Age"
                  icon="hand point up icon"
                  type="number"
                  placeholder="19"
                ></Field>
                <Field
                  name="email"
                  component={this.renderInput}
                  label="Email"
                  icon="envelope icon"
                  type="text"
                  placeholder="johndoe@gmail.com"
                ></Field>
                <Field
                  name="caption"
                  component={this.renderTextBox}
                  label="Caption"
                  type="text"
                  placeholder="Don't Exceed 50 words"
                ></Field>
                <Field
                  name="userName"
                  component={this.renderInput}
                  label="UserName"
                  icon="user circle icon"
                  type="text"
                  placeholder="JohnDoe"
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
                  Create
                </button>
              </form>
              {this.renderError()}
              <br></br>
              <br></br>
              <Link to="/">
                <div className="ui center aligned tiny header">
                  Already have account?
                </div>
              </Link>
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

CreateUser = connect(mapStateToProps, { addUser })(CreateUser);

export default reduxForm({
  form: "createUser",
})(CreateUser);
