import * as api from "./api.api";

var getMasterDataApi = () => {
  let url = "masterdata";
  return api
    .get(url)
    .then((data) => {
      var response = data.data;
      return response;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export { getMasterDataApi };
