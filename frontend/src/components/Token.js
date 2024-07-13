import { useState } from 'react';
import axios from "axios";
import { API_URI } from "../constants";
export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    return tokenString;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = async userToken => {
        if(userToken == null) {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        setToken(getToken());
    } else {
        localStorage.setItem('token', userToken);
        setToken(userToken);
        const users = (await axios.get(API_URI + "/users/" + userToken)).data.data.id;
        localStorage.setItem('id', users);
    }
  };

  return {
    setToken: saveToken,
    token
  }
}
