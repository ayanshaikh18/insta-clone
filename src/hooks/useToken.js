import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const token = localStorage.getItem("token");
  return token;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    localStorage.setItem('token', userToken);
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }
}