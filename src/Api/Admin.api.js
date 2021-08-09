import * as api from "./api.api";

var adminLoginApi = (data) => {
  let url = "admin_login";
  return api
    .post(url, data)
    .then((data) => {
      var response = data.data;
      return response;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export { adminLoginApi };
