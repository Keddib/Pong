import { render } from "react-dom";
import Pet from "./Pet.jsx";

const App = () => {
  return (
    <div id="adopt">
      <h1>Adopt me</h1>
      <Pet name="Luna" animal="Dog" breed="havanese" />
      <Pet name="Popy" animal="Dog" breed="PoliceDog" />
      <Pet name="choia" animal="cat" breed="Mix" />
    </div>
  );
};

render(<App />, document.getElementById("root"));
