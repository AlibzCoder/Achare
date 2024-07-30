import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { IsEmpty, IsFunction, IsObj } from '.';
import { QueueCallbacks } from './Helpers';

export interface ApiInstance extends AxiosInstance {
  _currentJwtToken? : string | null | undefined,
  _callRefresh? : boolean | null | undefined
}
export interface RequestConfig extends AxiosRequestConfig{
  queue? : boolean
}

const AUTHORIZATION = "Basic MDk4MjIyMjIyMjI6U2FuYTEyMzQ1Njc4";

function AuthorizationMiddleware (token : string, onFailure : (err : Error | any) => void, callRefresh = false){
  // Do Authorization Stuff
  return Promise.resolve(AUTHORIZATION)
}

function ObtainAccessTokenPromiseClosure(obtainAccessToken : () => Promise<any>){
  let runningPromise : Promise<any> | undefined = undefined;
  let isFullfilled = true;
  return () => {
    if(isFullfilled) {
      runningPromise = obtainAccessToken();
      isFullfilled = false;
    }
    if(runningPromise) runningPromise.finally(() => isFullfilled = true );
    return runningPromise;
  };
}

export function CreateApiInstance(
    baseURL : string, requestsQueueCount = 5,
    errorHandler : null | ((data : any, err? : Error | any) => void) = null,
    onAccessTokenFailure : null | ((err : Error | any) => void) = null
  ) {

  const API : ApiInstance = axios.create({
    baseURL : baseURL
  })

  API["_currentJwtToken"] = null;
  API["_callRefresh"] = false;

  const obtainAccessToken = ObtainAccessTokenPromiseClosure(() => {
    return AuthorizationMiddleware(API._currentJwtToken || '', (err) => {
      if(API._callRefresh) API._callRefresh = false;
      if(onAccessTokenFailure && IsFunction(onAccessTokenFailure)) onAccessTokenFailure(err);
    }, API._callRefresh || false)
  });

  API.interceptors.response.use(
    function (response) {
      if (response.data.error == true) {
        if(!IsEmpty(response.data?.message) && errorHandler && IsFunction(errorHandler)) errorHandler(response);
        return Promise.reject(response);
      }
      return response.data;
    },
    async function (error) {
      let errorMessages : {title? : string, description? : string} = {
        title : '',
        description : ''
      };
      if (error.code == 'ERR_NETWORK') {
        errorMessages = {
          title : !IsEmpty(error?.message) ? error.message : 'Network Error'
        };
      } else if (error.response?.status == 401) {
        try {
          API._callRefresh = true;
          API._currentJwtToken = await obtainAccessToken();
          error.config.headers['Authorization'] = `Bearer ${API._currentJwtToken}`;
          API._callRefresh = false;
          // return a new promise for the failed request with the error config.
          return API(error.config);
        } catch (err) {
          return Promise.reject(error);
        }
      } else {
        if (error.response?.status == 500 || error.response?.status == 404) {
          errorMessages = {
            title : error.response?.data?.message || 'Error While Commiunicating Services'
          };
        } else if (error.response?.data) {
          errorMessages = {
            title : error.response.data?.title,
            description: error.response.data?.message,
          };
        }
        errorMessages = {...errorMessages};
      }
      
      if(errorHandler && IsFunction(errorHandler)) errorHandler(errorMessages , error);
      return Promise.reject(error);
    }
  );



  const queueMananger = new QueueCallbacks(requestsQueueCount || 5);
  
  async function RequestHandler(config : RequestConfig, method : 'get' | 'post'){
    if(!IsObj(config) || IsEmpty(config.url) || typeof config.url !== 'string' || !['get','post'].includes(method)) return Promise.reject({ error: true, message: "Invalid Request Config"});
    const { queue , ...otherConfigs} = config;
    
    otherConfigs['method'] = method;
    if(otherConfigs.url) otherConfigs.url = encodeURI(otherConfigs.url);

    try {
      API._currentJwtToken = await obtainAccessToken();
      API.defaults.headers.common['Authorization'] = AUTHORIZATION;
    } catch (err) {
      return Promise.reject(err);
    }

    if(queue === false){
      return API(otherConfigs)
    } else {
      return queueMananger.Queue(() => API(otherConfigs));
    }
  }

  return {
    api : API,
    get: (config : RequestConfig) => RequestHandler(config, 'get'),
    post: (config : RequestConfig) => RequestHandler(config, 'post'),
  };
}