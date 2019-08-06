import React from "react";
const Like = ({ liked, onClick }) => {
  let classes = "fa fa-heart";
  classes += liked === true ? "" : "-o";
  return (
    <i
      className={classes}
      aria-hidden="true"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    />
  );
};

export default Like;
