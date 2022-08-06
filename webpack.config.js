const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer")

const isDev = process.env.NODE_ENV === 'development';
console.log('isDev:', isDev)

const isProd = !isDev
console.log('isProd:', isProd)

const filename = (ext) => {
    isDev ? `[name].[contenthash].${ext}` : `[name].[contenthash].${ext}`
}

const cssLoaders = (extra) => {
    const loaders =
        [
            {loader: MiniCssExtractPlugin.loader},
            'css-loader'
        ]
    if (extra) loaders.push(extra)
    return loaders
}

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }

    if (isProd) {
        config.minimizer = [
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ]
    }

    return config
}

const plugins = () => {
    const plug = [
        new HtmlWebpackPlugin({
            title: "Portfolio-Resume",
            template: "./index.html",
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin(
            {
                patterns: [
                    {
                        from: path.resolve(__dirname, 'src/assets/favicon.ico'),
                        to: path.resolve(__dirname, 'dist'),
                    }
                ]
            }
        ),
        new MiniCssExtractPlugin({
            // filename: filename('css'),
            filename: '[name].[contenthash].css'
        }),
        new TerserPlugin()
    ]

    if (isProd) plug.push(new BundleAnalyzerPlugin())

    return plug
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    devtool: isDev ? 'source-map' : false,
    entry: {
        main: './index.js',
        swiper: './swiper-bundle.min.js',
    },
    output: {
        filename: filename('js'),
        assetModuleFilename: 'assets/[name][ext]',
        // filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    resolve: {
        extensions: ['.js', '.json', '.png', 'jpg', 'jpeg'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    optimization: optimization(),
    devServer: {
        port: 4200,
        hot: isDev
    },
    plugins: plugins(),
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.less$/,
                use: cssLoaders('less-loader')
            },
            {
                test: /\.s[ca]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.(png|svg|jpeg|jpg|pdf|pages)$/,
                type: 'asset/resource'
            },
            {
                test: /\.(xml)$/,
                use: ['xml-loader']
            },
            {
                test: /\.(csv)$/,
                use: ['csv-loader']
            }
        ]
    }
};
