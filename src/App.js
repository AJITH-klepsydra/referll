import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/influencer_dashboard/Home";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import { AuthProvider } from "./firebase/Auth";
import PrivateRoute from "./firebase/PrivateRoute";
import Landing from "./components/home/Landing";
import Owner from "./components/owner_dashboard/Owner";
import Influencer from "./components/influencer_dashboard/Influencer";
import InfDetails from "./components/profile/influencerdetails";
import NotFound from "./components/pagenotfound/NoteFound";
import AOS from "aos";

const App = () => {
  AOS.init({
    duration: 1200,
  });
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          {/* <PrivateRoute exact path="/home" component={Home}/>
                    <PrivateRoute exact path="/owner" component={Owner}/> */}
          <PrivateRoute exact path="/influencer" component={Influencer} />{" "}
          {/*private route allows only authenticated users to the respective pages */}
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
