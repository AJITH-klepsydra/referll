import React, { useState, useEffect } from "react";
import "./banner.css";
import app from "../../firebase/base";
import firebase from "firebase/app";
import "firebase/auth";
import money from "../../assets/money.svg";
import share from "../../assets/share_square.svg";
import user from "../../assets/user.svg";
import magic from "../../assets/magic-wand.svg";
import search from "../../assets/search.svg";

let Arr = [];

function push_status(status_code, message) {   // Snack Bar Javascript.
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
  }, 8000);
}

function shop_selection(e) {
  document.getElementById("card-box").className = "info_del";
  const v = e.target.value.toLowerCase();

  let list = [];
  app
    .database()
    .ref("shops")
    .get()
    .then((result) => {
      for (const [key, value] of Object.entries(result.val())) {
        if (value["shop_name"].toLowerCase().startsWith(v) && v !== "") {
          list.push({
            name: value["shop_name"],
            details: value,
            uid: key,
          });
        }
      }
      visualiser(list);
    });
}

function sentRequest() {                                                              // Is called on form submission (offer request).
  let user = firebase.auth().currentUser;
  let flag = true;
  if (user) {
    const ref = app
      .database()
      .ref("users/influencers")
      .child(user.uid)
      .child("referrals");
    ref
      .get()
      .then((result) => {                                                             // Gets Current User Referal details
        if (result.hasChild(Arr["uid"])) {                                            
          ref
            .child(Arr["uid"])
            .get()
            .then((result) => {
              const data = result.val();
              delete data["shop_name"];
              for (const value of Object.values(data)) {
                if (Date.parse(value["last_date"]) > Date.now()) {                  // Checks whether offer expired or not.
                  flag = false;
                  break;
                }
              }
              if (flag) {
                request_existing_check();                                        // Function (see line 102) Checks whether user request present in shopowner datebase
              } else {
                push_status(0, "You have an active referral for this offer");
              }
            });
        } else {
          request_existing_check();
        }
      })
      .catch((error) => push_status(0, "Select an Offer"));
  }
}

function request_existing_check() {                                               // On submitting request for a particular offer, checks if there is an existing request by the same user for the same offer.
  const user = firebase.auth().currentUser;                                       // Gets current user.
  const ref = app.database().ref("shops").child(Arr["uid"]).child("requests");    // Calls the 'requests' child from shopowner database.
  ref.get().then((result) => {                                                    
    if (!result.hasChild(user.uid)) {                                             // If no result found for current user, calls 'makereuest' function (see line 130)
      make_request();
    } else {
      ref
        .child(user.uid)
        .get()
        .then((res) => {
          if (
            res.val()["description"] ===
              Arr["details"]["current_offer"]["description"] &&
            res.val()["offer"] === Arr["details"]["current_offer"]["offer"] &&
            res.val()["payout"] === Arr["details"]["current_offer"]["payout"] &&
            res.val()["validity"] ===
              Arr["details"]["current_offer"]["validity"]
          ) {
            push_status(0, "You have an active request on same offer");
          } else {
            make_request();
          }
        });
    }
  });
}

function make_request() {
  const user = firebase.auth().currentUser;
  app
    .database()
    .ref("users/influencers")
    .child(user.uid)
    .child("full_name")
    .get()
    .then((result) => {
      const name = result.val();
      const ref = app
        .database()
        .ref("shops")
        .child(Arr["uid"])
        .child("requests")
        .child(user.uid);
      ref.set({
        description: Arr["details"]["current_offer"]["description"],
        inf_name: name,
        offer: Arr["details"]["current_offer"]["offer"],
        payout: Arr["details"]["current_offer"]["payout"],
        validity: Arr["details"]["current_offer"]["validity"],
      });
      ref.on("child_added", (snapshot) => {
        push_status(1, "Request Successful");
      });
    });
}

function visualiser(data) {
  document.getElementById("shop_list").innerHTML = "";
  if (data != null) {
    for (let i = 0; i < data.length; i++) {
      if (data[i]["details"].hasOwnProperty("current_offer")) {
        let a = document.createElement("a");
        a.onclick = function () {
          document.getElementById("pay").innerHTML =
            "Payout: ₹" + data[i]["details"]["current_offer"]["payout"];
          Arr = data[i];

          document.getElementById("nm").innerHTML =
            data[i]["details"]["current_offer"]["offer"];
          document.getElementById("desc").innerHTML =
            data[i]["details"]["current_offer"]["description"];
          document.getElementById("date").innerHTML =
            "valid for " +
            data[i]["details"]["current_offer"]["validity"] +
            " days";
          document.getElementById("shp").innerHTML = data[i]["name"];
          document.getElementById("cat").innerHTML =
            data[i]["details"]["shop_category"];
          document.getElementById("card").style.background = "#043927";
          document.getElementById("card-box").className = "cards-wrapper";
          document
            .getElementById("loginScreen")
            .scrollTo(0, document.body.scrollHeight);
        };
        a.setAttribute("name", data[i]["name"]);
        let card = document.createElement("div");
        card.setAttribute("class", "card2");
        let image = document.createElement("img");
        image.setAttribute(
          "src",
          "https://picsum.photos/200/300?random=" +
            Math.floor(Math.random() * 10 + 1)
        );
        image.setAttribute("class", "card_imag");
        image.setAttribute("style", "width:50px;");
        let h = document.createElement("h4");
        h.innerHTML = data[i]["name"];
        let p = document.createElement("p");
        p.innerHTML =
          data[i]["details"]["shop_category"] +
          "(" +
          data[i]["details"]["shop_location"] +
          ")";
        card.appendChild(image);
        card.appendChild(h);
        card.appendChild(p);
        a.appendChild(card);
        document.getElementById("shop_list").appendChild(a);
      }
    }
  }
}

