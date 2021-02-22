import "./App.css";
import "./component/Navbar";
import Home from "./Views/Home";
import Verification from "./Views/Verification";
import RespoHome from "./Views/Respo/Home";
import Login from "./Views/Login";
import PrivateRoute from "./routes/privateRoute";
import PublicRoute from "./routes/publicRoute";
import Error404 from "./Views/Error404";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <PublicRoute restricted component={Home} path="/" exact />
          <PublicRoute
            restricted
            component={Verification}
            path="/verification"
            exact
          />
          <PublicRoute restricted component={Login} path="/login" exact />
          <PrivateRoute component={RespoHome} path="/home" exact />
          <Route path="/404" component={Error404} />
          <Redirect from="*" to="/404" />
          <Login />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
