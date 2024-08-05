import { useEffect, useState } from "react";
import axios from "axios";

import { User } from "./types";
import { BACKEND_URL } from "../../config";

export function useUserData(id: string) {
  const [loading, setLoading] = useState(true);
  const [userData, setuserData] = useState<User>();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/user/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setuserData(response.data.user);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    userData,
  };
}

export function useUserBoth() {
  const [loading, setLoading] = useState(true);
  const [userData, setuserData] = useState<User>();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/both`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setuserData(response.data.user);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    userData,
  };
}

export function useUserDetails(token: string): any {
  if (!token) return null;
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
}
