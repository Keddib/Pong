import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <h1>
        Landing
      </h1>
      <Link to="/">home</Link> <br />
      <Link to="/app/">app</Link> <br />
      <Link to="/access/signin">signin</Link> <br />
      <Link to="/access/signup">signup</Link> <br />
      <a
        href="https://api.intra.42.fr/oauth/authorize?client_id=dac506e7095f7f042e1e9de45db80a9706974bbc636c35a367dd88b2bfdcebbb&redirect_uri=http%3A%2F%2Flocalhost%2Fauth42%2F&response_type=code&scope=public"
        className="button--2"
        target="_blank"
        rel="noreferrer"
      >
        Sign In
      </a>
    </div>
  );
}

export default Home;
