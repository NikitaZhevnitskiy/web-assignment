//
const host = "localhost";
const port = 3000;
export const URL_API_BASE = `http://${host}:${port}`
export const URL_API_USERS = URL_API_BASE+'/users';
export const URL_API_LOGIN = URL_API_BASE+'/login';
export const URL_API_LOGGED_USER = URL_API_BASE+'/me';
export const URL_API_USER_LIST = URL_API_USERS+'/list';