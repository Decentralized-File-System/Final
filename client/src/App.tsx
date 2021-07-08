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
import Header from "./components/Header";
import SetUpLogoImg from "./components/SetUpLogoImg";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [setupLogoShown, setSetupLogoShown] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSetupLogoShown(false);
    }, 3000);
  }, []);

  return (
    <div className="App">
      {setupLogoShown ? (
        <SetUpLogoImg setSetupLogoShown={setSetupLogoShown} />
      ) : (
        <AuthProvider>
          <DataProvider>
            <Header />
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
      )}
    </div>
  );
}

export default App;
