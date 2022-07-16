import {AxiosRequestConfig, AxiosResponse} from 'axios';

export interface LigaDataTaskRequest {
  uri: string;
  query: any;
  body: any;
  method: string;
  headers: any;
  client: AxiosRequestConfig;
  hasPagination: boolean;
  getData: (res: AxiosResponse) => any;
  getPagination: (res: AxiosResponse) => any;
  automatic: boolean;
  fetch: () => void;
  defaultBody: any;
  params: Array<string>;
}
