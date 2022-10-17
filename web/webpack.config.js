const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = (env, options) => {
    const isDevelopment = options.mode !== 'production';
    return {
        mode: isDevelopment ? "development" : "production",
        entry: {
            main: './src/js/main.ts',
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].[contenthash].js',
            assetModuleFilename: "images/[name].[hash][ext][query]",
            clean: true
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: [
                        'babel-loader',
                        'ts-loader',
                    ],
                    exclude: /node_modules/,
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'html-loader',
                            options: {
                                attributes: {
                                    list: [
                                        '...',
                                        {
                                            tag: 'meta',
                                            attribute: 'content',
                                            type: 'src',
                                            /**
                                             * @docs https://github.com/webpack-contrib/html-loader#list
                                             */
                                            filter: (_tag, _attribute, attributes, _resourcePath) => {
                                                if (
                                                    attributes.property === 'og:image' ||
                                                    attributes.property === 'twitter:image'
                                                ) {
                                                    return true
                                                }
                                                return false
                                            },
                                        },
                                        {
                                            tag: 'img',
                                            attribute: 'data-src',
                                            type: 'src'
                                        },
                                        {
                                            tag: 'img',
                                            attribute: 'data-srcset',
                                            type: 'srcset',
                                        },
                                        {
                                            tag: 'link',
                                            attribute: 'href',
                                            type: 'src',
                                            /**
                                             * @docs https://github.com/webpack-contrib/html-loader#list
                                             */
                                            filter: (_tag, _attribute, attributes, _resourcePath) => {
                                                if (
                                                    attributes.as === 'image'
                                                ) {
                                                    return true
                                                }
                                                return false
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                    ]
                },
                {
                    test: /\.(sa|sc)ss$/,
                    use: [
                        isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        "postcss-loader",
                        "sass-loader"
                    ]

                },
                {
                    test: /\.css$/,
                    use: [
                        isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        "postcss-loader"
                    ]
                },
                {
                    test: /\.svg$/,
                    type: "asset/resource",
                }
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        devtool: isDevelopment ? 'eval-source-map' : 'source-map',
        plugins: [
            // new HtmlWebpackPlugin({
            //     template: path.resolve(__dirname, 'src/index.html'),
            //     filename: 'index.html'
            // }),
            new MiniCssExtractPlugin({
                filename: "[name].[contenthash].css"
            }),
        ],
        optimization: {
            minimize: !isDevelopment,
            minimizer: [
                new TerserPlugin(),
                new CssMinimizerPlugin(),
            ],
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendor',
                        chunks: 'all',
                    },
                },
            },
        }
    };
}