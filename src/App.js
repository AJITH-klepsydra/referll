import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route ,Redirect,Switch } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import Landing from "./Landing";
import Owner from "./Owner";
import Influencer from "./Influencer";
import InfDetails from "./influencerdetails";
import NotFound from "./NoteFound";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <PrivateRoute exact path="/home" component={Home} />
          <PrivateRoute exact path="/owner" component={Owner} />
          <PrivateRoute exact path="/influencer" component={Influencer} />
          <PrivateRoute
            exact
            path="/influencerdetails"
            component={InfDetails}
          />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
