export const { NODE_ENV } = process.env;

let apiurl;
let authority;
let redirect_uri;
if (NODE_ENV === 'development') {
  apiurl = 'https://localhost:7022/api';
  authority = 'https://localhost:7089/';
  redirect_uri = 'http://localhost:3001/';
} else {
  apiurl = 'https://eworking-api-dantgo2001.azurewebsites.net/api';
  authority = 'https://identity-setver-datngo2001.azurewebsites.net/';
  redirect_uri = 'https://e-working-netcore.web.app/';
}
export const API_URL = apiurl;
export const Authority = authority;
export const Redirect_uri = redirect_uri;