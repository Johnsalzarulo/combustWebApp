import React from "react";
import { observer } from "mobx-react";
import friendStore from "../../stores/FriendStore";

//FRIENDS_DEPENDENCIES
import UserList from "./UserList";

const FriendsList = observer(() => {
  return (
    <UserList
      title="Friends"
      users={friendStore.friends}
      onUserClicked={friendStore.handleFriendClick}
    />
  );
});

export default FriendsList;
