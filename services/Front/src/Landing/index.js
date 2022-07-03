import { Link } from "react-router-dom";
const Home = () => {
  return (
    <main>
      <h1>
        Landing
      </h1>
      <div className="w-full flex justify-center gap-2">
        <Link to="/welcome">landing</Link> <br />
        <Link to="/home">home</Link> <br />
        <Link to="/access/signin">signin</Link> <br />
        <Link to="/access/signup">signup</Link> <br />
      </div>
    </main>
  );
}

export default Home;
