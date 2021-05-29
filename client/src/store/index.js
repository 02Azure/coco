import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const intialState = {
  register: false,
  // edited: { title: "", category: "" },
  items: [],
};

function reducer(state = intialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "SET_REG":
      return { ...state, register: payload };
    case "SET_ITEM":
      return { ...state, items: payload };

    default:
      return state;
  }
}

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
