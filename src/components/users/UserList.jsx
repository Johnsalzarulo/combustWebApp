import React from "react";
import { observer } from "mobx-react";

const UserList = observer(({ users, onUserClicked, title }) => {
  return (
    <div>
      {users &&
        Object.keys(users).map((userId, i) => {
          const user = users[userId];
          if (!user) {
            return <span />;
          }

          return (
            <div
              key={i}
              onClick={e => onUserClicked(user)}
              className="User uk-flex uk-flex-between uk-flex-nowrap uk-flex-middle"
            >
              <span className="avatarAndName">
                <img className="avatar" src={user.iconUrl} alt="" />
                <span className="userName">{user.email}</span>
              </span>
              <span
                className={"isOnline " + (user.isOnline ? "online" : "offline")}
              />
            </div>
          );
        })}
    </div>
  );
});

export default UserList;
