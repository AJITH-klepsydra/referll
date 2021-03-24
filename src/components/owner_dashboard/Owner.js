import React from "react";
import app from "../../firebase/base";

const Owner = () => {
  return (
    <>
      <h1>Owner's page</h1>
      <button onClick={() => app.auth().signOut()}>Sign out</button>
    </>
  );
};

export default Owner;