const Banner = () => {
  let username = "";
  const [name, setName] = useState();
  const [payout, setPayout] = useState();
  const [referrals, setReferrals] = useState();
  useEffect(() => {
    const uid = firebase.auth().currentUser.uid;
    app
      .database()
      .ref("users/influencers")
      .child(uid)
      .child("full_name")
      .get()
      .then((result) => {
        username = result.val();
        setName(username);
      });

    app
      .database()
      .ref("users/influencers")
      .child(uid)
      .child("referrals")
      .get()
      .then((result) => {
        let total_payout = 0;
        let total_referral = 0;
        setPayout(total_payout);
        setReferrals(total_referral);
        result.forEach((snap) => {
          const data = snap.val();
          if (data.hasOwnProperty("total_payout")) {
            total_payout += data["total_payout"];
          }
          if (data.hasOwnProperty("total_referrals")) {
            total_referral += data["total_referrals"];
          }
        });
        setPayout(total_payout);
        setReferrals(total_referral);
      });
  }, []);

  return (
    <div className="main_container">
      <div
        id="log_cover"
        onClick={() => {
          document.getElementById("log_cover").className = "nothing";
          document.getElementById("log_pop").className = "nothing";
        }}
        className="nothing"
      ></div>
      <div id="log_pop" className="nothing logout_popup">
        <p>Oh no! You're leaving.... </p>
        <p>
          <b>Are you sure??</b>{" "}
        </p>
        <button onClick={() => app.auth().signOut()}>Yes, Log me out</button>
      </div>
      <section id="status_msg" className="nothing"></section>
      <div id="loginScreen">
        <a href="#" className="cancel">
          ×
        </a>
        <div className="the_wrapper">
          <h1 style={{ textAlign: "left", marginBottom: "0" }}>
            Find your shop
          </h1>
          <p style={{ textAlign: "left" }}>submit after offer verification</p>
          <div
            style={{
              borderRadius: "5px",
              padding: "10px",
              display: "flex",
              background: "#FF5975",
              maxHeight: "5vh",
            }}
          >
            <img src={search} style={{ width: "20px" }} />
            <input
              style={{
                background: "#FF5975",
                outline: "none",
                border: "0",
                marginLeft: "1vw",
                color: "white",
              }}
              placeholder="search..."
              type="text"
              onInput={(e) => {
                shop_selection(e);
              }}
              id="shop"
              name=""
            />
          </div>
          <div className="shops" id="shop_list"></div>
          <a name="Offer" />
          <section className="info_del" id="card-box" style={{ margin: "0" }}>
            <div className="card-grid-space">
              <div
                className="offer_card"
                id="card"
                href=""
                style={{ color: "white", borderRadius: "5px" }}
              >
                <p className="pay" id="pay">
                  Payout: 750
                </p>
                <h1 id="nm">Mega offer</h1>
                <p id="desc">
                  Lorem ipsum elit exercitation sint adipisicing consectetur
                  velit amet voluptate nulla.
                </p>
                <div
                  className="date"
                  id="date"
                  style={{ fontStyle: "italics", fontSize: "10px" }}
                >
                  6 Oct 2017
                </div>
                <div className="tags" style={{ display: "flex" }}>
                  <div
                    className="tag"
                    id="shp"
                    style={{
                      marginLeft: "10px",
                      padding: "5px",
                      background: "#044",
                      borderRadius: "2px",
                    }}
                  >
                    Krishna
                  </div>
                  <div
                    className="tag"
                    id="cat"
                    style={{
                      marginLeft: "10px",
                      padding: "5px",
                      background: "#045",
                      borderRadius: "2px",
                    }}
                  >
                    restaurant
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div
            className=""
            align="center"
            style={{
              background: "#381942",
              width: "95%",
              marginTop: "10px",
              padding: "2%",
              borderRadius: "5px",
              color: "white",
              marginBottom: "25px",
            }}
          >
            <a onClick={sentRequest} className="" href="#">
              Submit
            </a>
          </div>
        </div>
      </div>
      <div id="cover"></div>

      <section className="banner">
        <div className="top_first">
          <img src={user} />
          <br />
          <p
            onClick={() => {
              document.getElementById("log_cover").className = "logout_pop";
              document.getElementById("log_pop").className = "logout_popup";
            }}
            style={{ paddingLeft: "10px", cursor: "pointer" }}
          >
            {name}
          </p>
        </div>
      </section>
      <section className="toolbar">
        <section className="stats">
          <div className="card_div">
            <div className="first_row">
              <div className="card-text">
                <p>TOTAL REFERAL</p>
                <b>{referrals}</b>
              </div>
              <img src={share} />
            </div>
          </div>
          <div className="card_div">
            <div className="first_row">
              <div className="card-text">
                <p>TOTAL EARNINGS</p>
                <b>₹ {payout}</b>
              </div>
              <img src={money} />
            </div>
          </div>
        </section>
        <section className="generate">
          <a href="#loginScreen">
            <b className="btext">
              <img src={magic} />
            </b>
          </a>
        </section>
      </section>
    </div>
  );
};

export default Banner;
