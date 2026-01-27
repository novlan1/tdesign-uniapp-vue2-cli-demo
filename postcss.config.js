const path = require('path');
const webpack = require('webpack');

// 自定义 PostCSS 插件：rpx 转 px (仅处理 node_modules/tdesign-uniapp)
const rpxToPxPlugin = () => {
  return {
    postcssPlugin: 'postcss-rpx-to-px',
    Declaration(decl) {
      // 只处理包含 rpx 的值
      if (decl.value.includes('rpx')) {
        // 将 rpx 转换为 px，比例 1rpx = 0.5px (基于 750 设计稿)
        decl.value = decl.value.replace(/(\d*\.?\d+)rpx/gi, (match, num) => {
          return `${(parseFloat(num) * 0.5).toFixed(2).replace(/\.?0+$/, '')}px`;
        });
      }
    }
  };
};
rpxToPxPlugin.postcss = true;

const config = {
  parser: require('postcss-comment'),
  plugins: [
    require('postcss-import')({
      resolve(id) {
        if (id.startsWith('~@/')) {
          return path.resolve(process.env.UNI_INPUT_DIR, id.substr(3));
        } if (id.startsWith('@/')) {
          return path.resolve(process.env.UNI_INPUT_DIR, id.substr(2));
        } if (id.startsWith('/') && !id.startsWith('//')) {
          return path.resolve(process.env.UNI_INPUT_DIR, id.substr(1));
        }
        return id;
      },
    }),
    require('autoprefixer')({
      remove: process.env.UNI_PLATFORM !== 'h5',
    }),
    // rpx 转 px，处理 node_modules/tdesign-uniapp 中的 rpx
    // 必须放在 @dcloudio/vue-cli-plugin-uni/packages/postcss 之前
    ...(process.env.UNI_PLATFORM === 'h5' ? [rpxToPxPlugin()] : []),
    require('@dcloudio/vue-cli-plugin-uni/packages/postcss')({
      include: /node_modules\/.*/
    }),
  ],
};
if (webpack.version[0] > 4) {
  delete config.parser;
}
module.exports = config;
