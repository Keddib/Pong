import { render } from "react-dom";
// import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./Loging";

// <BrowserRouter>
//   <Routes>
//     {/* <Route path="/details/:id" element={<Details />} /> */}
//     <Route path="/" element={<Login />} />
//   </Routes>
// </BrowserRouter>

const App = () => {
  return <Login />;
};

render(<App />, document.getElementById("root"));
