
import './App.css';
import {BrowserRouter as Router , Route , Redirect,Switch} from 'react-router-dom'
import Users from './users/components/Users';
import Places  from './places/components/Places';
function App() {
  return (
    <Router>
      <Switch>
      /**list of Users */
      <Route path="/" exact>
          <Users />
      </Route>
      </Switch>
        
    </Router>
  );
}

export default App;
