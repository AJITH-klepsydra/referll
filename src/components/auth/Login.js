import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "../../firebase/base.js";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "./Login.css";
import google from "../../assets/google.svg";

const loading_screen = function (arg) {
  if (arg) {
    console.log("Loading Screen Starts");
  } else {
    console.log("Loading Screen Stops");
  }
};

const Login = ({ history }) => {
  const user = firebase.auth().currentUser;
  if (user) {
    app
      .database()
      .ref("users")
      .child("influencers")
      .child(user.uid)
      .child("is_completed")
      .get()
      .then((result) => {
        if (result.val()) {
          history.push("/influencer");
        } else {
          history.push("/influencerdetails");
        }
      });
  }

  const auth = firebase.auth();
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const signInWithGoogle = () => {
    //google auth proceedures
    auth
      .signInWithPopup(googleProvider)
      .then((res) => {
        loading_screen(true);
        app
          .database()
          .ref("users/influencers")
          .once("value")
          .then((result) => {
            if (!result.hasChild(res.user.uid)) {
              let verified_name = res.user.displayName.replace(".", "");
              verified_name = verified_name.replace("<", "&lt;");
              verified_name = verified_name.replace(">", "&gt;");
              verified_name = verified_name.replace("#", "");
              verified_name = verified_name.replace("$", "");
              verified_name = verified_name.replace("|", "");
              verified_name = verified_name.replace("^", "");
              app
                .database()
                .ref("users")
                .child("influencers")
                .child(res.user.uid)
                .set({
                  is_completed: false,
                  full_name: verified_name,
                });
              loading_screen(false);
              history.push("/influencerdetails");
            } else {
              app
                .database()
                .ref("users")
                .child("influencers")
                .child(res.user.uid)
                .child("is_completed")
                .get()
                .then((result) => {
                  loading_screen(false);
                  if (result.val()) {
                    history.push("/influencer");
                  } else {
                    history.push("/influencerdetails");
                  }
                });
            }
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        firebase.auth().onAuthStateChanged((user) => {
          app
            .database()
            .ref("users")
            .child("influencers")
            .child(user.uid)
            .get()
            .then((result) => {
              if (result.val().is_completed) {
                //when login button is clicked ,it checks whether the user has given the influencer detail,if not influencer is redirected to influencer detail page,else to dashboard.
                history.push("/influencer");
              } else {
                // fill the profile
                history.push("/influencerdetails");
              }
            });
        });
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <React.Fragment>
      <form class="myform_m" onSubmit={handleLogin}>
        <div className="container_m">
          <h2 className="form_head">Welcome to Referl!</h2>
          <p className="form_subhead">Login to your account</p>
          <button className="new loged" onClick={signInWithGoogle}>
            <img src={google} width="32px" />
            <a>Sign in with google</a>
          </button>
          <p className="myform_p">Or sign in with your email</p>
          <input
            className="my_input_m"
            type="text"
            name="email"
            placeholder="Email id"
            required
          />

          <input
            className="my_input_m"
            type="password"
            placeholder="Password"
            name="password"
            required
          />
          <br />
          <br />
          <button className="loged log " onSubmit={handleLogin}>
            <a>Login</a>
          </button>
        </div>
        <p className="text_p">
          Don't have an account?{" "}
          <Link className="linked" to="/signup">
            SignUp
          </Link>
          {""}
        </p>
      </form>
    </React.Fragment>
  );
};

export default withRouter(Login);
