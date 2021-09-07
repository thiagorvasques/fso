const initialState = {
  good: 0,
  neutral: 0,
  bad: 0,
};

const counterReducer = (state = initialState, action) => {
  console.log(action, state.good);
  switch (action.type) {
    case "GOOD":
      const good = { ...state, good: state.good + 1 };
      return good;
    case "NEUTRAL":
      const neutral = { ...state, neutral: state.neutral + 1 };
      return neutral;
    case "BAD":
      const bad = { ...state, bad: state.bad + 1 };
      return bad;
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export default counterReducer;
