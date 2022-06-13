import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Test from "./Test";

const App = () => {
  var props = {
    text: "player later",
    textColot: "red",
    color: "queenBlue",
    hover: "crayola"
  }
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/details/:id" element={<Details />} /> */}
        <Route path="/" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
};

render(<App />, document.getElementById("root"));
