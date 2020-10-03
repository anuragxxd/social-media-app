import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { getUser, editUser, editAvatar } from "../../actions";
import { Link } from "react-router-dom";
import BackTo from "../Headers/BackTo";

import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType);

class EditProfile extends Component {
  state = {
    image: null,
    loader: false,
    files: [
      {
        source: "index.html",
        options: {
          type: "local"
        }
      }
    ]
  };

  async componentDidMount() {
    if (!this.props.user || !this.props.user.userName) {
      await this.props.getUser();
    }
  }

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

  renderImage() {
    return (
      <div class="field">
        <label>Avatar</label>
        <FilePond
          ref={ref => (this.pond = ref)}
          allowMultiple={false}
          allowReorder={false}
          name="files"
          allowFileTypeValidation={true}
          acceptedFileTypes= {['image/png','image/jpeg','image/jpg']}
          onupdatefiles={fileItems => {
            // Set currently active file objects to this.state
            this.setState({
              files: fileItems.map(fileItem => fileItem.file)
            });
          }}
        />
      </div>
    );
  }

  renderError = () => {
    if (
      this.props.user.edit_error == "Error: Request failed with status code 400"
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
    } else if (
      this.props.user.edit_error == "Error: Request failed with status code 401"
    ) {
      return (
        <form className="ui form">
          <div class="field error">
            <input
              className="disabled field"
              value="Caption exceeds 50 characters!"
              type="text"
            />
          </div>
        </form>
      );
    }
  };

  onSubmit = (formValues) => {
    this.setState({ loader: true });
    this.props.editUser(formValues);
    if (this.state.files[0]) {
      let formdata = new FormData();
      formdata.append("avatar", this.state.files[0]);
      this.props.editAvatar(formdata);
    }
    this.setState({ loader: false });
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
            style={{ height: "50%", backgroundColor: "#FFFFFF" }}
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
                {this.renderImage()}
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
              {this.renderError()}
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

EditProfile = connect(mapStateToProps, { getUser, editUser, editAvatar })(
  EditProfile
);

export default reduxForm({
  form: "editProfile",
})(EditProfile);
