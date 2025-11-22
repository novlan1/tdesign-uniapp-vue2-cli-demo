const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
      .set('tdesign-uniapp', resolve('./src/_tdesign'))
      .set('tdesign-uniapp-chat', resolve('./src/_tdesign-uniapp-chat'));
  },
};
