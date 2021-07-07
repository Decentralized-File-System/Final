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
import { DataProvider } from "./context/AppDataContext";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <DataProvider>
          <Router>
            <Switch>
              <PrivateRoute exact path="/" component={Main} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
              <Route path="/404" component={NotFound} />
              <Route>
                <Redirect to="/404"></Redirect>
              </Route>
            </Switch>
          </Router>
        </DataProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
