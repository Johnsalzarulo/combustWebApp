import React from "react";
import { observer } from "mobx-react";
import friendsStore from "../../stores/FriendsStore";

//FRIENDS_DEPENDENCIES
import UserList from "./UserList";

const FriendsList = observer(() => {
  return (
    <UserList
      title="Friends"
      users={friendsStore.friends}
      onUserClicked={friendsStore.handleFriendClick}
    />
  );
});

export default FriendsList;
