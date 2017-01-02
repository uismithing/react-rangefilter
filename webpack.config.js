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
                "exclude":/node_modules/,
                "loader":"babel",
                "query":
                {
                    "presets":["react", "es2015", "stage-1"]
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