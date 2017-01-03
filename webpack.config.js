var webpack
    = require("webpack");
var path
    = require("path");
//
module.exports =
{
    "entry":
    [
        "./src/index.js"
    ],
    "output":
    {
        "path":__dirname,
        "publicPath":"/",
        "filename":"bundle.js"
    },
    "devtool":"eval",
    "module":
    {
        "loaders":
        [
            {
                "include":[path.resolve(__dirname, "src")],
                "exclude":/node_modules/,
                "test":/\.jsx?$/,
                "loader":"babel",
                "options":
                {
                    "presets":["react", "es2015", "stage-0", "stage-1", "stage-2"]
                },
                "query":
                {
                    "plugins":["transform-runtime"],
                    "presets":["react", "es2015", "stage-0", "stage-1", "stage-2"]
                }
            }
        ]
    },
    "resolve":
    {
        "extensions":["", ".js", ".jsx"]
    },
    "plugins":
    [
        new webpack.DefinePlugin(
        {
            "process.env":
            {
                "NODE_ENV":JSON.stringify("production")
            } 
        })
    ],
    "devServer":
    {
        "historyApiFallback":true,
        "contentBase":"./"
    }
};