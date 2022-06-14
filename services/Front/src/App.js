import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./Loging/index"
import Dashboard from "./Dashboard/index"
// import Home from "./Home/Home";

const App = () => {
  return (

    <BrowserRouter>
      <Routes>
        {/* <Route path="/details/:id" element={<Details />} /> */}
        <Route path="/signin" element={<Login stage={true} />} />
        <Route path="/signup" element={<Login stage={false} />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

render(<App />, document.getElementById("root"));
