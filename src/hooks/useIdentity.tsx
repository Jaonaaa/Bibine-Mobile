import { useEffect, useState } from "react";
import { alaivoDelete, alaivoPost } from "../utils/Alaivo";
import { storage } from "../data/storage";

// variable localstorage

const userStocked = storage.user;
const tokenStocked = storage.token;
const refreshTokenStocked = storage.refresh_token;
const userDetails = "details_user_";

const contentTypeHeaders = { "Content-Type": "application/json" };

const authenticateURL = "auth/authenticate";
const registerURL = "auth/register";
const getRefreshTokenURL = "auth/refresh_token";
const checkTokenStatusURL = "auth/checkTokenStatus";

const getUserPresp = () => {
  return localStorage.getItem(userStocked) === null
    ? undefined
    : JSON.parse(localStorage.getItem(userStocked) as string);
};

const useIdentity = (addNotifs: any) => {
  const userPresp = getUserPresp();
  const [user, setUser] = useState(userPresp);
  const [token_refresh_status, setTokenRefresh_status] = useState(false);
  const [token_status, setToken_status] = useState(false);

  const initUser = () => {
    setUser(getUserPresp());
  };
  useEffect(() => {
    initUser();
  }, [document.location.pathname]);

  const logout = (to = "/") => {
    localStorage.removeItem(userStocked);
    localStorage.removeItem(tokenStocked);
    localStorage.removeItem(refreshTokenStocked);
    localStorage.removeItem(userDetails);
    setUser(undefined);
    document.location = to;
  };

  const getNewTokenByRefreshToken = (refreshToken: any) => {
    alaivoPost(
      getRefreshTokenURL,
      JSON.stringify({
        refresh_token: refreshToken ? refreshToken : localStorage.getItem(refreshToken),
      }),
      {
        headers: {
          contentTypeHeaders,
        },
      },
      true
    )
      .then((res: any) => {
        if (res.data) {
          setUpStorageConnect(res.data);
        }
        if (res.status) console.log(res.details);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const checkTokenStatus = () => {
    alaivoPost(
      checkTokenStatusURL,
      JSON.stringify({
        refresh_token: localStorage.getItem(refreshTokenStocked),
        token: localStorage.getItem(tokenStocked),
      }),
      {
        headers: {
          contentTypeHeaders,
        },
      },
      true
    )
      .then((res: any) => {
        setTokenRefresh_status(res.refresh_token_valid);
        setToken_status(res.token_valid);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const disableRefreshToken = () => {
    alaivoDelete(
      getRefreshTokenURL,
      JSON.stringify({
        refresh_token: localStorage.getItem(refreshTokenStocked),
      }),
      {
        headers: {
          contentTypeHeaders,
        },
      },
      true
    )
      .then((res) => {
        localStorage.removeItem(refreshTokenStocked);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const signIn = async (formData: any) => {
    return new Promise((resolve, reject) => {
      alaivoPost(authenticateURL, JSON.stringify(formData), null, true)
        .then((response) => {
          addNotifs("OK", "Connecté");
          setUpStorageConnect(response);
          resolve(refreshTokenStocked);
        })
        .catch((error) => {
          addNotifs("error", "Email or password not correct.");
          reject(error);
        });
    });
  };

  const setUpStorageConnect = (data: any) => {
    localStorage.setItem(refreshTokenStocked, data.refresh_token);
    localStorage.setItem(tokenStocked, data.token);
    localStorage.setItem(userStocked, JSON.stringify(data.user));
    localStorage.setItem(storage.user_name, data.user.name);
    localStorage.setItem(userDetails, JSON.stringify(data.details_user_));
    localStorage.setItem(storage.user_connected, "true");
  };

  const signUp = (formData: any, to: string) => {
    alaivoPost(registerURL, JSON.stringify(formData), getHeader(), true)
      .then((response) => {
        console.log(response);
        if (to) document.location = to;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
    user,
    signIn,
    setUser,
    token_refresh_status,
    token_status,
    logout,
    getNewTokenByRefreshToken,
    signUp,
    checkTokenStatus,
    disableRefreshToken,
    setUpStorageConnect,
  };
};

export const getHeaderAuthJWT = () => ({
  headers: {
    Authorization: "Bearer " + localStorage.getItem(tokenStocked),
    ...contentTypeHeaders,
  },
});

export const getHeader = () => ({
  headers: {
    ...contentTypeHeaders,
  },
});

export default useIdentity;
