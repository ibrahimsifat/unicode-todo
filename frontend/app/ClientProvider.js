"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout, setUser } from "../redux/slices/userSlice";

const ClientProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  // console.log(session?.user);
  useEffect(() => {
    if (session) {
      dispatch(setUser(session.user));
    } else {
      dispatch(logout());
    }
  }, [session, dispatch]);

  return <>{children}</>;
};

export default ClientProvider;
