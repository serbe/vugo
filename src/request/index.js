let baseURL = "/api/go/";

// function status(response) {
//   if (response.status >= 200 && response.status < 300) {
//     return Promise.resolve(response);
//   } else {
//     return Promise.reject(new Error(response.statusText));
//   }
// }

// function json(response) {
//   return response.json();
// }

export default {
  async get(url) {
    let response = await fetch(baseURL + url);
    if (response.ok) return await response.json();
    throw new Error(response.status);
  },
  async post(url, data) {
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: data
    };
    const response = await fetch(baseURL + url, settings);
    // if (response.ok) return await response.json();
    if (response.ok) return response;
    throw new Error(response.status);
  }
};

// export default {
//   get(url) {
//     fetch(baseURL + url)
//       .then(status)
//       .then(json)
//       .then(function(data) {
//         console.log("Request succeeded with JSON response", data);
//       })
//       .catch(function(error) {
//         console.log("Request failed", error);
//       });
//   }
// };
