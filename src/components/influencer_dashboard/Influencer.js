import React from "react";
import Banner from "./banner";
import App from "./list";

const Influencer = () => {
  return (
    <div>
       <Banner />  {/* Including banner component, check banner.js in same directory */ }
       <App />     {/* Including App component , check list.js in same directory */ }
    </div>
  ); 
};

export default Influencer;
