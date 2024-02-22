import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/UserContext";
import { Navigate, useLocation } from "react-router-dom";

const PrivateAdmin = ({ children }) => {
  const { getProfile, setUserProfile } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const location = useLocation();

  useEffect(() => {
    getProfile().then(
      (rsp) => {
        setUserProfile(rsp.data);
        setUser(rsp.data);
        setLoading(true);
      },
      (er) => {
        console.log(er.response.data);
        setErr(er.response.data);
      }
    );
  }, []);

  if (err) {
    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
  }

  if (!loading) {
    return (
      <div className=" m-5 p-5">
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (user) {
    return children;
  }
};

export default PrivateAdmin;
