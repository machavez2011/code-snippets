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
