var path = require("path");
module.exports = {
  resolve: {
    extensions: ["*", ".js", ".vue", ".json"],
    alias: {
      "@": path.resolve("src"),
    },
    modules: ["node_modules"],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: "css-loader",
        options: {
          url: true,
        },
      },
    ],
  },
};
