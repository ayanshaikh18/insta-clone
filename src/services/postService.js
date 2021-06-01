import axios from "axios";
import { getLoggedInUser } from "./authService";

export const getToken = () => {
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return userToken;
};

var config = {
  headers: {
    Authorization: getToken(),
  },
};

export const postPost = async (data) => {
  console.log(data);
  var res = await getLoggedInUser();
  console.log(res.data);
  var response = await axios.post(
    "/posts/",
    {
      caption: data.caption,
      postedBy: res.data.name,
      postedImage: data.postedImage,
    },
    config
  );
  return response;
};
