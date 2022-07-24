import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const AuthRedirection = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchParams.get("code")) navigate("/", { replace: true });
  });

  return (
    <div className="w-full h-full bg-spaceCadet flex flex-col justify-center items-center">
      <h1 className="text-lotion">Pong</h1>
      <p className="text-lotion">
        Your are successfully redirected you can close this tap
      </p>
    </div>
  );
};

export default AuthRedirection;
