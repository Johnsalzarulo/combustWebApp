import React from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import UserSearch from "./firespark_examples/UserSearch";
import userStore from "../stores/UserStore";

const Navbar = observer(({ history }) => (
  <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky; bottom: #transparent-sticky-navbar">
    <nav className="Navbar uk-navbar-container" uk-navbar="true">
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
          {userStore.userId && (
            <Link to={"/profile/" + userStore.userId}>My Profile</Link>
          )}
        </div>
      </div>
      <div className="uk-navbar-right">
        {userStore.user && (
          <div className="uk-navbar-item">{userStore.user.email}</div>
        )}
        <div className="uk-navbar-item">
          {userStore.user ? (
            <Link onClick={e => userStore.logout()} to="/login">
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

export default Navbar;
