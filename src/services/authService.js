import axios from "axios";

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
