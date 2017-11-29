import React, { Component } from "react";
import userSearchService from "../../service/UserSearchService";
import { observer } from "mobx-react";
import friendStore from "../../stores/FriendStore";

// import UIkit from "uikit";
// import Icons from "uikit/dist/js/uikit-icons";

@observer
export default class UserSearch extends Component {
  state = {
    results: []
  };

  handleSearch = e => {
    let query = e.target.value;
    let results = userSearchService.searchByField(query, "email");
    this.setState({ results });
  };

  render() {
    return (
      <div className="UserSearch">
        <form className="uk-search uk-search-default">
          <span uk-search-icon="true" uk-icon="icon: search" />
          <input
            className="uk-search-input"
            type="search"
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
                  {/* <hr className="uk-divider-small" /> */}
                  <div className="userSearch-result uk-flex uk-flex-between uk-flex-middle">
                    {user.email}{" "}
                    {!friendStore.isFriend(user.id) && (
                      <button class="uk-button uk-button-small uk-button-primary">
                        Add Friend
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
