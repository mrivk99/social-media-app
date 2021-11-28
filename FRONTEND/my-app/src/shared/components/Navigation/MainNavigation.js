import React, { useState } from "react";

import "./MainNavigation.css";
import MainHeader from "./MainHeader";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import SideDrawer from "../Navigation/SideDrawer";
import BackDrop from "../UIElements/Backdrop"


const MainNavigation = (props) => {
  const [drawerIsOpen , setDrawerIsOpen] = useState(false);

  const openDrawer = ()=>{
    setDrawerIsOpen(true);
  }
  const closeDrawer = ()=>{
    setDrawerIsOpen(false);
  }
  return (
    <React.Fragment>
      {drawerIsOpen ? <BackDrop onClick={closeDrawer}/> : null}
      {drawerIsOpen ? (<SideDrawer >
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>) : null}
      
      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={openDrawer}>
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
