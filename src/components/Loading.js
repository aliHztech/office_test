import React from "react";
import loading from "../loading.gif";
const Loading = () => {
  return (
    <div>
      <img src={loading} alt="" className="loader"></img>
    </div>
  );
};

export default Loading;
