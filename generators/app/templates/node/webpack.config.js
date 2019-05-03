const path = require("path");

module.exports = {
  entry: {
    app: "./src/index.ts",
  },
  resolve: {
    extensions: [".js", ".json", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "babel-loader",
      },
    ],
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js",
  },
};
