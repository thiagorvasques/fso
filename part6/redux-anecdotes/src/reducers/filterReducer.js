const filter = "";
const initialState = filter;

export const filterWith = (value) => {
  console.log(value);
  return { type: "GET_FILTER", data: value };
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_FILTER":
      let msg = action.data || null;
      return msg;
    default:
      return state;
  }
};

export default filterReducer;
