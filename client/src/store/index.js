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
  oneShow: { name: "jsfks" },
  oneItem: {},
  wishlists: [],
  wishlist: {},
  userNotFound: false,
  error: { err: false, msg: "" },
  listItems: [],
  u: {},
  search: "",
};

function reducer(state = intialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "SET_REG":
      return { ...state, register: payload };
    case "SET_ITEM":
      return { ...state, items: payload };
    case "SET_LIST_ITEMS":
      return { ...state, listItems: payload };
    case "SET_USER":
      return { ...state, user: payload };
    case "SET_LOADING":
      return { ...state, loading: payload };
    case "SET_DISCO":
      return { ...state, discovery: payload };
    case "SET_SEARCH":
      return { ...state, search: payload };
    case "SET_ONE_USER":
      return { ...state, oneUser: payload };
    case "SET_NOT_FOUND":
      return { ...state, userNotFound: payload };
    case "SET_ONE_SHOW":
      return { ...state, oneShow: payload };
    case "SET_ALL_SHOW":
      return { ...state, allShow: payload };
    case "IS_AUTH":
      return { ...state, isLogin: payload };
    case "SET_WISH":
      return { ...state, wish: payload };
    case "GET_DETAIL_ITEM":
      return { ...state, oneItem: payload };
    case "CREATE_WISHLIST":
      return { ...state, wishlists: state.wishlists.concat(payload) };
    case "SET_WISHLIST":
      return { ...state, wishlists: payload };
    case "SET_ERROR":
      return { ...state, error: payload };
    case "SET_U":
      return { ...state, u: payload };
    case "GET_DETAIL_WISHLIST":
      return { ...state, wishlist: payload };
    default:
      return state;
  }
}

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
