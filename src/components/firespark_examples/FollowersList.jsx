import React from "react";
import { observer } from "mobx-react";
import followerStore from "../../stores/FollowerStore";

//FOLLOWERS_DEPENDENCIES
import UserList from "./UserList";

const FollowersList = observer(({ displayFollowers, displayFollowing }) => {
  const users = displayFollowing
    ? followerStore.usersBeingFollowed
    : followerStore.followers;

  return (
    <UserList
      title="Friends"
      users={users}
      onUserClicked={followerStore.onFollowerClicked}
    />
  );
});

export default FollowersList;
