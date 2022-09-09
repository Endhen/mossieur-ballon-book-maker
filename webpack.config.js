const path = require("path");
const HtmlWebPlugin = require("html-webpack-plugin");
const { NonceProvider } = require("react-select");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "dist"),
        filename: "main.js",
    },
    devtool: 'inline-source-map', // No minified js
    module: {
    rules: [
        {
            test: /\.m?jsx?$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['@babel/preset-env', { targets: "defaults" }]
                    ]
                }
            }
        },
        {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
        },
        {
            test: /\.(png|webp|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
        },
        {
            test: /\.ya?ml$/,
            type: 'json', // Required by Webpack v4
            use: 'yaml-loader'
        },
        {
            test: /\.rcss/,
            type: 'asset/source'
        }
        // {
        //     test: /\.(webp)$/i,
        //     use: [
        //     {
        //         loader: 'url-loader',
        //         options: {
        //             limit: false,
        //             mimetype: 'image/webp',
        //         },
        //     },
        //     ],
        // },
    ]
    },
    plugins: [new HtmlWebPlugin({ template: "./src/index.html" })],
};