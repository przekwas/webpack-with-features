const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CleanTerminalWebpackPlugin = require('clean-terminal-webpack-plugin');

const serverConfig = {
	name: 'server',
	mode: process.env.NODE_ENV || 'development',
	entry: './src/server/server.ts',
	module: {
		rules: [
			{
				test: /\.ts?$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
				options: {
					configFile: 'tsconfig.server.json'
				}
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	output: {
		filename: 'server.js',
		path: path.resolve(__dirname, 'dist')
	},
	target: 'node',
	node: {
		__dirname: false
	},
	externals: [nodeExternals()],
	plugins: [new CleanTerminalWebpackPlugin()]
};

const clientConfig = {
	name: 'client',
	mode: process.env.NODE_ENV || 'development',
	entry: './src/client/index.tsx',
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
				options: {
					configFile: 'tsconfig.client.json'
				}
			},
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			}
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.css', '.scss']
	},
	output: {
		filename: 'app.js',
		path: path.resolve(__dirname, 'public/js')
	},
	devServer: {
		port: 8080,
		publicPath: '/js/',
		contentBase: path.join(__dirname, '/public'),
		open: true,
		hot: true,
		historyApiFallback: true,
		proxy: {
			'/api': 'http://localhost:3000',
			'/auth': 'http://localhost:3000'
		}
	},
	plugins: [new CleanTerminalWebpackPlugin()]
};

module.exports = [serverConfig, clientConfig];
