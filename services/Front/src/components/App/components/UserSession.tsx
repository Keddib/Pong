import useAuth from "hooks/useAuth";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import {checkUserSession} from "services/axios";
import Loading from "components/Loading";

const UserSession = () => {
  const { signin, isUserAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // check user session
    const verifyUserSession = async () => {
      try {
        const user = await checkUserSession();
        if (user) {
          signin(user);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    isUserAuth() ? setIsLoading(false) : verifyUserSession();
  }, []);

  return <>{isLoading ? <Loading/> : <Outlet />}</>;
};

export default UserSession;
