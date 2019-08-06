module.exports = {
  devServer: {
    proxy: {
      "/api/go/": {
        target: "http://localhost:9090",
        ws: true
      }
    }
  }
};
