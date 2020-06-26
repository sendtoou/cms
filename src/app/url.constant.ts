import { environment } from '../environments/environment';
const baseUrl = environment.baseUrl;
const contentUrl = environment.contentUrl;

export const apiUrl = {
  /* BASE_URL */
  access_token: baseUrl + '/api/users/me/access-token',
  login: baseUrl + '/api/login',
  register: baseUrl + '/api/register',
  user: baseUrl + '/api/user',
  /* CONTENT_URL */
  tab: contentUrl + '/api/tab',
  ensure: baseUrl + '/api/tokencheck'
  // content: contentUrl + '/api/contentbase/tab',
  // banner: contentUrl + '/api/contentbase/banner',
};
