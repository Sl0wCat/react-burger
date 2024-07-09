export const BASE_URL = "https://norma.nomoreparties.space/api/";
export const BASE_WS_URL = "wss://norma.nomoreparties.space/orders/all";
export const BASE_WS_USER_URL = "wss://norma.nomoreparties.space/orders";

const checkReponse = (res: Response) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const request = async (url: string, options = {}) => {
  try {
    const res = await fetch(`${BASE_URL}${url}`, options);
    return await checkReponse(res);
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}
  
export const refreshToken = () => {
    return fetch(`${BASE_URL}auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken'),
      }),
    })
    .then(checkReponse)
    .then((refreshData) => {
      if (!refreshData.success) {
          return Promise.reject(refreshData);
        }
      localStorage.setItem("refreshToken", refreshData.refreshToken); 
      localStorage.setItem("accessToken", refreshData.accessToken);
      return refreshData;
    });
};


export const requestWithRefresh = async (url: string, options: RequestInit) => {
    try {
      const res = await fetch(`${BASE_URL}${url}`, options);
      return await checkReponse(res);
    } catch (e) {

      if ((e as Error).message === "jwt expired") {
        const refreshData = await refreshToken();
        options = {
          ...options,
          headers: {
            ...options.headers,
            authorization: refreshData.accessToken
          }
        }
        //options.headers.authorization = refreshData.accessToken;
        const res = await fetch(url, options);
        return await checkReponse(res);
      } else {
        console.log((e as Error).message);
        return Promise.reject(e as Error);
      }
    }
};
