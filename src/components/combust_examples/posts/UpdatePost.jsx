import postStore from "../../../stores/PostStore";

import React, { Component } from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

const fields = {"body":"text"}

@observer
export default class UpdatePost extends Component {
  state = {};

  updatePost = post => {
    let submitObject = {};
    fields &&
      Object.keys(fields).forEach(field => {
        if (this.state[field] || this.state[field] === "") {
          const val = this.state[field] || null;
          submitObject[field] = val;
        }
      });
    submitObject.id = this.props.match.params.postId;
    postStore.updatePost(submitObject);
  };

  handleChange = (e, field) => {
    const t = e.target.value;
    const val = fields[field] !== "number" || t === "" ? t : parseInt(t, 0);

    this.setState({ [field]: val });
  };

  renderInputForField = (field, post) => {
    const type = fields[field];

    return (
      <div className="uk-margin">
        {type === "text" ? (
          <textarea
            className="uk-textarea uk-form-width-large"
            onChange={e => {
              this.handleChange(e, field);
            }}
            value={
              this.state[field] != null
                ? this.state[field]
                : post && post[field]
            }
            placeholder={field}
          />
        ) : (
          <input
            className="uk-input uk-form-width-large"
            type={type === "string" ? "text" : "number"}
            onChange={e => {
              this.handleChange(e, field);
            }}
            value={
              this.state[field] != null
                ? this.state[field]
                : post && post[field]
            }
            placeholder={field}
          />
        )}
      </div>
    );
  };

  render() {
    const postId = this.props.match.params.postId;
    let post = postStore.getPostById(postId);
    return (
      <div className="CreatePost uk-flex uk-flex-center uk-padding">
        <form className="uk-width-large">
          <legend className="uk-legend">Update Post</legend>
          {fields &&
            Object.keys(fields).map(field => {
              return this.renderInputForField(field, post);
            })}
          {/* 
          <div className="uk-margin">
            <input
              className="uk-input uk-form-width-large"
              type="text"
              onChange={e => {
                this.setState({ field1: e.target.value });
              }}
              value={
                this.state.field1 != null
                  ? this.state.field1
                  : post && post.field1
              }
              placeholder="field1"
            />
          </div>
          <div className="uk-margin">
            <textarea
              className="uk-textarea uk-form-width-large"
              onChange={e => {
                this.setState({ field2: e.target.value });
              }}
              placeholder="field2"
              value={
                this.state.field2 != null
                  ? this.state.field2
                  : post && post.field2
              }
              placeholder="field2"
            /> */}
          {/* </div> */}
          <Link to={"/post/" + postId}>
            <button
              className="uk-button uk-button-default"
              onClick={this.updatePost}
            >
              Save Post
            </button>
          </Link>
        </form>
      </div>
    );
  }
}
