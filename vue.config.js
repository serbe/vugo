// const { UnusedFilesWebpackPlugin } = require("unused-files-webpack-plugin");

module.exports = {
  devServer: {
    proxy: {
      "/api/go/": {
        target: "http://localhost:9090",
        changeOrigin: true,
        ws: true,
      },
    },
  },
  configureWebpack: {
    // plugins: [new UnusedFilesWebpackPlugin()]
  },
};
