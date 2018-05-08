import Notifier from "../helpers/notifier.js";
import axiosInstance from "../config/axios.config";
import queryString from "query-string";

const baseUrl = "https://localhost:8080/api/challenges";

export function getByTiers(tiers) {
  let queryString = "";
  function arrayToQuery(element, index) {
    if (index === 0) {
      queryString += "?" + "tier=" + element;
    } else queryString += "&" + "tier=" + element;
  }
  tiers.forEach(arrayToQuery);

  const config = {
    method: "GET"
  };
  return axiosInstance(baseUrl + "/get-by-tiers" + queryString, config)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

const responseSuccessHandler = response => {
  return response.data;
};

const responseErrorHandler = error => {
  return Promise.reject(error);
};
