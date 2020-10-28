const {override, fixBabelImports,addLessLoader} = require('customize-cra');

module.exports = override(
    //按需打包
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    //改变主题色
    addLessLoader({
        javascriptEnabled: true,
        // modifyVars: {'@primary-color': '#1DA57A'},
    }),
);