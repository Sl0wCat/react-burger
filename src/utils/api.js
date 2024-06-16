import { requestWithRefresh } from ".";


const getUser = () => 
    requestWithRefresh('auth/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': localStorage.getItem('accessToken')
        },
    })
  
const login = (params) => 
    requestWithRefresh('auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(params)
    })

const register = (params) => 
      requestWithRefresh('auth/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(params)
      })

const updateUser = (params) => 
  requestWithRefresh('auth/user', {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': localStorage.getItem('accessToken')
      },
      body: JSON.stringify(params)
  })

const logout = (params) => 
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
    updateUser,
    logout
  };
  