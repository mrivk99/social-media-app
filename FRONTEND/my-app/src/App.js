import React ,{useState,useCallback}from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import "./App.css";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./user/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";

const App = () => {
 const [isLoggedIn, setIsLoggedIn] = useState(false);

 const login = useCallback(()=>{
  setIsLoggedIn(true);
 } , []);

 const logout = useCallback(()=>{
  setIsLoggedIn(false);
 } , []);
  return (
     //**When value of AuthContext.Provider changes 
    //components tapping into it will change */}
    <AuthContext.Provider value={ {isLoggedIn: isLoggedIn, login: login, logout: logout}} 
    >
      <Router>
      {/* Routes are visited in FCFS. Add  the custom routes at the end  */}
      <MainNavigation />
      <main>
        <Switch>
          {/* List of Users */}
          <Route path="/" exact>
            <Users />
          </Route>

          {/* New place form */}{/* Only authenticated*/}
          <Route path="/places/new" exact>
            <NewPlace />
          </Route>

          {/* Update place form */}{/* Only authenticated*/}
          <Route path="/places/:placeId" exact>
            <UpdatePlace />
          </Route>

          {/* List of places for selected user */}
          <Route path="/:userId/places" exact>
            <UserPlaces />
          </Route>

          {/* Authentication */}
          <Route path="/auth" exact>
            <Auth />
          </Route>

          {/* If path is unreachable redirect here */}
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
    </AuthContext.Provider>
    
  );
};
export default App;
