import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();
  // const host="http://localhost:8080";
  const host=process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(`${host}/api/v1/auth/admin-auth`);
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
    
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="" />;
}
