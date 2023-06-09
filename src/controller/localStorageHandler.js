export const USER_TOKEN = 'user_token';
export const USER_ROLE = 'user_role';
export const USER_ID = 'user_id';

export function logout() {
  clearUserToken();
}


export function setUserToken(TOKEN) {
  localStorage.setItem(USER_TOKEN, TOKEN);
}

export function setUserRole(ROLE) {
  localStorage.setItem(USER_ROLE, ROLE);
}

export function setUserID(ID) {
  localStorage.setItem(USER_ID, ID);
}

export function getUserID() {
  return localStorage.getItem(USER_ID);
}

export function getUserRole() {
  return localStorage.getItem(USER_ROLE);
}

export function getUserToken() {
  return localStorage.getItem(USER_TOKEN);
}

export function clearUserToken() {
  localStorage.removeItem(USER_TOKEN);
  localStorage.removeItem(USER_ROLE);
  localStorage.removeItem(USER_ID);
}

export function isLoggedIn() {
  const accessToken = getUserToken();
  return !!accessToken;
}
