import React, {useCallback} from "react";
import {withRouter} from "react-router";
import app from "./base";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "./Influencerdetails.css";

const InfDetails = ({history}) => {
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
                }
            });
    }
    const handleDetails = useCallback(
        async (event) => {
            if (CheckDetails()) {
                const {
                    instaid,
                    facebook,
                    twitter,
                    youtube,
                    gpay,
                    paytm,
                    phonepay,
                    upi,
                } = event.target.elements;
                try {
                    await app;
                    firebase.auth().onAuthStateChanged((user) => {
                        if (user) {
                            // User logged in already or has just logged in.
                            const ref = app.database().ref("users/influencers").child(user.uid);
                            ref.child("payment").child("gpay").set(gpay.value);
                            ref.child("payment").child("paytm").set(paytm.value);
                            ref.child("payment").child("phonepay").set(phonepay.value);
                            ref.child("payment").child("upi").set(upi.value);
                            ref.child("social").child("insta_id").set(instaid.value);
                            ref.child("social").child("fb_profile").set(facebook.value);
                            ref.child("social").child("twitter_profile").set(twitter.value);
                            ref.child("social").child("youtube_link").set(youtube.value);

                            ref.child("is_completed").set(true);
                            history.push("/influencer");
                        }
                    });
                } catch (error) {
                    alert(error);
                }
            } else {
                event.preventDefault();

            }
        },
        [history]
    );

    return (
        <React.Fragment>
            <section id="status_msg" style={{bottom: "25px"}} className="nothing"></section>
            <form class="myform" id="MyForm" onSubmit={handleDetails}>
                <section class="profile">
                    <p class="prof_title">
                        SOCIAL MEDIA PROFILES
                        <br/>
                        <label style={{padding: "0", margin: "0"}}>*Fill at least two of the below platforms</label>
                    </p>

                    <div class="row">
                        <input type="text" placeholder="Instagram Id" name="instaid" id="instaid"/>
                        <input
                            type="text"
                            placeholder="Facebook Profile Id"
                            name="facebook"
                            id="facebook"
                        />
                    </div>
                    <div class="row">
                        <input
                            type="text"
                            placeholder="Youtube Channel Name"
                            name="youtube"
                            id="youtube"
                        />
                        <input type="text" placeholder="Twitter Username" name="twitter" id="twitter"/>
                    </div>

                    <hr/>
                    <p class="prof_title">
                        PAYMENT HANDLES <br/>
                        <label style={{padding: "0", margin: "0"}}>*Fill at least two of the below platforms </label>
                    </p>

                    <div class="row">
                        <input type="text" placeholder="Google Pay number" name="gpay" id="gpay"/>
                        <input type="text" placeholder="PhonePe number" name="phonepay" id="phonepay"/>
                    </div>
                    <div class="row">
                        <input type="text" placeholder="Pay TM number" name="paytm" id="paytm"/>
                        <input type="text" placeholder="UPI Id" name="upi" id="upi"/>
                    </div>
                    <button class="done" onSubmit={handleDetails}>Done</button>
                </section>
            </form>
        </React.Fragment>
    );
};

function push_status(status_code, message) {
    let root = document.getElementById("status_msg");
    root.className = "snackbar";
    root.innerHTML = "";
    let p = document.createElement("p");
    p.className = "empty";
    p.innerHTML = message;

    if (status_code === 0) {
        let b = document.createElement("b");
        b.innerHTML = "ERROR: ";
        b.style.color = "red";
        root.appendChild(b);
    } else if (status_code === 1) {
        let b = document.createElement("b");
        // let p = document.createElement("p");
        b.innerHTML = "SUCCESS: ";
        b.style.color = "green";
        root.appendChild(b);
    }
    root.appendChild(p);
    setTimeout(function () {
        root.className = "nothing";
    }, 1000);
}


function CheckDetails() {
    var insta_id = document.getElementById("instaid").value;
    var facebook_id = document.getElementById("facebook").value;
    var twitter_id = document.getElementById("twitter").value;
    var youtube_id = document.getElementById("youtube").value;
    var gpay_id = document.getElementById("gpay").value;
    var phonepay_id = document.getElementById("phonepay").value;
    var paytm_id = document.getElementById("paytm").value;
    var upi_id = document.getElementById("upi").value;
    var submitOk1 = 0;
    var submitOk2 = 0;

    var social_handles = [insta_id, facebook_id, twitter_id, youtube_id];
    var payment_handles = [gpay_id, phonepay_id, paytm_id, upi_id];
    var i;
    for (i = 0; i < social_handles.length; i++) {
        if (social_handles[i] === "") {
            submitOk1++;
        }
    }
    for (i = 0; i < payment_handles.length; i++) {
        if (payment_handles[i] === "") {
            submitOk2++;
        }
    }

    if (submitOk1 > 2) {
        push_status(0, "Submit at least 2 socials");
        return false

    } else if (submitOk2 > 2) {
        push_status(0, "Submit at least 2 payment handles");
        return false;
    } else {
        return true;
    }
}


export default withRouter(InfDetails);