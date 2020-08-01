import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { getUser, editUser } from "../../actions";
import { Link } from "react-router-dom";
import BackTo from "../Headers/BackTo";

class EditProfile extends Component {
  renderInitialInput = (iv) => {
    if (iv) {
      return <input readOnly value={iv} />;
    }
  };

  renderInput = (formProps) => {
    return (
      <div class="field">
        <label>{formProps.label}</label>
        <div class="ui left icon input">
          <input
            {...formProps.input}
            type={`${formProps.type}`}
            placeholder={`${formProps.placeholder}`}
            autoComplete="off"
          />
          <i class={`${formProps.icon}`}></i>
        </div>
        {this.renderInitialInput(formProps.iv)}
      </div>
    );
  };

  renderInitialTextBox = (iv) => {
    if (iv) {
      return (
        <textarea readOnly value={iv} rows="2" style={{ resize: "none" }} />
      );
    }
  };

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
        {this.renderInitialTextBox(formProps.iv)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    this.props.editUser(formValues);
  };

  render() {
    return (
      <div>
        <BackTo to="profile" toRoute="profile"></BackTo>
        <h1 class="ui center aligned header" style={{ paddingTop: "50px" }}>
          Edit Profile Details
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
                autoComplete="off"
              >
                <Field
                  name="name"
                  component={this.renderInput}
                  label="Name"
                  icon="user icon"
                  type="text"
                  placeholder="John Doe"
                  iv={this.props.user.name}
                ></Field>
                <Field
                  name="age"
                  component={this.renderInput}
                  label="Age"
                  icon="hand point up icon"
                  type="number"
                  placeholder="19"
                  iv={this.props.user.age}
                ></Field>
                <Field
                  name="userName"
                  component={this.renderInput}
                  label="UserName"
                  icon="user circle icon"
                  type="text"
                  placeholder="JohnDoe"
                  iv={this.props.user.userName}
                ></Field>
                <Field
                  name="caption"
                  component={this.renderTextBox}
                  label="Caption"
                  icon="user circle icon"
                  type="text"
                  placeholder="Don't exceed 50 words."
                  iv={this.props.user.caption || ""}
                ></Field>
                {/* <Field
                  name="password"
                  component={this.renderInput}
                  label="Password"
                  icon="lock icon"
                  type="password"
                  placeholder="password"
                ></Field> */}
                <button class="fluid ui blue submit button" type="submit">
                  Update
                </button>
              </form>
              <br></br>
              <br></br>
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

EditProfile = connect(mapStateToProps, { getUser, editUser })(EditProfile);

export default reduxForm({
  form: "editProfile",
})(EditProfile);
