import {Post} from "./headerIntercepter";
import {getAPIUrl} from "./Global";
import {setUserID, setUserRole, setUserToken} from "./localStorageHandler";
import {history} from "./history";
import {routes} from "./routes";

const LANGUAGE = 'language';

export function login(data) {
  const url = getAPIUrl('auth.login');
  return Post(url, data, false)
    .then(response => {
      setUserID(response.data.user.id);
      setUserRole(response.data.user.role);
      setUserToken(response.data.token);
      history.push(routes.dashboard.self)
    })
}


export function setLanguage(lang) {
  return localStorage.setItem(LANGUAGE, lang);
}

export function getLanguage() {
  return localStorage.getItem(LANGUAGE);
}

export function clearLanguage() {
  localStorage.removeItem(LANGUAGE);
}
