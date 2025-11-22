const path = require('path');

const USE_TD_UNI_APP_ALIAS = true;


function resolve(dir) {
  return path.join(__dirname, dir);
}


module.exports = {
  chainWebpack: (config) => {
    if (USE_TD_UNI_APP_ALIAS) {
        config.resolve.alias
          .set('tdesign-uniapp', resolve('./src/_tdesign'))
          .set('tdesign-uniapp-chat', resolve('./src/_tdesign-uniapp-chat'));
    }
  },
};
