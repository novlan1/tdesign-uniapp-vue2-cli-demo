const path = require('path');

const USE_TD_UNI_APP_ALIAS = process.argv.indexOf('--alias') > -1;
console.log('[USE_TD_UNI_APP_ALIAS]', USE_TD_UNI_APP_ALIAS);

function resolve(dir) {
  return path.join(__dirname, dir);
}


module.exports = {
  transpileDependencies: ['tdesign-uniapp', 'tdesign-uniapp-chat'],
  chainWebpack: (config) => {
    if (USE_TD_UNI_APP_ALIAS) {
        config.resolve.alias
          .set('tdesign-uniapp', resolve('./src/_tdesign'))
          .set('tdesign-uniapp-chat', resolve('./src/_tdesign-uniapp-chat'));
    }
  },
};
