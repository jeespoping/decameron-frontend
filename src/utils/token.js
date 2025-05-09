const access = process.env.REACT_APP_TOKEN;

export function setAccesToken(token) {
  localStorage.setItem(access, token);
}

export function getAccesToken() {
  return localStorage.getItem(access);
}
