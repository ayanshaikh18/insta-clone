import axios from "axios";

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

export const login = async (data) => {
  var response = await axios.post("/users/login", {
    email: data.email,
    password: data.password,
  });
  return response;
};

export const signup = async (data) => {
  var response = await axios.post("/users/register", {
    name: data.username,
    email: data.email,
    password: data.password,
  });
  return response;
};

export const getSuggestions = async () => {
  var response = await axios.get("/users/getSuggestions", config);
  return response;
};

export const sendFriendRequest = async (username) => {
  var response = await axios.post(
    "/users/sendFriendRequest/" + username,
    null,
    config
  );
  return response;
};

export const getLoggedInUser = async () => {
  var response = await axios.get("/users/getLoggedinUser", config);
  return response;
};

export const getFrdRequests = async () => {
  var response = await axios.get("/users/getFrdRequests/", config);
  return response;
};
