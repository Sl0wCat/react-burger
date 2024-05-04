const BASE_URL = "https://norma.nomoreparties.space/api/";

function checkResponse (res) {  
    if (res.ok) {  
        return res.json();  
    }  
    return Promise.reject(`Ошибка ${res.status}`);  
}

export async function request(url, options = {}) {  
    // принимает два аргумента: урл и объект опций, как и `fetch`  
    return fetch(BASE_URL + url, options).then(checkResponse)  
}  