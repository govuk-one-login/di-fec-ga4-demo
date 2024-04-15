const path = require("path")
const nodeExternals = require("webpack-node-externals");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const sass = require("sass");
const replace = require("replace-in-file");
const fs = require("node:fs");
class ReplaceAssetName {
    apply(compiler) {
        compiler.hooks.done.tap("After", (modules) => {
        replaceAssetsName();
      });
    }
};

const replaceAssetsName = () => {
    
    const options = {
        files: [
          "dist/views/**/*.njk"
        ], //list of views to check
        from: "",
        to: ""
    };
    fs.readFile("dist/manifest.json", "utf8", (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        const files = JSON.parse(data);
        for (const x in files) {
            console.log("original",x);
            console.log("new",files[x]);
            options.from = x;
            options.to = files[x].substring(1); //substring to remove the leading slash
            try {
                replace.sync(options);
            }
            catch (error) {
                console.error("Error occurred:", error);
            }
        }
    });
}

module.exports = {
    mode: "production",
    entry: {
        main: "./src/app.js"
    },
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "/",
        filename: "server.js",
        clean: true
    },
    target: "node",
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    externalsPresets: {
        node: true // in order to ignore built-in modules like path, fs, etc. 
    },
    plugins: [
        new WebpackManifestPlugin(),
        new CopyPlugin({
            patterns: [
                { from: "./src/locales", to: "locales" }, //translation files
                {
                    from: "./src/assets/javascripts", //app js files
                    to: "public/javascripts/[name].[contenthash][ext]"
                },
                {
                    from: "./src/assets/stylesheets", //app scss files
                    to: "public/stylesheets/[name].[contenthash].css",
                    transform: (content, path) => {
                        return sass.compile(path).css
                    }
                },
                {
                    from: "./node_modules/govuk-frontend/govuk/all.js", //govuk-frontend js
                    to: "public/javascripts/[name].[contenthash][ext]"  
                },
                {
                    from: "./node_modules/@govuk-one-login/one-login-analytics/lib/analytics.js", //analytics package
                    to: "public/javascripts/[name].[contenthash][ext]"
                },
                {
                    from: "./src/views",
                    to: "views"
                }
            ]
        }),
        new ReplaceAssetName()
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