const Pet = (props) => {
	return React.createElement("div", {}, [
		React.createElement("h1", {}, props.name),
		React.createElement("h2", {}, props.animal),
		React.createElement("h2", {}, props.breed)
	]);
};


const App = () => {
	return React.createElement(
		"div",
		{},
		React.createElement("h1", {}, "Adopt me!"),
		React.createElement(Pet, {
			name: "Luna",
			animal: "Dog",
			breed: "havanese"
		}),
		React.createElement(Pet, {
			name: "Popy",
			animal: "Dog",
			breed: "PoliceDog"
		}),
		React.createElement(Pet, {
			name: "Momzy",
			animal: "Cat",
			breed: "North Cat"
		})
	);
};

ReactDOM.render(React.createElement(App), document.getElementById("root"));
