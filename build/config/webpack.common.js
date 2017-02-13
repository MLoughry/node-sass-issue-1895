"use strict";
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const FailPlugin = require("webpack-fail-plugin");
const autoprefixer = require("autoprefixer");
const inlineRtl = require("postcss-inline-rtl");
const resolveRelative_1 = require("../utils/resolveRelative");
const getResolveAlias_1 = require("../utils/getResolveAlias");
const options_1 = require("../options");
exports.postCssOptions = {
    plugins: [
        autoprefixer({ browsers: 'last 2 versions' }),
        inlineRtl
    ]
};
function default_1() {
    return {
        entry: options_1.default.entry,
        output: {
            filename: 'owa.[name].js',
            library: ["Owa", "[name]"],
            libraryTarget: "window",
            path: resolveRelative_1.default('dist/scripts'),
            jsonpFunction: '$wj'
        },
        resolve: {
            extensions: ['.js'],
            alias: getResolveAlias_1.default(),
            modules: [
                resolveRelative_1.default('node_modules'),
                resolveRelative_1.default('obj'),
                resolveRelative_1.default('packages')
            ]
        },
        plugins: [
            new ExtractTextPlugin({
                filename: "../resources/styles/style.min.css",
                allChunks: false,
            }),
            FailPlugin
        ],
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    exclude: /\.global\.scss$/,
                    use: [
                        '@microsoft/loader-load-themed-styles',
                        'css-loader?modules&minimize',
                        {
                            loader: 'postcss-loader',
                            options: exports.postCssOptions
                        },
                        'sass-loader'
                    ]
                },
                {
                    test: /\.global\.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [
                            'css-loader?minimize',
                            {
                                loader: 'postcss-loader',
                                options: exports.postCssOptions
                            },
                            'sass-loader'
                        ]
                    })
                },
                {
                    test: /\.css$/,
                    exclude: /\.global\.css$/,
                    use: [
                        '@microsoft/loader-load-themed-styles',
                        'css-loader?modules&minimize',
                        {
                            loader: 'postcss-loader',
                            options: exports.postCssOptions
                        }
                    ]
                },
                {
                    test: /\.global\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [
                            'css-loader?minimize',
                            {
                                loader: 'postcss-loader',
                                options: exports.postCssOptions
                            },
                        ]
                    })
                },
                {
                    test: /\.gif$/,
                    use: ["url-loader?mimetype=image/gif"]
                },
                {
                    test: /\.png$/,
                    use: ["url-loader?mimetype=image/png"]
                },
                {
                    test: /\.json$/,
                    use: ["json-loader"]
                }
            ]
        }
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
