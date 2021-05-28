// import Login from "./views/Login";
import React from "react";
import Detail from "./views/Detail";
import { Profile } from "./views/Profile";

import { Button } from "react-bootstrap";

// import Register from "./views/Register";

function App() {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <div className="App">
      {/* <Login />

      <Register /> */}

      {/* <Profile /> */}

      <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button>

      <Detail show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
}

export default App;
