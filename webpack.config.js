import path from 'path';
import webpack from 'webpack';

const config = {
  mode: 'production',
  entry: [
    '../src/assets/js/app.js',
  ],
  output: {
    filename: './app.js',
    path: path.resolve(__dirname, './dist'),
  },
  context: path.resolve(__dirname, './dist'),
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
};

function scripts() {
  return new Promise(resolve => webpack(config, (err, stats) => {
    if (err) {
      console.log('Webpack', err);
    }
    console.log(stats.toString({ /* stats options */ }));
    resolve();
  }));
}

module.exports = { config, scripts };
