import { useEffect, useState } from "react";
import axios from "axios";

import { Blog, User } from "./types";
import { BACKEND_URL } from "../../config";

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBlog(response.data.blog);
        setLoading(false);
      });
  }, [id]);

  return {
    loading,
    blog,
  };
};

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/all`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBlogs(response.data.blogPosts);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    blogs,
  };
};

export function useUserBlogs() {
  const [loading, setLoading] = useState(true);
  const [userData, setuserData] = useState<User>();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/userBlogs`, {
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
