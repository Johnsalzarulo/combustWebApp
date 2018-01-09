import React from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import UserSearch from "./combust_examples/users/UserSearch";
import usersStore from "../stores/UsersStore";

const Navbar = observer(({ history }) => (
  <div
    className="Navbar"
    uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky; bottom: #transparent-sticky-navbar"
  >
    <nav className="uk-navbar-container" uk-navbar="true">
      {renderNavLeft()}
      <div className="uk-navbar-right">

        {usersStore.user && (
          <div className="uk-navbar-item">{usersStore.user.email}</div>
        )}
        <div className="uk-navbar-item">
          {usersStore.user ? (
            <Link onClick={e => usersStore.logout()} to="/login">
              Logout
            </Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
        <div className="uk-navbar-item">
          <UserSearch history={history} />
        </div>
      </div>
    </nav>
  </div>
));

const renderNavLeft = () => {
  //This is a combust hook. Do not alter additionalLinks
  const additionalLinks = [];

  return (
    <div className="uk-navbar-left">
      <img
        className="uk-navbar-item uk-logo"
        src="https://www.kpifire.com/wp-content/themes/kpifire/images/logo_footer.png"
        alt=""
      />
      <div className="uk-navbar-item">
        <Link to="/">Home</Link>
      </div>
      <div className="uk-navbar-item">
        {usersStore.userId && (
          <Link to={"/profile/" + usersStore.userId}>My Profile</Link>
        )}
      </div>
      {additionalLinks &&
        additionalLinks.map((linkJsx, i) => {
          return (
            <div key={i} className="uk-navbar-item">
              {linkJsx}
            </div>
          );
        })}
    </div>
  );
};

export default Navbar;
