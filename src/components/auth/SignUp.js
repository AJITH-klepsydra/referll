import React, {useCallback} from "react";
import {withRouter} from "react-router";
import app from "../../firebase/base";
import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/database';
import "./SignUp.css";
import google from "../../assets/google.svg";
import {Link} from "react-router-dom";

const SignUp = ({history}) => {

    const user = firebase.auth().currentUser
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
        auth
            .signInWithPopup(googleProvider)
            .then((res) => {
                console.log(res.user.uid);
                console.log(res.user.displayName);
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
    const handleSignUp = useCallback(
        async (event) => {
            event.preventDefault();
            const {email, password, username} = event.target.elements;
            try {
                await app
                    .auth()
                    .createUserWithEmailAndPassword(email.value, password.value);
                firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                        let verified_name = username.value.replace(".", "");
                        verified_name = verified_name.replace("<", "&lt;");
                        verified_name = verified_name.replace(">", "&gt;");
                        verified_name = verified_name.replace("#", "");
                        verified_name = verified_name.replace("$", "");
                        verified_name = verified_name.replace("|", "");
                        verified_name = verified_name.replace("^", "");

                        console.log(user.uid);
                        console.log(username);
                        const ref = app.database().ref("users/influencers").child(user.uid);
                        ref.child("full_name").set(verified_name);
                        ref.child("is_completed").set(false);
                        history.push("/influencerdetails");
                    } else {
                        // User not logged in or has just logged out.
                    }
                });
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );

    return (
        <React.Fragment>
            <br/>
            <br/>
            <form className="myform_m" onSubmit={handleSignUp}>

                <div className="container_m">
                    <h2 className="form_head">Welcome to Referl!</h2>
                    <p className="form_subhead">Create your account</p>
                    <button className="new loged" onClick={signInWithGoogle}>
                        {" "}
                        <img src={google} width="32px" alt="Google Login"/>{" "}
                        <a>Sign up with google</a>
                    </button>
                    <p className="myform_p">Or sign in with your email</p>
                    <input
                        type="text"
                        placeholder="Username"
                        className="my_input_m"
                        name="username"
                        required
                    />


                    <input type="text" className="my_input_m" placeholder="Email Id" name="email" required/>

                    <input
                        type="password"
                        className="my_input_m"
                        placeholder="Password"
                        name="password"
                        required
                    />

                    <button className="loged log " onSubmit={handleSignUp}>
                        <a>Sign Up</a>
                    </button>

                </div>

                <p className="text_p">Already have an account? <Link className="linked" to="/login">Login</Link></p>

            </form>
            <br/>
        </React.Fragment>
    );
};

export default withRouter(SignUp);
