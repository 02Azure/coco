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

export function getDetail(payload) {
  return { type: "GET_DETAIL_ITEM", payload }
}

export function createWishlist(payload) {
  return { type: "CREATE_WISHLIST", payload}
}

export function setWishlist(payload) {
  return { type: "SET_WISHLIST", payload}
}

export function getDetailWishlist(payload) {
  return { type: "GET_DETAIL_WISHLIST", payload}
}
// export function fetchItems() {
//   return function (dispatch) {
//     dispatch(setLoading(true));
//     fetch(jsonServer + "/items")
//       .then((res) => res.json())
//       .then((item) => {
//         dispatch(setItem(item));
//         dispatch(setLoading(false));
//       });
//   };
// }

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
      }
    })
      .then((response) => {
        const success = response.status === 200
        if(success){
          // console.log('success');
          return response.json()
        }else{
          // console.log();
          throw new Error(response.statusText)
        }
      })
      .then((result) => {
        localStorage.setItem('userLog', JSON.stringify(result));
        dispatch(checkLogin(true))
      })
      .catch((error) => {
        console.log(error, "<<< error");
      });
  };
}
export function findOneUser(id) {
  console.log(id);
  return (dispatch) => {
    dispatch(setLoading(true));
    fetch(server + "/users/" + id)
      .then((res) => res.json())
      .then((user) => {
        console.log(user,"<<");
        dispatch(setOneUser(user));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        console.log(err, "<<");
      })
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
// add
export function AddNewShowcase(payload) {
  return function (dispatch) {
    fetch(server + "/showcases", {
      method: "POST",

      body: JSON.stringify(payload),

      headers: {
        "Content-type": "application/json; charset=UTF-8",
        // Authorization: `Bearer ${token}`,
        Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJzaGFrIiwiZW1haWwiOiJzQG1haWwuY29tIiwiaWF0IjoxNjIyNDEyMzM4fQ.O8T9gQHTcPWiiSKUW4bf3yMokfnQbc0EZMhcM49q0KA",
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
        console.log(result);
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
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

// ! SHOWCASES


// ! items

export function addItem(payload){
  // console.log(payload, 'pay add item');
  const localStorageCheck = JSON.parse(localStorage.getItem('userLog')) 
  const data = {
    name : payload.name,
    image: payload.image, 
    tradeable: payload.tradeable, 
    price : payload.price, 
    tradeWith : payload.tradeWith, 
    tag : payload.tag, 
    description : payload.description
  }
  // console.log(data, "<< data");
  // console.log(localStorageCheck)
  return function (dispatch) {
    fetch(server + '/items', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        access_token: localStorageCheck.access_token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log(response, "<<< res");
      return response.json()
    })
    .then(result => {
      console.log(result, 'ini result');
    })
    .catch(err => {
      console.log(err, "<<< eerr");
    })
  }
}

export function readItems(){
  const localStorageCheck = JSON.parse(localStorage.getItem('userLog')) 
  return (dispatch) => {
    fetch(server + '/items', {
      headers: {
        access_token: localStorageCheck.access_token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      return response.json()
    }) 
    .then(data => {
      return  dispatch(setItem(data))
    })
    .catch(err => {
      console.log(err);
    })
  }
}

export function showDetailItem(payload){
  const localStorageCheck = JSON.parse(localStorage.getItem('userLog'))
  return (dispatch) => {
    fetch(server + `/items/${payload}`, {
      method: 'get',
      headers: {
        access_token: localStorageCheck.access_token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log(data, 'ini di action');
      return dispatch(getDetail(data))
    })
    .catch(err => {
      console.log(err);
    })
  }
}

export function deleteItem(payload){
  const localStorageCheck = JSON.parse(localStorage.getItem('userLog'))
  return (dispatch) => {
    fetch(server + `/items/${payload}`, {
      method: 'delete',
      headers: {
        access_token: localStorageCheck.access_token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response =>{
      return response.json()
    })
    .then(result =>{
      console.log(result);
      return result
    })
    .catch(err =>{
      console.log(err);
    })
  }
}

// ! wishlist

export function addWishlist(payload) {
  console.log(payload, 'payload');
  const localStorageCheck = JSON.parse(localStorage.getItem('userLog')) 
  return (dispatch) => {
    fetch(server + '/wishlist', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        access_token: localStorageCheck.access_token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      return response.json()
    })
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    })
  }
}

export function readWishlist(){
  const localStorageCheck = JSON.parse(localStorage.getItem('userLog')) 
  return (dispatch) => {
    fetch(server + '/wishlist', {
      headers: {
        access_token: localStorageCheck.access_token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      return response.json()
    }) 
    .then(data => {
      return dispatch(setWishlist(data))
    })
    .catch(err => {
      console.log(err);
    })
  }
}

export function deleteWishlist(payload) {
  const localStorageCheck = JSON.parse(localStorage.getItem('userLog'))
  return (dispatch) => {
    fetch(server + `/wishlist/${payload}`,{
      method: 'delete',
      headers: {
        access_token: localStorageCheck.access_token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      return response.json()
    })
    .then(result => {
      console.log(result);
      return result
    })
    .catch(err => {
      console.log(err);
    })
  }
}

export function detailWishlist(payload){
  const localStorageCheck = JSON.parse(localStorage.getItem('userLog'))
  return (dispatch) => {
    fetch(server + `/wishlist/${payload}`, {
      method: 'get',
      headers: {
        access_token: localStorageCheck.access_token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log(data, 'ini di action');
      return dispatch(getDetailWishlist(data))
    })
    .catch(err => {
      console.log(err);
    })
  }
}

export function editWishlist(payload) {
  // console.log(payload, 'payload');
  const localStorageCheck = JSON.parse(localStorage.getItem('userLog')) 
  return (dispatch) => {
    fetch(server + `/wishlist/${payload.id}`,{
      method: 'put',
      body: JSON.stringify(payload.data),
      headers: {
        access_token: localStorageCheck.access_token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response =>{
      return response.json()
    })
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    })
  }
}