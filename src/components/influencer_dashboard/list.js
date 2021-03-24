import React from "react";
import "./list.css"; 
import app from "../../firebase/base";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

class App extends React.Component {
    state = {
        shops: null,
        expshops: null
    };

    componentDidMount() {
        let user = firebase.auth().currentUser;
        if (user) {
            const ref = app.database().ref("users/influencers").child(user.uid);
            ref
                .child("referrals")
                .get()
                .then((result) => {
                    const final = [];
                    const expfinal = [];
                    result.forEach((snap) => {

                        const data = snap.val();
                        let shop_name = data["shop_name"];
                        try {
                            delete data["shop_name"];
                            delete data["total_payout"]
                            delete data["total_referrals"]
                        } catch (e) {
                            console.log(e);
                        }

                        for (const [key, value] of Object.entries(data)) {
                            if (Date.parse(value.last_date) >= Date.now()) {
                                let item = {};
                                item["shop_name"] = shop_name;
                                item["ref_id"] = key;
                                if (value.hasOwnProperty("payout") && value.hasOwnProperty("num_of_referrals")) {
                                    item["ref_details"] = value;
                                } else {
                                    value["payout"] = 0;
                                    value["num_of_referrals"] = 0;
                                    item["ref_details"] = value;
                                }
                                final.push(item);
                            } else {
                                let exp_item = {};
                                exp_item["shop_name"] = shop_name;
                                exp_item["ref_id"] = key;
                                if (value.hasOwnProperty("payout") && value.hasOwnProperty("num_of_referrals")) {
                                    exp_item["ref_details"] = value;
                                } else {
                                    value["payout"] = 0;
                                    value["num_of_referrals"] = 0;
                                    exp_item["ref_details"] = value;
                                }
                                expfinal.push(exp_item);
                            }

                        }

                    });

                    this.setState({shops: final});
                    this.setState({expshops: expfinal});
                })
                .catch((error) => console.log(error));
        }
    }

    render() {
        return (
            <div className="App">
                <section className="listed">
                    <p className="sub_title">Ongoing Referral</p>
                    <li className="the_list key">
                        <p className="element">Shop Name</p>
                        <p className="element">Referal Code</p>
                        <p className="element">Expiration Date</p>
                        <p className="element">Referrals</p>
                        <p className="element">Payout</p>
                    </li>
                    {
                        this.state.shops &&
                        this.state.shops.map(shop => {
                            return (

                                <div>
                                    <ul>
                                        <li className="the_list">
                                            <p className="element">{shop.shop_name}</p>
                                            <p className="element"><b style={{color:"#FF5975"}}>{shop.ref_id}</b></p>
                                            <p className="element">{(shop.ref_details.last_date).split(" ")[0]}</p>
                                            <p className="element">{shop.ref_details.num_of_referrals}</p>
                                            <p className="element">{shop.ref_details.payout}</p>
                                        </li>
                                    </ul>
                                </div>
                            )
                        })
                    }

                    <p className="sub_title">Expired Referrals</p>
                    <li className="the_list key">
                        <p className="element">Shop Name</p>
                        <p className="element">Referal Code</p>
                        <p className="element">Expiration Date</p>
                        <p className="element">Referrals</p>
                        <p className="element">Payout</p>
                    </li>


                    {
                        this.state.expshops &&
                        this.state.expshops.map(shop => {
                            return (

                                <div>
                                    <ul>
                                        <li className="the_list">
                                            <p className="element">{shop.shop_name}</p>
                                            <p className="element"><b style={{color:"#FF5975"}}>{shop.ref_id}</b></p>
                                            <p className="element">{(shop.ref_details.last_date).split(" ")[0]}</p>
                                            <p className="element">{shop.ref_details.num_of_referrals}</p>
                                            <p className="element">{shop.ref_details.payout}</p>
                                        </li>
                                    </ul>
                                </div>
                            )
                        })
                    }

                </section>
            </div>
        );
    }
}

export default App;