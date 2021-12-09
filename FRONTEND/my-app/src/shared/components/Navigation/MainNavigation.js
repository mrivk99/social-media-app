import React, { useState } from "react";

import "./MainNavigation.css";
import MainHeader from "./MainHeader";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import SideDrawer from "../Navigation/SideDrawer";
import BackDrop from "../UIElements/Backdrop";

const MainNavigation = (props) => {
  // Toggle the Side drawer by changing it's state
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };
  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };
  return (
    // When a component to return multiple elements.
    // Fragments let you group a list of children without adding extra nodes to the DOM.
    <React.Fragment>
      {/* Side Drawer for smaller devices */}

      {/* When drawer is open a Backdrop element is rendered
      clicking on the Backdrop closes the drawer*/}
      {drawerIsOpen && <BackDrop onClick={closeDrawerHandler} />}

      {/* Rendered by clicking on the Button inside navigation*/}
      {
        <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
          <nav className="main-navigation__drawer-nav">
            <NavLinks />
          </nav>
        </SideDrawer>
      }

      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={openDrawerHandler}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/"> Your places</Link>
        </h1>
        <nav>
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
