import { requestWithRefresh } from ".";
import { ILoginForm } from "../services/reducers/user";
import { TResponseBody, TUser } from "./types";


export const getUser = (): Promise<TResponseBody<TUser>> => {
    const token = localStorage.getItem('accessToken');
    if (!!token)
        return requestWithRefresh('auth/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': token
            },
        })
    else
        return requestWithRefresh('auth/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
}

    
  
export const login = (params: ILoginForm) => 
    requestWithRefresh('auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(params)
    })
    

export const register = (params: ILoginForm) => 
    requestWithRefresh('auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(params)
})

export const update = (params: TUser) => {
    const token = localStorage.getItem('accessToken');
    return requestWithRefresh('auth/user', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': token!
        },
        body: JSON.stringify(params)
    })
}


export const updateUser = (params: TUser): Promise<TResponseBody<TUser>> => {
    const token = localStorage.getItem('accessToken');
    if (!!token)
        return requestWithRefresh('auth/user', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': token
            },
            body: JSON.stringify(params)
        })
    else
        return requestWithRefresh('auth/user', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(params)
        })
}
  

export const logout = () => 
  requestWithRefresh('auth/logout', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({token: localStorage.getItem('refreshToken')})
  })

  
  export const api = {
    getUser,
    login,
    register,
    update,
    updateUser,
    logout
  };
  