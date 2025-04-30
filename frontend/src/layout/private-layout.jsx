import React, { useEffect, useState } from "react";
import Cookies from "js-cookies";
import { useNavigate } from "react-router-dom";
import SideBar from "./sidebar";
import { getCurrentUser } from "../api-services/users-service";

import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../features/user/userSlice';

import LoadingSpinner from "../components/loading-spinner";


function PrivateLayout({ children }) {
  const [showContent, setShowContent] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const fetchUser = async () => {
        try {
          setLoading(true);
          const response = await getCurrentUser();
          dispatch(setUser(response.data))
        } catch (error) {
          console.log(error);
        }finally{
          setLoading(false);
        }
      };
  

  useEffect(() => {
    const token = Cookies.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchUser();
      setShowContent(true);
    }
  }, []);

  if(loading) {
    return <LoadingSpinner />
  }

  return (
    showContent && user && (
      <div className="flex lg:flex-row flex-col h-screen">
        <SideBar />
        <div className="flex-1 overflow-y-scroll">{children}</div>
      </div>
    )
  );
}

export default PrivateLayout;
