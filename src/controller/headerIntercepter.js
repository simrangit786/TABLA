import axios from 'axios';
import {getUserToken} from "./localStorageHandler";

function header(requireAuth = true) {
  let headers = {
    'Content-Type': 'application/json'
  };
  if (requireAuth)
    headers['Authorization'] = `Token ${getUserToken()}`;
  return headers
}

export function Get(url, params) {
  return axios.get(url, {headers: header(), params: params})
}

export function Post(url, data, auth = true) {
  return axios.post(url, data, {headers: header(auth)})
}

export function Patch(url, data) {
  return axios.patch(url, data, {headers: header()})
}

export function Remove(url) {
  return axios.delete(url, {headers: header()})
}
