import axios from "axios";
import { getLoggedInUser } from "./authService";

export const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

var config = {
  headers: {
    Authorization: getToken(),
  },
};

export const postPost = async (data) => {
  let token = localStorage.getItem("token");
  var user = await getLoggedInUser();
  var response = await axios({
    method: "POST",
    url: "/posts/",
    data: {
      caption: data.caption,
      postedBy: user.name,
      postedImage: data.postedImage,
    },
    headers: { Authorization: `${token}` },
  });
  return response;
};

export const getPosts = async () => {
  let token = localStorage.getItem("token");
  var response = await axios({
    method: "GET",
    url: "/posts/",
    headers: { Authorization: `${token}` },
  });
  console.log(response.data);
  return response.data
};
