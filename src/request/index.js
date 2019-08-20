let baseURL = "/api/go/";

export default {
  get(url) {
    const settings = {
      method: "GET",
      headers: { "Cache-Control": "no-cache" }
    };
    return fetch(baseURL + url, settings).then(r => r.json());
  },
  post(url, data) {
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    return fetch(baseURL + url, settings).then(r => r.json());
    // .then(r => r.json())
  }
};

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
