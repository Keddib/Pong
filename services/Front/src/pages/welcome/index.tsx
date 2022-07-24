import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

const Welcome: FunctionComponent = () => {
  return (
    <main>
      <h1>welcome</h1>
      <div className="w-full flex justify-center gap-2">
        <Link to="/welcome">landing</Link> <br />
        <Link to="/home">home</Link> <br />
        <Link to="/access/signin">signin</Link> <br />
        <Link to="/access/signup">signup</Link> <br />
        <img
          src="https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2lkZSUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80"
          alt="avatar"
        />
      </div>
    </main>
  );
};

export default Welcome;
