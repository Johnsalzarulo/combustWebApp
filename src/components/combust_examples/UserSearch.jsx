import React, { Component } from "react";
import userSearchService from "../../service/UserSearchService";
import { observer } from "mobx-react";

import followersStore from "../../stores/FollowersStore";

// import UIkit from "uikit";
// import Icons from "uikit/dist/js/uikit-icons";

@observer
export default class UserSearch extends Component {
  state = {
    results: [],
    query: ""
  };

  handleSearch = e => {
    let query = e.target.value;
    let results = userSearchService.searchByField(query, "email");
    this.setState({ results, query });
  };

  handleClick = userId => {
    // friendStore.addFriend(userId);
    followersStore.followUser(userId);
    this.setState({ query: "", results: [] });
  };

  openProfile = user => {
    this.setState({ query: "", results: [] });
    this.props.history.push("/profile/" + user.id);
  };

  render() {
    return (
      <div className="UserSearch">
        <form className="uk-search uk-search-default">
          <span uk-search-icon="true" uk-icon="icon: search" />
          <input
            className="uk-search-input"
            type="search"
            value={this.state.query}
            placeholder="Search by email.."
            onChange={this.handleSearch}
            results={5}
          />
        </form>
        {this.state.results.length > 0 && (
          <div className="uk-card uk-card-default uk-card-body searchResults">
            {this.state.results.map((user, i) => {
              return (
                <div key={i}>
                  <div
                    onClick={e => {
                      this.openProfile(user);
                    }}
                    className="userSearch-result uk-flex uk-flex-between uk-flex-middle"
                  >
                    {user.email}{" "}
                    {!followersStore.isFollowing(user.id) ? (
                      <button
                        className="uk-button uk-button-small uk-button-primary"
                        onClick={e => this.handleClick(user.id)}
                      >
                        Follow
                      </button>
                    ) : (
                      <button
                        className="uk-button uk-button-small uk-button-secondary"
                        onClick={e => followersStore.unfollowUser(user.id)}
                      >
                        Unfollow
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
