import React from "react";

function Filter(props) {
  return (
    <div>
      filter shown with:
      <input type="text" onChange={(e) => props.searchName(e)}></input>
    </div>
  );
}

export default Filter;
