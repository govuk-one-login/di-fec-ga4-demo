const path = require("path")
const nodeExternals = require("webpack-node-externals");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const crypto = require("crypto");
const crypto_orig_createHash = crypto.randomBytes(20).toString("hex");
const sass = require("sass");
module.exports = {
    mode: "production",
    entry: {
        main: "./src/app.js"
    },
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "/",
        filename: "server.js"
    },
    target: "node",
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    externalsPresets: {
        node: true // in order to ignore built-in modules like path, fs, etc. 
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: "./src/views", to: "views",
                    transform(content) {
                        return content
                            .toString()
                            .replaceAll("@hash", crypto_orig_createHash);
                    }
                },
                { from: "./src/locales", to: "locales" }, //translation files
                {
                    from: "./src/assets/javascripts", //app js files
                    to: "public/javascripts/[name]."+crypto_orig_createHash+"[ext]"
                },
                {
                    from: "./src/assets/stylesheets", //app scss files
                    to: "public/stylesheets/[name]."+crypto_orig_createHash+".css",
                    transform: (content, path) => {
                        return sass.compile(path).css
                    }
                },
                {
                    from: "./node_modules/govuk-frontend/govuk/all.js", //govuk-frontend js
                    to: "public/javascripts/[name]."+crypto_orig_createHash+"[ext]"  
                },
                {
                    from: "./node_modules/@govuk-one-login/one-login-analytics/lib/analytics.js", //analytics package
                    to: "public/javascripts/[name]."+crypto_orig_createHash+"[ext]"
                }
            ]

        })
    ],
    module: {
        rules: [
            
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin()
        ]
    }
}