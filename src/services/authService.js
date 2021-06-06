import axios from "axios";

export const getToken = () => {
  const token = localStorage.getItem("token");
  console.log("latest token :- " + token);
  return token;
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
  let token = localStorage.getItem("token");
  const response = await axios({
    method: "GET",
    url: "/users/getSuggestions",
    headers: { Authorization: `${token}` },
  });
  return response;
};

export const sendFriendRequest = async (username) => {
  let token = localStorage.getItem("token");
  var response = await axios({
    method: "POST",
    url: "/users/sendFriendRequest/" + username,
    data: null,
    headers: { Authorization: `${token}` },
  });
  return response;
};

export const getLoggedInUser = async () => {
  let token = localStorage.getItem("token");
  const response = await axios({
    method: "GET",
    url: "/users/getLoggedinUser",
    headers: { Authorization: `${token}` },
  });
  console.log(response);
  const user = response.data;
  return user;
};

export const getFrdRequests = async () => {
  let token = localStorage.getItem("token");
  const response = await axios({
    method: "GET",
    url: "/users/getFrdRequests/",
    headers: { Authorization: `${token}` },
  });
  const requests = response.data;
  return requests;
};

export const acceptFrdRequest = async (username) => {
  let token = localStorage.getItem("token");
  var response = await axios({
    method: "POST",
    url: "/users/acceptFriendRequest/" + username,
    headers: { Authorization: `${token}` },
  });
  return response;
};

export const deleteFrdRequest = async (username) => {
  let token = localStorage.getItem("token");
  var response = await axios({
    method: "POST",
    url: "/users/deleteFriendRequest/" + username,
    headers: { Authorization: `${token}` },
  });
  return response;
};

export const unfollowUser = async (username) => {
  let token = localStorage.getItem("token");
  var response = await axios({
    method: "POST",
    url: "/users/unfollowUser/" + username,
    headers: { Authorization: `${token}` },
  });
  return response;
};

export const isLoggedIn = () => {
  let token = localStorage.getItem("token");
  console.log("mtoken:-" + token);
  if (
    token === "null" ||
    token === "undefined" ||
    token === "" ||
    token === undefined ||
    token === null
  ) {
    return false;
  }
  return true;
};

export const getProfile = async (username) => {
  let token = localStorage.getItem("token");
  var response = await axios({
    method: "GET",
    url: "/users/" + username,
    headers: { Authorization: `${token}` },
  });
  return response.data;
};

export const getUsersDpAndDisplayNames = async (users) => {
  let token = localStorage.getItem("token");
  var response = await axios({
    method: "POST",
    url: "/users/getUsersDpAndDisplayNames/",
    data: {
      usernames: users,
    },
    headers: { Authorization: `${token}` },
  });
  return response.data;
};
