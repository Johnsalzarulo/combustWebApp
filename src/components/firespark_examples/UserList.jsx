import React from "react";
import { observer } from "mobx-react";

const UserList = observer(({ users, onUserClicked, title }) => {
  return (
    // <div className="UserList uk-position-right">
    //   <div className="uk-inline">
    //     <h4>
    //       {title}
    //       <a uk-icon="icon: triangle-down" />
    //     </h4>
    //     <div uk-dropdown="pos: bottom-justify">
    //       <ul className="uk-nav uk-dropdown-nav">
    //         <li>
    //           <a href="#">Followers</a>
    //         </li>
    //         <li>
    //           <a href="#">Following</a>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
<div>
      {/* <h4 className="uk-heading-line">
        <span>{title}:</span>
      </h4> */}
      {users &&
        Object.keys(users).map((userId, i) => {
          const user = users[userId];
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
                className={"isOnline " + (user.online ? "online" : "offline")}
              />
            </div>
          );
        })}
    </div>
  );
});

export default UserList;
