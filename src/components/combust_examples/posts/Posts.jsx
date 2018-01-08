import postStore from "../../../stores/PostStore";
import usersStore from "../../../stores/UsersStore";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import { observer } from "mobx-react";

import "./styles/Posts.css";

@observer
export default class Posts extends Component {
  render() {
    const userId = this.props.match.params.userId;
    let posts = postStore.getPostsByUserId(userId);

    return (
      <div className="Posts uk-padding">
        {userId === usersStore.userId && (
          <Link to="/createPost">
            <button className="uk-button uk-button-default">
              Create New Post
            </button>
          </Link>
        )}
        <div className="uk-margin-small"> posts belonging to {userId}: </div>
        {posts &&
          Object.keys(posts).map(postId => {
            return (
              <Link key={postId} to={"/post/" + postId}>
                <div>{posts[postId] && <span>{postId}</span>}</div>
              </Link>
            );
          })}
      </div>
    );
  }
}
