const URL_USER = "http://localhost:3000/users";
const jsonServer = "http://localhost:8000";
const userEndpoint = "http://localhost:8000/users";

export function setRegister(payload) {
  return { type: "SET_REG", payload };
}

export function setItem(payload) {
  return { type: "SET_ITEM", payload };
}

export function setLoading(payload) {
  return { type: "SET_LOADING", payload };
}
export function setOneUser(payload) {
  return { type: "SET_ONE_USER", payload };
}

export function fetchItems() {
  return function (dispatch) {
    dispatch(setLoading(true));
    fetch(jsonServer + "/items")
      .then((res) => res.json())
      .then((item) => {
        dispatch(setItem(item));
        dispatch(setLoading(false));
      });
  };
}

export function register(payload) {
  return function (dispatch) {
    fetch(URL_USER + "/register", {
      method: "POST",

      body: JSON.stringify(payload),

      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log(response);
          throw new Error(response.statusText);
        }
      })
      .then((result) => {
        // Do something with the response
        localStorage.setItem("token", result.email);
        dispatch(setRegister(true));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function findOneUser(id) {
  return function (dispatch) {
    dispatch(setLoading(true));
    fetch(userEndpoint + "/" + id)
      .then((res) => res.json())
      .then((user) => {
        dispatch(setOneUser(user));
        dispatch(setLoading(false));
      });
  };
}
