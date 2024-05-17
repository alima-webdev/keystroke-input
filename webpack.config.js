const path = require('path');

module.exports = {
    entry: './src/index.ts',
    mode: process.env.MODE,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'keystroke-input.js',
        path: path.resolve(__dirname, 'dist'),
    },
};