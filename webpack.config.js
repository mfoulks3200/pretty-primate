const path = require('path');
const packageJson = require('./package.json');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const extensionPages = {
    options: './src/pages/options/index.tsx',
    devtools: './src/pages/devtools/index.tsx',
    popup: './src/pages/popup/index.tsx'
};

let htmlPlugins = [];

Object.keys(extensionPages).forEach((ent) => {
    const htmlPlugin = new HtmlWebpackPlugin({
        filename: `${ent}/index.html`,
        chunks: [ent],
    });
    htmlPlugins.push(htmlPlugin);
});

const isDevServer = process.env.WEBPACK_DEV_SERVER === 'true';
const devServerOpts = {
    devServer: {
        static: {
            directory: path.join(__dirname, 'extension'),
            watch: true
        },
        compress: true,
        port: 9000,
        hot: true,
    },
    devtool: 'source-map',
    watch: true
};

module.exports = {
    entry: {
        ...extensionPages,
        worker: './src/worker/index.ts',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        compilerOptions: {
                            noEmit: false,
                        },
                    },
                },
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        ...htmlPlugins,
        new CopyPlugin({
            patterns: [
                {
                    from: "./public/**/*.{png,jpg,jpeg,gif,svg}",
                    to: "./assets/images/[name][ext]",
                    globOptions: {
                        ignore: ["**/manifest.json"]
                    },
                },
                {
                    from: "./public/manifest.json",
                    to: "./manifest.json",
                    transform(content, absoluteFrom) {
                        const originalManifest = JSON.parse(content.toString());
                        return JSON.stringify({
                            name: packageJson.displayName,
                            version: packageJson.version,
                            description: packageJson.description,
                            ...originalManifest,
                        }, null, 2);
                    },
                },
            ],
        }),
        new CleanWebpackPlugin()
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    output: {
        filename: '[name]/bundle.js',
        path: path.resolve(__dirname, 'extension'),
    },
    ...(isDevServer ? devServerOpts : {})
};
