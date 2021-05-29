const URL_USER = "http://localhost:3000/users";

export function setRegister(payload) {
  return { type: "SET_REG", payload };
}

function setEdit(payload) {
  return { type: "SET_EDIT", payload };
}

// export function fetchTask() {
//   return function (dispatch) {
//     fetch("https://iam-simulation-02.herokuapp.com/tasks")
//       .then((res) => res.json())
//       .then((task) => dispatch(setTask(task)));
//   };
// }

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
        dispatch(setRegister(true));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

// export function deleteTask(id) {
//   return function (dispatch) {
//     fetch(`https://iam-simulation-02.herokuapp.com/tasks/${id}`, {
//       method: "DELETE",
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//       },
//     })
//       .then((response) => response.json())

//       .then((task) => dispatch(fetchTask()));
//   };
// }

// export function filterTask(category) {
//   return function (dispatch) {
//     fetch(`https://iam-simulation-02.herokuapp.com/tasks?category=${category}`)
//       .then((res) => res.json())
//       .then((task) => dispatch(setTask(task)));
//   };
// }

// export function fetchEdit(id) {
//   return function (dispatch) {
//     fetch(`https://iam-simulation-02.herokuapp.com/tasks/${id}`, {
//       method: "GET",
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//       },
//     })
//       .then((response) => response.json())

//       .then((task) => {
//         dispatch(setEdit(task));
//       });
//   };
// }

// export function editTask(payload) {
//   console.log(payload);
//   const { id, title, category } = payload;

//   return function (dispatch) {
//     fetch(`https://iam-simulation-02.herokuapp.com/tasks/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//       },
//       body: JSON.stringify({ title, category }),
//     })
//       .then((response) => response.json())
//       .then((task) => {
//         dispatch(fetchTask());
//       });
//   };
// }
