import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createPost, uploadImage } from "../../actions";
import BackTo from "../Headers/BackTo";

import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType);

class PostCreate extends Component {
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

  renderInput(formProps) {
    return (
      <div class="field">
        <label>{formProps.label}</label>
        <textarea
          {...formProps.input}
          placeholder={`${formProps.placeholder}`}
          rows="4"
        />
      </div>
    );
  }

  renderImage() {
    return (
      <div class="field">
        <FilePond
          ref={ref => (this.pond = ref)}
          allowMultiple={false}
          allowReorder={false}
          name="files"
          allowFileTypeValidation={true}
          acceptedFileTypes= {['image/png','image/jpeg','image/jpg']}
          required
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

  onSubmit = async (formValues) => {
    this.setState({ loader: true });
    let formdata = new FormData();
    formdata.append("postImage", this.state.files[0]);

    await this.props.createPost(formValues);
    await this.props.uploadImage(this.props.post._id, formdata);
  };

  render() {
    return (
      <div>
        <BackTo to="profile" toRoute="profile"></BackTo>
        <h1 class="ui center aligned header" style={{ paddingTop: "100px" }}>
          Create New Post
        </h1>
        <div className="ui container" style={{ paddingTop: "20px" }}>
          <div
            class="ui placeholder segment"
            style={{ height: "50%", backgroundColor: "#FFFFFF" }}
          >
            <form
              className="ui form"
              onSubmit={this.props.handleSubmit(this.onSubmit)}
            >
              {this.renderImage()}
              <Field
                name="description"
                component={this.renderInput}
                label="Description"
                icon="pen square icon"
                type="text"
                placeholder="Life is what happens when you're busy making other plans."
              ></Field>
              <button
                class={`fluid ui ${
                  this.state.loader ? "disabled loading" : ""
                } blue submit button`}
                type="submit"
              >
                Create
              </button>
            </form>
            <br></br>
            <br></br>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.post,
  };
};

PostCreate = connect(mapStateToProps, { createPost, uploadImage })(PostCreate);

export default reduxForm({
  form: "postCreate",
})(PostCreate);
