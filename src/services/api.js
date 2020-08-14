import axios from 'axios';

// axios.defaults.proxy.host = "http://localhost:5000"
axios.defaults.baseURL = 'https://warbler-server-sxc.herokuapp.com';
// axios.defaults.proxy.port = ...

export function setTokenHeader(token){
    if(token){
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    }else{
        delete axios.defaults.headers.common["Authorization"];
    }
}

export function apiCall(method, path, data){
    return new Promise((resolve, reject) => {
        return axios[method](path, data)
        .then(res => {
            return resolve(res.data)
        }) 
        .catch(err => {
            return reject(err.response.data.error)
        })
    })
}