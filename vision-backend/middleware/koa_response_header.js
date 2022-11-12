// 设置响应头的中间件
// 1.第二层中间件
// 2.获取mime类型
//    application/json
// 3.设置响应头
module.exports = async (ctx, next) => {
    const contentType = 'application/json; charset=utf-8'
    ctx.set('Content-Type', contentType)
    ctx.set("Access-Control-Allow-Origin", "*")
    ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE")
    // ctx.response.body = '{"success":true}'
    await next()
}