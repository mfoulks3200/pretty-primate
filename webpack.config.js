const path = require('path');
const packageJson = require('./package.json');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

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
        'monaco/editor.worker': 'monaco-editor/esm/vs/editor/editor.worker.js',
        'monaco/json.worker': 'monaco-editor/esm/vs/language/json/json.worker',
        'monaco/css.worker': 'monaco-editor/esm/vs/language/css/css.worker',
        'monaco/html.worker': 'monaco-editor/esm/vs/language/html/html.worker',
        'monaco/ts.worker': 'monaco-editor/esm/vs/language/typescript/ts.worker',
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                include: [
                    path.resolve(__dirname, 'src'),
                    path.resolve(__dirname, 'node_modules', 'monaco-editor', 'esm')
                ],
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(tsx|ts)?$/,
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
            {
                test: /\.ttf$/,
                use: ['file-loader']
            }
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
        extensions: ['.tsx', '.ts', '.js'],
        plugins: [
            new TsconfigPathsPlugin()
        ]
    },
    output: {
        filename: '[name]/bundle.js',
        path: path.resolve(__dirname, 'extension'),
        chunkFilename: 'chunks/[name].js'
    },
    optimization: {

    },
    ...(isDevServer ? devServerOpts : {})
};
