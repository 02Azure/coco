import { Redirect } from "react-router";

const URL_USER = "http://localhost:3000/users";
const jsonServer = "http://localhost:8000";
const userEndpoint = "http://localhost:8000/users";
const server = "http://52.207.207.52:3000";

export function setRegister(payload) {
  return { type: "SET_REG", payload };
}
export function setWish(payload) {
  return { type: "SET_WISH", payload };
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

export function setDisco(payload) {
  return { type: "SET_DISCO", payload };
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
        dispatch(setLoading(false));
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
        dispatch(setLoading(false));

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

// ? ITEMS
// get all
export function getItems(id) {
  return function (dispatch) {
    dispatch(setLoading(true));
    fetch(server + "/items", {
      method: "GET",
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
        dispatch(setItem(result));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setLoading(false));
      });
  };
}
// ? ITEMS

// SHOCASE TO ITEMS
export function postShowToItems(payload) {
  const { ItemId, ShowcaseId } = payload;
  return function (dispatch) {
    dispatch(setLoading(true));
    fetch(server + "/showcaseitems", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJzaGFrIiwiZW1haWwiOiJzQG1haWwuY29tIiwiaWF0IjoxNjIyNDEyMzM4fQ.O8T9gQHTcPWiiSKUW4bf3yMokfnQbc0EZMhcM49q0KA",
      },

      body: JSON.stringify({ ItemId, ShowcaseId }),
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
        console.log(result);
        dispatch(setLoading(false));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
// SHOCASE TO ITEMS

// shocase items
export function getDisco(id) {
  return function (dispatch) {
    dispatch(setLoading(true));
    fetch(server + "/showcaseitems", {
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
        dispatch(setDisco(result));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function switchStarItems({ id, ShowcaseId }) {
  return function (dispatch) {
    dispatch(setLoading(true));
    fetch(server + "/showcaseitems/" + id, {
      method: "PATCH",
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
          Redirect("/");
          dispatch(setLoading(false));
          throw new Error(response.statusText);
        }
      })
      .then((result) => {
        console.log(result);
        dispatch(oneShow(ShowcaseId));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function removeItemsFromShowcase({ id, ShowcaseId }) {
  return function (dispatch) {
    dispatch(setLoading(true));
    fetch(server + "/showcaseitems/" + id, {
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
          Redirect("/");
          dispatch(setLoading(false));
          throw new Error(response.statusText);
        }
      })
      .then((result) => {
        console.log(result);
        dispatch(oneShow(ShowcaseId));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
// shocase items

// !
export function getWish(id) {
  return function (dispatch) {
    dispatch(setLoading(true));
    fetch(server + "/wishlist", {
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
        dispatch(setLoading(false));
        dispatch(setWish(result));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
// !
