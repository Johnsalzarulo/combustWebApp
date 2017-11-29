import React from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import UserSearch from "./firespark_examples/UserSearch";
import userStore from "../stores/UserStore";

const Navbar = observer(({ prop1, prop2 }) => (
  <nav className="Navbar uk-navbar-container uk-margin" uk-navbar="true">
    <div className="uk-navbar-left">
      <a className="uk-navbar-item uk-logo">Logo</a>

      <ul className="uk-navbar-nav">
        <li>
          <a>
            <span
              className="uk-icon uk-margin-small-right"
              uk-icon="icon: star"
            />
            Features
          </a>
        </li>
      </ul>

      <Link to="/">Home</Link>

      <div className="uk-navbar-item">
        <div>
          Some <a>Link</a>
        </div>
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
        <UserSearch />
      </div>
    </div>
  </nav>
));

export default Navbar;
