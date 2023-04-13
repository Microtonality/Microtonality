const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Webpack = require("webpack");
const resolveConfig = require("tailwindcss/resolveConfig");
const tailwindConfig = require("./tailwind.config")

module.exports = (env, options) => {
    const isDevelopment = options.mode !== 'production';
    const isGHActions = process.env.GITHUB_ACTIONS === "true";
    const publicPath = isGHActions ? "/Microtonality/" : "/";
    return {
        mode: isDevelopment ? "development" : "production",
        entry: {
            main: './src/index.tsx',
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].[contenthash].js',
            assetModuleFilename: "images/[name].[hash][ext][query]",
            clean: true,
            publicPath: publicPath
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
                    test: /\.png$/,
                    type: "asset/resource"
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'html-loader',
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
                    use: ['@svgr/webpack', 'svg-url-loader'],
                },
                {
                    test: /\.png$/,
                    type: "asset/resource",
                }
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        devtool: isDevelopment ? 'source-map' : 'source-map',
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src/index.html'),
                filename: 'index.html'
            }),
            new MiniCssExtractPlugin({
                filename: "[name].[contenthash].css"
            }),
            new Webpack.DefinePlugin ({
                'process.env.PUBLIC_PATH': JSON.stringify(publicPath),
                TAILWIND_COLORS_NEUTRAL: JSON.stringify(resolveConfig(tailwindConfig).theme.colors.neutral),
                TAILWIND_COLORS_BLUE: JSON.stringify(resolveConfig(tailwindConfig).theme.colors.blue),
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
        },
        devServer: {
            static: './dist',
            hot: true,
            historyApiFallback: true,
            port: 3000
        },
    };
}