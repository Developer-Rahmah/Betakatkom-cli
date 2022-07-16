import axios from 'axios';

export const Client = axios.create({
  baseURL: 'https://betakatcom-api.ibrahimrahhal.com/',
});
