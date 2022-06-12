
import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// import Login from "./Login/index";
import NavBar from "./Login/NavBar";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/details/:id" element={<Details />} /> */}
        <Route path="/" element={<NavBar />} />
      </Routes>
    </BrowserRouter>
  );
};

render(<App />, document.getElementById("roott"));
