export const { NODE_ENV } = process.env;

let apiurl;
if (NODE_ENV === 'development') {
  apiurl = 'https://localhost:7022/api';
} else {
  apiurl = 'https://eworking-api-dantgo2001.azurewebsites.net/api';
}
export const API_URL = apiurl;
