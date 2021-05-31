const URL_USER = "http://localhost:3000/users";
const jsonServer = "http://localhost:8000";
const userEndpoint = "http://localhost:8000/users";
const server = "http://52.207.207.52:3000";

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

export function setLogin(payload) {
  // console.log(payload, "<<< payload action");
  return { type: "SET_USER", payload };
}

export function checkLogin(payload) {
  return { type: "IS_AUTH", payload };
}

export function setOneShow(payload) {
  return { type: "SET_ONE_SHOW", payload };
}
export function setAllShow(payload) {
  return { type: "SET_ALL_SHOW", payload };
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
  console.log(payload);
  return function (dispatch) {
    fetch(server + "/users/register", {
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
          console.log(response, "<<<");
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

export function login(payload) {
  // console.log(payload, "<<< payload set login");
  return function (dispatch) {
    fetch(URL_USER + "/login", {
      method: "POST",
      body: payload,
    })
      .then((response) => {
        console.log(response, "response di store > action > line 76");
        dispatch(setLogin(payload));
        localStorage.setItem("data", JSON.stringify(payload));
        dispatch(checkLogin(true));
      })
      .catch((error) => {
        console.log(error, "<<< error");
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

// export function checkLogin(payload){
//   return { type: "IS_AUTH", payload}
// }

// ! SHOWCASES
// get one
export function oneShow(id) {
  return function (dispatch) {
    dispatch(setLoading(true));
    fetch(server + "/showcases/" + id)
      .then((res) => res.json())
      .then((item) => {
        console.log(item);
        dispatch(setOneShow(item));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setLoading(false));
      });
  };
}
// get all
export function getAllShow(id) {
  return function (dispatch) {
    dispatch(setLoading(true));
    fetch(server + "/showcases/?userId=" + id, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log(response, "<<<");
          throw new Error(response.statusText);
        }
      })
      .then((result) => {
        // Do something with the response
        dispatch(setAllShow(result));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
// add

export function AddNewShowcase(payload) {
  console.log(payload, "DARI ADDNEWSHOWCASE");
  return function (dispatch) {
    fetch(server + "/showcases", {
      method: "POST",

      body: JSON.stringify({ name: payload }),

      headers: {
        "Content-type": "application/json; charset=UTF-8",
        // Authorization: `Bearer ${token}`,
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJzaGFrIiwiZW1haWwiOiJzQG1haWwuY29tIiwiaWF0IjoxNjIyNDEyMzM4fQ.O8T9gQHTcPWiiSKUW4bf3yMokfnQbc0EZMhcM49q0KA",
        Accept: "application/json",
      },
      mode: "cors",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log(response, "<<<");
          throw new Error(response.statusText);
        }
      })
      .then((result) => {
        dispatch(getAllShow(3));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

// delete
export function removeShowcase(id) {
  return function (dispatch) {
    fetch(server + "/showcases/" + id, {
      method: "DELETE",

      headers: {
        "Content-type": "application/json; charset=UTF-8",
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJzaGFrIiwiZW1haWwiOiJzQG1haWwuY29tIiwiaWF0IjoxNjIyNDEyMzM4fQ.O8T9gQHTcPWiiSKUW4bf3yMokfnQbc0EZMhcM49q0KA",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log(response, "<<<");
          throw new Error(response.statusText);
        }
      })
      .then((result) => {
        // Do something with the response
        dispatch(getAllShow(3));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
// update
export function updateShowName(payload) {
  const { id, name } = payload;
  return function (dispatch) {
    fetch(server + "/showcases/" + id, {
      method: "PATCH",

      body: JSON.stringify({ name }),

      headers: {
        "Content-type": "application/json; charset=UTF-8",
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJzaGFrIiwiZW1haWwiOiJzQG1haWwuY29tIiwiaWF0IjoxNjIyNDEyMzM4fQ.O8T9gQHTcPWiiSKUW4bf3yMokfnQbc0EZMhcM49q0KA",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log(response, "<<<");
          throw new Error(response.statusText);
        }
      })
      .then((result) => {
        // Do something with the response
        dispatch(getAllShow(3));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

// ! SHOWCASES
