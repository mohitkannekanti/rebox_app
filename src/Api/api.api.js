import axios from "axios";
import baseurl from "./BaseUrl";

var get = (url, data = {}) => {
  let routeUrl = baseurl["url"] + url;
  return axios({
    method: "get",
    data: data,
    // params:params,
    url: routeUrl,
  });
};

var post = (url, data = {}) => {
  // debugger
  let routeUrl = baseurl["url"] + url;
  return axios({
    method: "post",
    data: data,
    url: routeUrl,
  });
};

var put = (url, data = {}) => {
  let routeUrl = baseurl["url"] + url;

  return axios({
    method: "put",
    data: data,
    url: routeUrl,
  });
};

var del = (url, data = {}, headers = {}, extra = {}) => {
  // debugger
  let routeUrl = baseurl["url"] + url;
  return axios({
    method: "delete",
    data: data,
    url: routeUrl,
  });
};

export { get, post, put };
