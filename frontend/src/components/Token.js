import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    return tokenString;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
        if(userToken == null) {
        localStorage.removeItem('token');
        setToken(getToken());
    } else {
        localStorage.setItem('token', userToken);
        setToken(userToken);
    }
  };

  return {
    setToken: saveToken,
    token
  }
}
