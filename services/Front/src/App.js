import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Signup from "./Loging/Signup";
import Signin from "./Loging/Signin";

const App = () => {
  return (

    <BrowserRouter>
      <Routes>
        {/* <Route path="/details/:id" element={<Details />} /> */}
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

render(<App />, document.getElementById("root"));
