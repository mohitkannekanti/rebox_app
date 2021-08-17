import * as api from "./api.api";

var hidSearchApi = (data) => {
  let url = "get_user_mobile";
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

var verifyOtpApi = (data) => {
  let url = "verify_user_mobile_otp";
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

var getAllPropertiesDataApi = () => {
  let url = "get_all_properties";
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

var updatePropertyStatusApi = (body) => {
  let url = "update_property_status";
  return api
    .put(url, body)
    .then((data) => {
      var response = data.data;
      return response;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

var downloadReceiptApi = (data) => {
  let url = "download_receipt";
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

export {
  hidSearchApi,
  verifyOtpApi,
  getAllPropertiesDataApi,
  updatePropertyStatusApi,
  downloadReceiptApi,
};
