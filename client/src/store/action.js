const URL_USER = "http://localhost:3000/users";

export function setRegister(payload) {
  return { type: "SET_REG", payload };
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
