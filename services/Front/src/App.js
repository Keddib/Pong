import { render } from "react-dom";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import Login from "./Login/index";

const App = () => {
	return (
		<BrowserRouter>
			<header>
				<Link to="/">PONG!</Link>
			</header>
			<Routes>
				{/* <Route path="/details/:id" element={<Details />} /> */}
				<Route path="/" element={<Login />} />
			</Routes>
		</BrowserRouter>
	);
};

render(<App />, document.getElementById("root"));
