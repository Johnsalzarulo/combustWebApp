import React, { Component } from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import moment from "moment";

import notificationStore from "../../../stores/NotificationStore";

@observer
export default class NotificationNavItem extends Component {
  state = {};

  render() {
    const notifications = notificationStore.notifications;
    const notifKeys = notifications ? Object.keys(notifications) : [];

    return (
      <div className="NotificationNavItem uk-navbar-item">
        <Icon
          className={
            "uk-icon " + (notifKeys.length > 0 ? "uk-text-danger" : "uk-text")
          }
          type="bell"
        />
        <div uk-dropdown="mode: click">
          <ul className="uk-nav uk-dropdown-nav">
            <li className="uk-nav-header uk-margin-small-bottom">
              Notifications
            </li>
            <ul className="uk-list uk-list-divider">
              {notifKeys.reverse().map((notifId, i) => {
                const notif = notifications[notifId];
                if (!notif) return <span />;
                const actions = notif.actions && Object.keys(notif.actions);
                return (
                  <li key={i} className="">
                    {notif.link ? (
                      <a
                        className="uk-link-text"
                        onClick={e =>
                          notificationStore.markNotifAsRead(notifId)
                        }
                      >
                        <Link to={notif.link}>{notif.body}</Link>
                      </a>
                    ) : (
                      <div>{notif.body}</div>
                    )}
                    {actions && (
                      <div className="uk-margin-small-top">
                        {actions.map((action, actionI) => {
                          return (
                            <button
                              key={actionI}
                              className="uk-button uk-button-default uk-button-small"
                              onClick={e => {
                                notificationStore.handleNotificationAction(
                                  notif,
                                  action
                                );
                              }}
                            >
                              {action}
                            </button>
                          );
                        })}
                      </div>
                    )}
                    <div className="uk-text-meta">
                      {moment(notif.createdAt).fromNow()}
                    </div>
                  </li>
                );
              })}
            </ul>

            {notifKeys.length <= 0 && <li>No new notifications</li>}
          </ul>
        </div>
      </div>
    );
  }
}

const Icon = props => {
  //eslint-disable-next-line
  return <a uk-icon={"icon: " + props.type} {...props} />;
};
