import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

interface RootState {
  getUsers: {
    userInfo?: any;
  };
}

const ProtectedLayout: React.FC = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state: RootState) => state.getUsers);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  return <Outlet />;
};

export default ProtectedLayout;
