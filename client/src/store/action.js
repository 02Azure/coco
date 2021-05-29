const URL_USER = "http://localhost:3000/users";
const jsonServer = "http://localhost:8000";

export function setRegister(payload) {
  return { type: "SET_REG", payload };
}

export function setItem(payload) {
  return { type: "SET_ITEM", payload };
}

export function fetchItems() {
  return function (dispatch) {
    fetch(jsonServer + "/items")
      .then((res) => res.json())
      .then((item) => dispatch(setItem(item)));
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
