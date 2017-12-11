import React from "react";
import { observer } from "mobx-react";
import followersStore from "../../stores/FollowersStore";

//FOLLOWERS_DEPENDENCIES
import UserList from "./UserList";

const FollowersList = observer(({ displayFollowers, displayFollowing }) => {
  const users = displayFollowing
    ? followersStore.usersBeingFollowed
    : followersStore.followers;

  return (
    <UserList
      title="Friends"
      users={users}
      onUserClicked={followersStore.handleFollowerClick}
    />
  );
});

export default FollowersList;
