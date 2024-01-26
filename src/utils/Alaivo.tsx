import { getHeader, getHeaderAuthJWT } from "../hooks/useIdentity";

export const URL = "https://car-production-005c.up.railway.app/";
export const URL_message = "https://main--serene-mooncake-d83e90.netlify.app/?t=" + localStorage.getItem("token");

const rebuildURL = (url = "") => {
  if (url.indexOf("new_url") !== -1) return url.replace("new_url", "");
  else return URL + url;
};

export const alaivoGet = async (url = "", options: any, noAuth = false) => {
  let auth = !noAuth ? getHeaderAuthJWT() : null;
  return new Promise((resolve, reject) => {
    fetch(rebuildURL(url), {
      method: "GET",
      ...auth,
      ...options,
    })
      .then((response) => response.json())
      .then((responseData) => {
        resolve(responseData);
      })
      .catch((error) => reject(error));
  });
};

export const alaivoDelete = async (url = "", data: any, options: any, noAuth = false) => {
  let auth = !noAuth ? getHeaderAuthJWT() : null;
  return new Promise((resolve, reject) => {
    fetch(rebuildURL(url), {
      method: "DELETE",
      body: data,
      ...auth,
      ...options,
    })
      .then((response) => response.json())
      .then((responseData) => {
        resolve(responseData);
      })
      .catch((error) => reject(error));
  });
};

export const alaivoPut = (url = "", data: any, options: any, noAuth = false) => {
  let auth = !noAuth ? getHeaderAuthJWT() : null;
  return new Promise((resolve, reject) => {
    fetch(rebuildURL(url), {
      method: "PUT",
      body: data,
      ...auth,
      ...options,
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        resolve(responseData);
      })
      .catch((error) => reject(error));
  });
};

export const alaivoPost = (url = "", data: any, options: any, noAuth = false) => {
  let auth = !noAuth ? getHeaderAuthJWT() : getHeader();
  return new Promise((resolve, reject) => {
    fetch(rebuildURL(url), {
      method: "POST",
      body: data,
      ...auth,
      ...options,
    })
      .then((response) => response.json())
      .then((responseData) => {
        resolve(responseData);
      })
      .catch((error) => reject(error));
  });
};
