import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Main } from "./pages/Main";
import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            {/* <Route path="/404" component={NotFound} />
            <Route>
              <Redirect to="/404"></Redirect>
            </Route> */}
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
