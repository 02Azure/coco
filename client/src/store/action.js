import { Redirect } from "react-router";

const server = "http://52.207.207.52:3000";
const userInfo = JSON.parse(localStorage.getItem("userLog"));
let u = "";
export function setRegister(payload) {
  return { type: "SET_REG", payload };
}
export function setWish(payload) {
  return { type: "SET_WISH", payload };
}

export function setNotFound(payload) {
  return { type: "SET_NOT_FOUND", payload };
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
export function getDetail(payload) {
  console.log(payload, "line 45 action js");
  return { type: "GET_DETAIL_ITEM", payload };
}

export function createWishlist(payload) {
  return { type: "CREATE_WISHLIST", payload };
}

export function setWishlist(payload) {
  return { type: "SET_WISHLIST", payload };
}

export function getDetailWishlist(payload) {
  return { type: "GET_DETAIL_WISHLIST", payload };
}

export function register(payload) {
  return function (dispatch) {
    fetch(server + "/users/register", {
      method: "POST",

      body: JSON.stringify(payload),

      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        } else {
          console.log(response, "<<<");
          throw new Error(response.statusText);
        }
      })
      .then((result) => {
        dispatch(setRegister(true));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function login(payload) {
  // console.log(payload, "<<");
  return function (dispatch) {
    fetch("http://52.207.207.52:3000/users/login", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        const success = response.status === 200;
        if (success) {
          // console.log('success');
          return response.json();
        } else {
          // console.log();
          throw new Error(response.statusText);
        }
      })
      .then((result) => {
        localStorage.setItem("userLog", JSON.stringify(result));
        localStorage.setItem("isLogin", true);
        u = JSON.parse(localStorage.getItem("userLog"));
        // console.log(temp.access_token, 'toen');
        dispatch(checkLogin(true));
      })
      .catch((error) => {
        console.log(error, "<<< error");
      });
  };
}

export function findOneUser(id) {
  console.log(id, "finduserr!!");
  return (dispatch) => {
    dispatch(setLoading(true));
    fetch(server + "/users/" + id)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          if (response.status == 404) {
            dispatch(setNotFound(true));
          }
          throw new Error(response.statusText);
        }
      })
      .then((user) => {
        console.log(user, "<<");
        dispatch(setOneUser(user));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        console.log(err, "<<");
      });
  };
}

export function updateUserInfo(payload) {
  // console.log(payload, "DARI updateUser");

  const { bio, location, userImage } = payload;
  return function (dispatch) {
    fetch(server + "/users", {
      method: "PUT",
      body: JSON.stringify({ location, userImage, userDesc: bio }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        // Authorization: `Bearer ${token}`,
        access_token:  JSON.parse(localStorage.getItem('userLog')).access_token_token,
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
        console.log(result);
        // Redirect("/profile/" + userInfo.id);
      })
      .catch((error) => {
        console.log(error);
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
  console.log(id, "<<<<");
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
        access_token:  JSON.parse(localStorage.getItem('userLog')).access_token_token,
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
        dispatch(getAllShow(userInfo.id));
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
        access_token:  JSON.parse(localStorage.getItem('userLog')).access_token_token,
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
        dispatch(getAllShow(userInfo.id));
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
        access_token:  JSON.parse(localStorage.getItem('userLog')).access_token_token,
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
        dispatch(getAllShow(userInfo.id));
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
        access_token: userInfo.access_token,
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
        access_token:  JSON.parse(localStorage.getItem('userLog')).access_token_token,
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
        access_token: userInfo.access_token,
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
        access_token: userInfo.access_token,
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

// ! items

export function addItem(payload) {
  const data = {
    name: payload.name,
    image: payload.image,
    tradeable: payload.tradeable,
    price: payload.price,
    tradeWith: payload.tradeWith,
    tag: payload.tag,
    description: payload.description,
  };
  // console.log(data, "<< data");
  // console.log(localStorageCheck)
  return function (dispatch) {
    fetch(server + "/items", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        access_token: JSON.parse(localStorage.getItem("userLog")).access_token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response, "<<< res");
        return response.json();
      })
      .then((result) => {
        console.log(result, "ini result");
      })
      .catch((err) => {
        console.log(err, "<<< eerr");
      });
  };
}

export function readItems() {
  return (dispatch) => {
    fetch(server + "/items", {
      headers: {
        access_token: JSON.parse(localStorage.getItem("userLog")).access_token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return dispatch(setItem(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function showDetailItem(payload) {
  const localStorageCheck = JSON.parse(localStorage.getItem("userLog"));
  return (dispatch) => {
    fetch(server + `/items/${payload}`, {
      method: "get",
      headers: {
        access_token: JSON.parse(localStorage.getItem("userLog")).access_token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data, "ini di action");
        return dispatch(getDetail(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function deleteItem(payload) {
  return (dispatch) => {
    fetch(server + `/items/${payload}`, {
      method: "delete",
      headers: {
        access_token: JSON.parse(localStorage.getItem('userLog')).access_token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response, "res");
        return response.json();
      })
      .then((result) => {
        console.log(result, "<<<");
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function editItem(payload){
  console.log(payload, 'action line 614');
  const { id } = payload
  console.log(id, 'id');
  return (dispatch) => {
    fetch(server + `/items/${id}`, {
      method: 'put',
      body: JSON.stringify(payload.updated),
      headers: {
        access_token: JSON.parse(localStorage.getItem('userLog')).access_token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      // console.log(respons);
      return response.json();
    })
    .then(res => {
      console.log(res, "<<< line 632");
      return dispatch(getDetail(res))
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

// ! wishlist

export function addWishlist(payload) {
  console.log(payload, "payload");
  const localStorageCheck = JSON.parse(localStorage.getItem("userLog"));
  return (dispatch) => {
    fetch(server + "/wishlist", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        access_token: localStorageCheck.access_token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function readWishlist() {
  const localStorageCheck = JSON.parse(localStorage.getItem("userLog"));
  return (dispatch) => {
    fetch(server + "/wishlist", {
      headers: {
        access_token: localStorageCheck.access_token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return dispatch(setWishlist(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function deleteWishlist(payload) {
  const localStorageCheck = JSON.parse(localStorage.getItem("userLog"));
  return (dispatch) => {
    fetch(server + `/wishlist/${payload}`, {
      method: "delete",
      headers: {
        access_token: localStorageCheck.access_token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function detailWishlist(payload) {
  const localStorageCheck = JSON.parse(localStorage.getItem("userLog"));
  return (dispatch) => {
    fetch(server + `/wishlist/${payload}`, {
      method: "get",
      headers: {
        access_token: localStorageCheck.access_token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data, "ini di action");
        return dispatch(getDetailWishlist(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function editWishlist(payload) {
  // console.log(payload, 'payload');
  const localStorageCheck = JSON.parse(localStorage.getItem("userLog"));
  return (dispatch) => {
    fetch(server + `/wishlist/${payload.id}`, {
      method: "put",
      body: JSON.stringify(payload.data),
      headers: {
        access_token: localStorageCheck.access_token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
