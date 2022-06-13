import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./Loging/index"

const App = () => {
  return (

    <BrowserRouter>
      <Routes>
        {/* <Route path="/details/:id" element={<Details />} /> */}
        <Route path="/" element={<Login stage={true} />} />
        <Route path="/signup" element={<Login stage={false} />} />
      </Routes>
    </BrowserRouter>
  );
};

render(<App />, document.getElementById("root"));
