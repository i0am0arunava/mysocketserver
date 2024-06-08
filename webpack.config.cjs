const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './app.js', // The entry point of your application
  target: 'node', // Ensure Webpack understands it’s building for Node.js
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // The name of the bundled file
  },
  externals: [nodeExternals()], // Exclude node_modules from the bundle
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Transpile JavaScript files
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js'], // Resolve these extensions
  },
};
