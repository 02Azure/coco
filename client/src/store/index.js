import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const intialState = {
  register: false,
  // edited: { title: "", category: "" },
  items: [],
  isLogin: false,
  loading: false,
  oneUser: {},
  user: [],
  oneShow: {},
  allShow: [],
  discovery: [],
  wish: [],
};

function reducer(state = intialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "SET_REG":
      return { ...state, register: payload };
    case "SET_ITEM":
      return { ...state, items: payload };
    case "SET_USER":
      // console.log(payload, 'di store index');
      return { ...state, user: payload };
    case "SET_LOADING":
      return { ...state, loading: payload };
    case "SET_DISCO":
      return { ...state, discovery: payload };
    case "SET_ONE_USER":
      return { ...state, oneUser: payload };
    case "SET_ONE_SHOW":
      return { ...state, oneShow: payload };
    case "SET_ALL_SHOW":
      return { ...state, allShow: payload };
    case "IS_AUTH":
      return { ...state, isLogin: payload };
    case "SET_WISH":
      return { ...state, wish: payload };
    default:
      return state;
  }
}

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
