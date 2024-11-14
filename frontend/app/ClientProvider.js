"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout, setUser } from "../features/user/userSlice";

const ClientProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  // console.log("session", session);
  useEffect(() => {
    if (session) {
      dispatch(setUser({ ...session.user, id: session.id }));
    } else {
      dispatch(logout());
    }
  }, [session, dispatch]);

  return <>{children}</>;
};

export default ClientProvider;
