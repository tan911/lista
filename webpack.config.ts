import path from 'path'
import webpack from 'webpack'
import CopyPlugin from 'copy-webpack-plugin'

const isMode = process.env.NODE_ENV === 'production' ? 'production' : 'development'

const config: webpack.Configuration = {
    name: 'browser',
    mode: isMode,
    target: 'web',
    devtool: 'eval',
    watch: process.env.NODE_ENV !== 'production',
    entry: './src/public/javascripts/application.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/src/public/javascripts'),
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['ts-loader'],
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'src/public/assets', to: '../assets' },
                {
                    from: 'src/views',
                    to: '../../views',
                },
            ],
        }),
    ],
}

export default config
