const filter = "";
const initialState = filter;

export const filterWith = (value) => {
  console.log(value);
  return { type: "GET_FILTER", data: value };
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_FILTER":
      let value = action.data;
      return value;
    default:
      return state;
  }
};

export default filterReducer;
