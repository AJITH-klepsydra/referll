import React from "react";  
import {Link} from "react-router-dom";
import "./Landing.css";
import "./Landingresponse.css";
import hero from "./assets/hero-img.png";
import ban from "./assets/ban.png";
import horn from "./assets/horn.png";
import tick from "./assets/tick.png";
import arrow from "./assets/arrow.svg";
import prs from "./assets/prs.png";

import linkedin from "./assets/linkedin.svg";
import insta from "./assets/insta.svg";
import fb from "./assets/facebook.svg";

import check from "./assets/check.svg";
import purse from "./assets/purse.svg";
import shield from "./assets/shield3.png";
import down from "./assets/down.svg";
import kid from "./assets/kid.svg";  
import logoref from "./assets/logoref.png";  
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import app from "./base";

const Landing = ({history}) => {
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

    function myFunction() {
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    }

    return (
        <React.Fragment>
            <div className="main_hero" data-aos="fade-up">
                <div className="topnav" id="myTopnav">
                    <div className="bar_buts">
                        <a href="#home" className="active ">
                           <img style={{width:"50px"}} src={logoref}/>
                        </a>
                        <a href="#news" className="non_active first_bar_but ">
                            <Link className="a_tag" to="#">For Shopowner</Link>{" "}
                        </a>
                        <a href="/login" className="non_active ">
                            <Link className="a_tag" to="/login">For Influencer</Link>{" "}
                        </a>
                        <a className="icon" onClick={myFunction}>
                            &#9776;
                        </a>
                    </div>
                </div>


                <div className="hero">
                    <div className="hero_buts">
                        <div className="hero_cont">
                            <h1>Increase customer acquisition by 5x. Word of mouth</h1>
                            <p>
                                Reward your customers for referring their friends and followers to
                                your shops.
                            </p>
                            <br/>
                            <div className="actions_buts">
                                <button><a><Link to="/login">Start earning</Link>{" "}</a></button>
                                <button style={{color: "black", backgroundColor: "#e7c6c6"}}> Boost your business</button>
                            </div>
                        </div>
                        <div className="hero_image">
                            <img src={hero}/>
                        </div>
                    </div>

                </div>

        </div>
            <section class="how_it_works" data-aos="fade-up">
                <a name="start"/>
                <div class="ticket">
                    <div class="tick_img">
                        <img src={tick}/>
                    </div>
                    <div class="ticket_cont">
                        <h2>
                            Decide a deal that your customers can share with their friends
                        </h2>
                        <p>And the referral reward for a successful referral</p>
                    </div>
                </div>
                <hr style={{marginTop:"10vh",border:"0.5px solid #FF5975",width:"50%",marginLeft:"0"}}/>
                <div class="ticket rev">
                    <div class="tick_img">
                        <img src={ban}/>
                    </div>
                    <div class="ticket_cont">
                        <h2>Customers discover the referral program in your store</h2>
                        <p>
                            Your customers start referring their friends & followers by
                            posting the deal on their social media profiles
                        </p>
                    </div>
                </div>
                <hr style={{marginTop:"10vh",border:"0.5px solid #381942",color:"#777",width:"50%",marginLeft:"50%"}}/>
                <div class="ticket">
                    <div class="tick_img">
                        <img src={horn}/>
                    </div>
                    <div class="ticket_cont">
                        <h2>Friends & followers get influenced</h2>
                        <p>- They see the posts</p>
                        <p>- Get influenced to visit your store</p>
                        <p>- Walk into your store to redeem the deal</p>
                    </div>
                </div>
                <hr style={{marginTop:"10vh",border:"0.5px solid #FF5975",color:"#777",width:"50%",marginLeft:"0",}}/>
                <div class="ticket rev">
                    <div class="tick_img">
                        <img src={prs}/>
                    </div>
                    <div class="ticket_cont">
                        <h2>The friends get a deal, and Kaching rewards the referrer</h2>
                        <p>
                            To redeem
                            <br/>- They show the social media profile of the referrer to the
                            staff.<br/> -The staff scans the profile shown with the Kaching
                            Referral Scanner App.
                        </p>
                    </div>
                </div>
               <hr style={{marginTop:"10vh",marginLeft:"50%",border:"0.5px solid #381942",width:"50%"}}/>
            </section>
            <div style={{}}>
            <h2 style={{fontSize: "40px",fontFamily: "'Bebas Neue', cursive", textAlign: "center", marginTop: "100px",paddingTop:"20px", fontWeight: "500"}}>Start your
                business
                journey with
                Referl</h2>
            <p style={{textAlign: "center", padding: "7px",fontSize:"20px",color: "#222",lineHeight:"30px"}}>Build the simplest and most rewarding referral program in
                15
                minutes.</p>
            <section className="start_buiz">
                <div className="feature" style={{background: "#FF5975",}}>
                    <img src={purse}/>
                    <h2>5X ROI guarantee</h2>
                    <p>Pick a pricing plan, and we guarantee you'll make at least 5x the monthly cost. If you don't,
                        you'll get your money back, no questions asked.</p>
                </div>
                <div className="feature" style={{background: "#FF5975",}}>
                    <img src={shield}/>
                    <h2>Pay only when you earn</h2>
                    <p style={{color: "white"}}>Referral payouts to referrers happen only when they successfully send you
                        customers.</p>
                </div>
                <div className="feature" style={{background: "#FF5975",}}>
                    <img src={kid}/>
                    <h2>Increase repeat & new visits</h2>
                    <p>Stores with a referral program see a 140% increase in social media mentions, and a 33% lift in
                        same-store footfall.</p>
                </div>
            </section>
            </div>
            <section>
                <div class="container" style={{padding:"0",margin:"0"}}>
                    <h2 style={{fontSize: "40px",fontFamily: "'Bebas Neue', cursive", textAlign: "center", marginTop: "100px", fontWeight: "500"}}>Optional: Go Pro!</h2>
                    <div class="package">
                        <div class="price">
                            <div class="card_h temp">
                                <div class="card-body">
                                    <h5 class="card-title">
                                        <b style={{color: "white"}}>FREE</b>
                                    </h5>

                                    <p style={{color: "white"}} class="card-text">
                                        <font>
                                            {" "}
                                            <sup>$</sup><b style={{fontSize: "70px", color: "white"}}>0</b>{" "}
                                        </font>
                                        <sub>Forever</sub>
                                    </p>
                                    <p class="card-text1">
                                        Enjoy essential features without paying anything.
                                    </p>
                                </div>
                            </div>
                            <ul class="feat_set">
                                <li><img style={{width:"20px",padding:"5px"}} src={check}/> Unlimited Referrals</li>
                                <li><img style={{width:"20px",padding:"5px"}} src={check}/> Sleek Dashboard</li>
                                <li><img style={{width:"20px",padding:"5px"}} src={check}/> 2-click in-store app</li>
                            </ul>
                        </div>
                        <div class="price">
                            <div class="card_h" style={{background:"white"}}>
                                <div class="card-body" >
                                    <h5 class="card-title">
                                        <b>PRO</b>
                                    </h5>

                                    <p class="card-text">
                                        <font size="70px">
                                            {" "}
                                            <sup>$</sup><b style={{fontSize: "70px"}}>14</b>{" "}
                                        </font>
                                        <sub>per Month</sub>
                                    </p>
                                    <p class="card-text1">
                                        Upgrade your referal experiance and get exclusive features!
                                    </p>
                                </div>
                            </div>
                            <ul class="feat_set">
                                <li><img style={{width:"20px",padding:"5px"}} src={check}/>Unlimited Referrals</li>
                                <li><img style={{width:"20px",padding:"5px"}} src={check}/> Sleek Dashboard</li>
                                <li><img style={{width:"20px",padding:"5px"}} src={check}/> 2-click in-store app</li>
                                <li><img style={{width:"20px",padding:"5px"}} src={check}/> In-store marketing assets</li>
                                <li><img style={{width:"20px",padding:"5px"}} src={check}/> Data export to CSV</li>
                                <li><img style={{width:"20px",padding:"5px"}} src={check}/> 5x ROI Guarantee</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <section class="footer">
                <div class="res">
                    <h3 style={{fontSize: "40px",fontFamily: "'Bebas Neue', cursive", textAlign: "center", marginTop: "100px", fontWeight: "500"}}>Find and refere your favorite shops 💖</h3>
                    <div class="shop_crd_list">
                        <div class="shop_crd">
                            <img
                                src="https://www.freepnglogos.com/uploads/mcdonalds-png-logo/mcdonalds-circle-logo-png-25.png"/>
                            <h4>McDonald’s</h4>
                            <p>Kakkanad</p>
                            <button class="refere">♡ Refer</button>
                        </div>
                        <div class="shop_crd rose">
                            <img src="https://logodownload.org/wp-content/uploads/2017/10/Starbucks-logo.png"/>
                            <h4>Starbucks</h4>
                            <p>Lulu</p>
                            <button class="refere">♡ Refer</button>
                        </div>
                        <div class="shop_crd rose">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/The-Body-Shop-Logo.svg/300px-The-Body-Shop-Logo.svg.png"/>
                            <h4>body shop</h4>
                            <p>Lulu</p>
                            <button class="refere">♡ Refer</button>
                        </div>
                        <div class="shop_crd">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/sco/thumb/b/bf/KFC_logo.svg/1200px-KFC_logo.svg.png"/>
                            <h4>KFC</h4>
                            <p>calicut</p>
                            <button class="refere">♡ Refer</button>
                        </div>
                    </div>
                </div>
            </section>
            <div className="footer_d">
                <div className="contain">
                <div className="col">
                  <h1>Referl2001</h1>
                  <ul>
                    <li>About</li>
                    <li>MADE IN INDIA 🤍 </li>

                  </ul>
                </div>
                <div className="col">
                  <h1>Resources</h1>
                  <ul>
                    <li>Blogs</li>
                    <li>Community</li>
                    <li>Privacy policy</li>
                    <li>Terms and conditions</li>
                  </ul>
                </div>
                <div className="col">
                  <h1>Links</h1>
                  <ul>
                    <li>Home</li>
                    <li>Signup</li>
                    <li>Services</li>

                  </ul>
                </div>
                <div className="col">
                  <h1>Contact</h1>
                  <ul>
                    <li>Linkedin</li>
                    <li>Instagram</li>
                    <li>Facebook</li>
                    <li>Twitter</li>

                  </ul>
                </div>
                <div className="col">
                  <h1>Support</h1>
                  <ul>
                    <li>Contact us</li>
                    <li>Web chat</li>
                    <li>Open ticket</li>
                  </ul>
                </div>
                <div className="col social">
                  <h1>Social</h1>
                  <ul>
                    <li><img src={linkedin} width="32" style={{width: "32px"}}/> </li>
                    <li><img src={insta} width="32" style={{width: "32px"}}/></li>
                    <li><img src={fb} width="32" style={{width: "32px"}}/></li>
                  </ul>
                </div>
              <div className="clearfix"></div>
              </div>
              </div>
 
        </React.Fragment>
    );
};

export default Landing;
