import { getHeader, getHeaderAuthJWT } from "../hooks/useIdentity";

export const URL = "http://172.50.5.30:8080/";

const rebuildURL = (url = "") => {
  if (url.indexOf("new_url") !== -1) return url.replace("new_url", "");
  else return URL + url;
};

export const alaivoGet = async (url = "", options: any, noAuth = false) => {
  let auth = !noAuth ? getHeaderAuthJWT() : null;
  console.log(rebuildURL(url));

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

export const alaivoPDF = async (url = "", options: any, noAuth = false) => {
  let auth = !noAuth ? getHeaderAuthJWT() : null;

  return new Promise((resolve, reject) => {
    fetch(rebuildURL(url), {
      method: "GET",
      ...auth,
      ...options,
    })
      .then((response) => console.log(response))
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
