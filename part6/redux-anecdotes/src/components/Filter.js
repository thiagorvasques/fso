import React from "react";
import { connect } from "react-redux";
import { filterWith } from "../reducers/filterReducer";

const Filter = (props) => {
  // const dispatch = useDispatch();
  // const handleChange = (event) => {
  //   console.log(event.target.value);
  //   props.filterWith(event.target.value);
  // };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={(e) => props.filterWith(e.target.value)} />
    </div>
  );
};

export default connect(null, { filterWith })(Filter);
