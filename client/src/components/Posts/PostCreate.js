import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createPost, uploadImage } from "../../actions";
import BackTo from "../Headers/BackTo";

class PostCreate extends Component {
  state = {
    image: null,
    loader: false,
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
        <label>Image</label>
        <input type="file" required onChange={(e) => this.handleChange(e)} />
      </div>
    );
  }

  handleChange = async (e) => {
    const file = e.target.files[0];
    await this.setState({ image: file });
  };

  onSubmit = async (formValues) => {
    this.setState({ loader: true });
    let formdata = new FormData();
    formdata.append("postImage", this.state.image);

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
            style={{ height: "400px", backgroundColor: "#FFFFFF" }}
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
