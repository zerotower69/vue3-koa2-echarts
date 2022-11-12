// 1.第三层的文件内容
// 2.读取文件的内容  
//   获取请求的路径，拼接文件路径
// 3.设置响应体
const path = require('path')
const fileUtils = require('../utils/file_utils');
module.exports = async (ctx, next) => {
    //parse url
    const url = ctx.request.url;  // /api/seller  ===> ../data/seller.json
    let filePath = url.replace('/api', '');
    filePath = '../data' + filePath + '.json';
    filePath = path.join(__dirname, filePath);
    try {
        const ret = await fileUtils.getFileJsonData(filePath);
        ctx.response.body = ret;
    } catch (error) {
        const errorMsg = {
            message: '读取文件内容失败，文件资源不存在',
            status: 404
        }
        ctx.response.body =JSON.stringify(errorMsg)
    }
    // console.log(filePath);
    await next()
}