const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: "./public/index.js",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",

                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(jpg|png)/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        })
    ],

};
