import { Redirect } from "react-router";
import Toast from "../helpers/swalToast";

// const server = "http://localhost:3001"
const server = "http://52.207.207.52:3000";
var userInfo = "";
let u = "";
export function setRegister(payload) {
  return { type: "SET_REG", payload };
}

export function setSearch(payload) {
  return { type: "SET_SEARCH", payload };
}
export function setWish(payload) {
  return { type: "SET_WISH", payload };
}
export function setError(payload) {
  return { type: "SET_ERROR", payload };
}

export function setNotFound(payload) {
  return { type: "SET_NOT_FOUND", payload };
}
export function setU(payload) {
  return { type: "SET_U", payload };
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
        return response.json();
      })
      .then((result) => {
        if (result.error) {
          console.log(result.error, "for swal");
          if (Array.isArray(result.error)) {
            result.error = result.error.join(", ");
          }
          Toast.fire({
            icon: "error",
            title: result.error,
          });
        } else {
          dispatch(setRegister(true));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function login(payload) {
  // console.log(payload, "<<");
  return function (dispatch) {
    fetch(`${server}/users/login`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.error) {
          console.log(result.error, "for swal");
          if (Array.isArray(result.error)) {
            result.error = result.error.join(", ");
          }
          Toast.fire({
            icon: "error",
            title: result.error,
          });
        } else {
          localStorage.setItem("userLog", JSON.stringify(result));
          localStorage.setItem("isLogin", true);
          u = JSON.parse(localStorage.getItem("userLog"));
          userInfo = JSON.parse(localStorage.getItem("userLog"));
          dispatch(setU(result));
          dispatch(checkLogin(true));
        }
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
        dispatch(setOneUser(user));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        console.log(err, "<<");
      });
  };
}

export function updateUserInfo(payload) {
  console.log(payload, "DARI updateUser");

  const { bio, location, userImage } = payload;
  return function (dispatch) {
    fetch(server + "/users", {
      method: "PUT",
      body: JSON.stringify({ location, userImage, userDesc: bio }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        // Authorization: `Bearer ${token}`,
        access_token: JSON.parse(localStorage.getItem("userLog")).access_token,
      },
      mode: "cors",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          Toast.fire({
            icon: "error",
            title: response.statusText,
          });
          throw new Error(response.statusText);
        }
      })
      .then((result) => {
        console.log(result);
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
  console.log(id, "<<<< line 213");
  return function (dispatch) {
    dispatch(setLoading(true));
    fetch(server + "/showcases?userId=" + id, {
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
        access_token: JSON.parse(localStorage.getItem("userLog")).access_token,
      },
      mode: "cors",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          Toast.fire({
            icon: "error",
            title: response.statusText,
          });
          console.log(response, "<<<");
          throw new Error(response.statusText);
        }
      })
      .then((result) => {
        dispatch(getAllShow(JSON.parse(localStorage.getItem("userLog")).id));
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
        access_token: JSON.parse(localStorage.getItem("userLog")).access_token,
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
        dispatch(getAllShow(JSON.parse(localStorage.getItem("userLog")).id));
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
        access_token: JSON.parse(localStorage.getItem("userLog")).access_token,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          Toast.fire({
            icon: "error",
            title: response.statusText,
          });
          throw new Error(response.statusText);
        }
      })
      .then((result) => {
        // Do something with the response
        dispatch(getAllShow(JSON.parse(localStorage.getItem("userLog")).id));
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
        access_token: JSON.parse(localStorage.getItem("userLog")).access_token,
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
        access_token: JSON.parse(localStorage.getItem("userLog")).access_token,
      },

      body: JSON.stringify({ ItemId, ShowcaseId }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          Toast.fire({
            icon: "error",
            title: "Item in Showcase already",
          });
          throw new Error(response.statusText);
        }
      })
      .then((result) => {
        dispatch(getAllShow(JSON.parse(localStorage.getItem("userLog")).id));

        Toast.fire({
          icon: "success",
          title: result.msg,
        });
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
  console.log(id, ShowcaseId, "<<<<");
  return function (dispatch) {
    dispatch(setLoading(true));
    fetch(server + "/showcaseitems/" + id, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        access_token: JSON.parse(localStorage.getItem("userLog")).access_token,
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
        access_token: JSON.parse(localStorage.getItem("userLog")).access_token,
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
        return response.json();
      })

      .then((result) => {
        if (result.msg) {
          Toast.fire({
            icon: "success",
            title: result.msg,
          });
        } else {
          if (Array.isArray(result.error)) {
            result.error = result.error.join(", ");
          }
          Toast.fire({
            icon: "error",
            title: result.error,
          });
        }
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
  return (dispatch) => {
    dispatch(setLoading(true));
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
        dispatch(setLoading(false));
        return dispatch(getDetail(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function deleteItem(payload) {
  return (dispatch) => {
    dispatch(setLoading(true));
    fetch(server + `/items/${payload}`, {
      method: "delete",
      headers: {
        access_token: JSON.parse(localStorage.getItem("userLog")).access_token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        Toast.fire({
          icon: "success",
          title: result.msg,
        });
        dispatch(setLoading(false));
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function editItem(payload) {
  console.log(payload, "action line 614");
  const { id } = payload;
  console.log(id, "id");
  return (dispatch) => {
    fetch(server + `/items/${id}`, {
      method: "put",
      body: JSON.stringify(payload.updated),
      headers: {
        access_token: JSON.parse(localStorage.getItem("userLog")).access_token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        // console.log(respons);
        return response.json();
      })
      .then((res) => {
        console.log(res, "<<< line 632");
        return dispatch(getDetail(res));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

// ! wishlist

export function addWishlist(payload) {
  return (dispatch) => {
    fetch(server + "/wishlist", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        access_token: JSON.parse(localStorage.getItem("userLog")).access_token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response, "<<<<not ok");
          throw response.json();
        }
        return response.json();
      })
      .then((result) => {
        if (result.msg) {
          Toast.fire({
            icon: "success",
            title: result.msg,
          });
        } else {
          if (Array.isArray(result.error)) {
            result.error = result.error.join(", ");
          }
          Toast.fire({
            icon: "error",
            title: result.error,
          });
        }
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: err.error,
        });
        console.log(err, "ini err");
      });
  };
}

export function readWishlist(payload) {
  let temp = server + "/wishlist";
  if (payload) {
    temp += "?userId=" + payload;
  }
  return (dispatch) => {
    fetch(temp, {
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
        return dispatch(setWishlist(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function deleteWishlist(payload) {
  return (dispatch) => {
    fetch(server + `/wishlist/${payload}`, {
      method: "delete",
      headers: {
        access_token: JSON.parse(localStorage.getItem("userLog")).access_token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        Toast.fire({
          icon: "success",
          title: result.msg,
        });
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function detailWishlist(payload) {
  return (dispatch) => {
    dispatch(setLoading(true));
    fetch(server + `/wishlist/${payload}`, {
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
        return dispatch(getDetailWishlist(data));
      })
      // .then(())
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}

export function editWishlist(payload) {
  console.log(payload, "payload");
  return (dispatch) => {
    fetch(server + `/wishlist/${payload.id}`, {
      method: "put",
      body: JSON.stringify(payload.data),
      headers: {
        access_token: JSON.parse(localStorage.getItem("userLog")).access_token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.msg) {
          Toast.fire({
            icon: "success",
            title: result.msg,
          });
        } else {
          if (Array.isArray(result.error)) {
            result.error = result.error.join(", ");
          }
          Toast.fire({
            icon: "error",
            title: result.error,
          });
        }
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function searchBy(payload) {
  console.log(payload, "payload");
  return (dispatch) => {
    dispatch(setSearch(payload));
  };
}
